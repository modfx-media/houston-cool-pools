import fs from "node:fs";
import path from "node:path";

const app = path.resolve("app");
const site = path.join(app, "(site)");
fs.mkdirSync(site, { recursive: true });

const keep = new Set(["api", "sitemap.ts", "robots.ts", "(site)", "(payload)"]);
for (const name of fs.readdirSync(app)) {
  if (keep.has(name)) continue;
  const from = path.join(app, name);
  const to = path.join(site, name);
  fs.cpSync(from, to, { recursive: true });
  fs.rmSync(from, { recursive: true, force: true });
  console.log(`moved ${name}`);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(next, files);
    else if (/\.(tsx?|mts|jsx?)$/.test(entry.name)) files.push(next);
  }
  return files;
}

const importPattern = /(from\s+|import\s*\(\s*|import\s+)(["'])(\.[^"']+)\2/g;

let rewritten = 0;
for (const file of walk(site)) {
  const dir = path.dirname(file);
  const original = fs.readFileSync(file, "utf8");
  const next = original.replace(importPattern, (full, prefix, quote, spec) => {
    const resolved = path.resolve(dir, spec);
    const rel = path.relative(site, resolved);
    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      rewritten += 1;
      return `${prefix}${quote}../${spec}${quote}`;
    }
    return full;
  });
  if (next !== original) fs.writeFileSync(file, next);
}
console.log(`rewrote ${rewritten} relative imports`);

function routeFromPage(file) {
  const rel = path.relative(site, file).replace(/\\/g, "/");
  if (!rel.endsWith("/page.tsx") && rel !== "page.tsx") return null;
  if (rel.includes("[")) return null;
  const parts = rel
    .replace(/\/page\.tsx$/, "")
    .replace(/^page\.tsx$/, "")
    .split("/")
    .filter(Boolean);
  return parts.length === 0 ? "/" : `/${parts.join("/")}`;
}

let metadataFiles = 0;
for (const file of walk(site)) {
  if (!file.endsWith(`${path.sep}page.tsx`) && !file.endsWith("/page.tsx")) continue;
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("cmsMetadata(") || content.startsWith('"use client"') || content.startsWith("'use client'")) {
    continue;
  }
  const route = routeFromPage(file);
  if (!route) continue;

  const hasMetadataExport = /export const metadata\b/.test(content);
  const hasGenerate = /export (async )?function generateMetadata\b/.test(content);
  if (hasGenerate) continue;

  if (!content.includes('from "next"') && !content.includes("from 'next'")) {
    content = `import type { Metadata } from "next";\n${content}`;
  } else if (!content.includes("Metadata")) {
    content = content.replace(
      /import\s+type\s+\{([^}]+)\}\s+from\s+["']next["'];/,
      (full, names) => `import type { ${names.trim()}, Metadata } from "next";`,
    );
  }
  if (!content.includes('from "@/lib/cms/generateMeta"')) {
    content = `import { cmsMetadata } from "@/lib/cms/generateMeta";\n${content}`;
  }

  if (hasMetadataExport) {
    content = content.replace(/export const metadata(\s*:\s*Metadata)?\s*=/, "const pageMetadata$1 =");
    const fn = `\nexport async function generateMetadata(): Promise<Metadata> {\n  return cmsMetadata(${JSON.stringify(route)}, pageMetadata);\n}\n\n`;
    if (!content.includes("export default")) {
      console.error(`No default export: ${file}`);
      continue;
    }
    content = content.replace(/\nexport default /, `\n${fn}export default `);
  } else {
    const fn = `\nexport async function generateMetadata(): Promise<Metadata> {\n  return cmsMetadata(${JSON.stringify(route)}, {});\n}\n\n`;
    content = content.replace(/\nexport default /, `\n${fn}export default `);
  }

  fs.writeFileSync(file, content);
  metadataFiles += 1;
}
console.log(`wired cms metadata on ${metadataFiles} pages`);
