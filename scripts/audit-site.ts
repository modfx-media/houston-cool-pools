import { allExpectedCmsPaths } from "../lib/cms/manifest";
import { buildContentExport } from "./build-export";

const expected = allExpectedCmsPaths();
const exported = buildContentExport();
const pages = exported.records.filter((record) => record.collection === "pages").length;
const posts = exported.records.filter((record) => record.collection === "posts").length;
const hidden = exported.records.filter((record) => record.data.noIndex || record.data.excludeFromSitemap).length;

console.log(`Public URLs: ${expected.length}`);
console.log(`Draft pages: ${pages}`);
console.log(`Draft posts: ${posts}`);
console.log(`Noindex or excluded from sitemap: ${hidden}`);
console.log(`Globals: ${Object.keys(exported.globals).join(", ")}`);

if (exported.records.length !== expected.length) {
  console.error("Export count does not match the public URL inventory.");
  process.exit(1);
}
