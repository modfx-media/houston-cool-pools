import fs from "node:fs";
import path from "node:path";

import { ARTICLES } from "@/lib/articles";
import { getLiveCombos } from "@/data/pseo/slugs";
import { normalizeCmsPath } from "@/lib/cms/url";

const SITE_ROOT = path.join(process.cwd(), "app", "(site)");

function routeFromPageFile(file: string): string | null {
  const rel = path.relative(SITE_ROOT, file).replace(/\\/g, "/");
  if (!rel.endsWith("/page.tsx") && rel !== "page.tsx") return null;
  const parts = rel.replace(/\/page\.tsx$/, "").replace(/^page\.tsx$/, "").split("/").filter(Boolean);
  if (parts.some((part) => part.startsWith("("))) return null;
  if (parts.some((part) => part.startsWith("["))) return null;
  return normalizeCmsPath(parts.length === 0 ? "/" : `/${parts.join("/")}`);
}

function walk(dir: string, files: string[] = []): string[] {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(next, files);
    else if (entry.name === "page.tsx") files.push(next);
  }
  return files;
}

/** Every public URL the designed site can render, including blogs and live city pages. */
export function allExpectedCmsPaths(): string[] {
  const staticPaths = walk(SITE_ROOT)
    .map(routeFromPageFile)
    .filter((value): value is string => Boolean(value));
  const posts = ARTICLES.map((article) => `/blogs/${article.slug}`);
  const pseo = getLiveCombos().map((combo) => `/${combo.slug}`);
  return [...new Set([...staticPaths, ...posts, ...pseo].map(normalizeCmsPath))].sort();
}
