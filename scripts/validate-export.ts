import { allExpectedCmsPaths } from "../lib/cms/manifest";
import { normalizeCmsPath } from "../lib/cms/url";
import { buildContentExport } from "./build-export";

const expected = new Set(allExpectedCmsPaths());
const exported = buildContentExport();
const got = new Set(
  exported.records
    .map((record) => normalizeCmsPath(String(record.data.path || record.sourceUrl || "")))
    .filter(Boolean),
);

const missing = [...expected].filter((item) => !got.has(item));
const extra = [...got].filter((item) => !expected.has(item));
const published = exported.records.filter((record) => record.data._status === "published");
const badPaths = exported.records.filter((record) => {
  const value = String(record.data.path || "");
  return !value.startsWith("/") || value.includes("//") || /\/(null|undefined)(\/|$)/.test(value) || (value !== "/" && value.endsWith("/"));
});

if (missing.length > 0) {
  console.error(`Missing ${missing.length} expected paths`);
  console.error(missing.slice(0, 40).join("\n"));
}
if (extra.length > 0) {
  console.warn(`Extra ${extra.length} export paths`);
}
if (published.length > 0) {
  console.error("Export contains published records. Drafts only.");
}
if (badPaths.length > 0) {
  console.error(`Invalid paths: ${badPaths.length}`);
}

if (missing.length > 0 || published.length > 0 || badPaths.length > 0) {
  process.exit(1);
}

console.log(`Export covers ${got.size} paths as drafts.`);
