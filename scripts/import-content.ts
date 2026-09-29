import fs from "node:fs";
import path from "node:path";

import { config as loadEnv } from "dotenv";
import { getPayload, type Payload } from "payload";

import { buildContentExport, type ContentExport, type ExportRecord } from "./build-export";

loadEnv({ path: ".env.local" });
loadEnv();

const TRANSIENT = /ETIMEDOUT|ECONNRESET|EAI_AGAIN|cannot connect to Postgres|connection terminated|Unhandled error/i;

function errorText(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = "cause" in error && error.cause instanceof Error ? error.cause.message : "";
  return `${error.message} ${cause}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function args(): string[] {
  return process.argv.slice(2).filter((arg) => arg !== "--");
}

function requireDatabase() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error("DATABASE_URL is missing. Add the Neon pooled connection string, then rerun cms:import.");
    process.exit(1);
  }
  if (!process.env.PAYLOAD_SECRET) {
    console.error("PAYLOAD_SECRET is missing.");
    process.exit(1);
  }
}

function loadExport(): ContentExport {
  const fileArg = args().find((arg) => arg.endsWith(".json"));
  const file = path.resolve(fileArg || "data/content-export.json");
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, "utf8")) as ContentExport;
  }
  return buildContentExport();
}

function dropRefs(value: unknown, missing: string[]): unknown {
  if (Array.isArray(value)) return value.map((item) => dropRefs(item, missing));
  if (!value || typeof value !== "object") return value;
  const record = value as Record<string, unknown>;
  if (typeof record.$ref === "string") {
    missing.push(record.$ref);
    return undefined;
  }
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(record)) {
    const cleaned = dropRefs(child, missing);
    if (cleaned !== undefined) next[key] = cleaned;
  }
  return next;
}

async function findExisting(payload: Payload, record: ExportRecord) {
  const byLegacy = await payload.find({
    collection: record.collection,
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
    where: { legacyId: { equals: record.legacyId } },
  });
  if (byLegacy.docs[0]) return byLegacy.docs[0];

  const bySource = await payload.find({
    collection: record.collection,
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
    where: { sourceUrl: { equals: record.sourceUrl } },
  });
  return bySource.docs[0] ?? null;
}

async function withRetry<T>(label: string, fn: () => Promise<T>, reload: () => Promise<void>): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      last = error;
      const message = errorText(error);
      if (!TRANSIENT.test(message) || attempt === 3) throw error;
      console.error(`[cms:import] retry ${label} (${attempt + 1})`);
      await reload();
      await sleep(400 * (attempt + 1));
    }
  }
  throw last;
}

async function main() {
  const argv = args();
  if (argv.includes("--publish") || process.env.CMS_IMPORT_PUBLISH === "1") {
    console.error("Refusing --publish. Import drafts only; publish one URL at a time in /admin.");
    process.exit(1);
  }

  const apply = argv.includes("--apply") || process.env.CMS_IMPORT_APPLY === "1";
  const data = loadExport();
  console.log(`Loaded ${data.records.length} records (apply=${apply})`);
  if (!apply) {
    console.log("Dry run. Re-run with --apply after reviewing the export.");
    return;
  }

  requireDatabase();
  process.env.CMS_IMPORT_APPLY = "1";

  const onTransient = (reason: unknown) => {
    const message = errorText(reason);
    if (TRANSIENT.test(message)) {
      console.error("[cms:import] transient", message);
      return true;
    }
    return false;
  };

  process.on("unhandledRejection", (reason) => {
    if (!onTransient(reason)) console.error(reason);
  });
  process.on("uncaughtException", (error) => {
    if (!onTransient(error)) {
      console.error(error);
      process.exit(1);
    }
  });

  const { default: payloadConfig } = await import("../payload.config");
  let payload = await getPayload({ config: payloadConfig });
  const reload = async () => {
    payload = await getPayload({ config: payloadConfig });
  };

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const missingRelationships: string[] = [];
  const errors: { sourceUrl: string; message: string }[] = [];

  for (const record of data.records) {
    const missing: string[] = [];
    const cleaned = dropRefs(record.data, missing) as Record<string, unknown>;
    missingRelationships.push(...missing);
    const doc = { ...cleaned, _status: "draft" };
    try {
      await withRetry(record.sourceUrl, async () => {
        const existing = await findExisting(payload, record);
        if (existing) {
          await payload.update({
            collection: record.collection,
            id: existing.id,
            data: doc,
            draft: true,
            overrideAccess: true,
          });
          updated += 1;
        } else {
          await payload.create({
            collection: record.collection,
            data: doc,
            draft: true,
            overrideAccess: true,
          });
          created += 1;
        }
      }, reload);
    } catch (error) {
      skipped += 1;
      const message = error instanceof Error ? error.message : String(error);
      errors.push({ sourceUrl: record.sourceUrl, message });
      console.error(`[cms:import] skipped ${record.sourceUrl}`, message);
    }
    await sleep(25);
  }

  for (const [slug, value] of Object.entries(data.globals)) {
    try {
      await withRetry(slug, async () => {
        await payload.updateGlobal({
          slug: slug as "header" | "footer" | "site-settings",
          data: value,
          overrideAccess: true,
        });
      }, reload);
      console.log(`updated global ${slug}`);
    } catch (error) {
      skipped += 1;
      const message = error instanceof Error ? error.message : String(error);
      errors.push({ sourceUrl: `global:${slug}`, message });
      console.error(`[cms:import] skipped global ${slug}`, message);
    }
  }

  const report = {
    records: data.records.length,
    created,
    updated,
    skipped,
    missingRelationships,
    errors,
  };
  const reportPath = path.resolve("migration-data/import-report.json");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log("Draft import complete.", { records: report.records, created, updated, skipped });
}

const entry = process.argv[1]?.replace(/\\/g, "/") ?? "";
if (entry.endsWith("scripts/import-content.ts")) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
