import fs from "node:fs";
import path from "node:path";

const target = path.resolve("node_modules/payload/dist/bin/loadEnv.js");
if (!fs.existsSync(target)) {
  console.error(`Payload loadEnv.js not found at ${target}`);
  process.exit(1);
}

const source = fs.readFileSync(target, "utf8");
if (source.includes("nextEnvNs.loadEnvConfig")) {
  process.exit(0);
}

const patched = source.replace(
  "import nextEnvImport from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst { loadEnvConfig } = nextEnvImport;",
  "import * as nextEnvNs from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst nextEnvImport = nextEnvNs.loadEnvConfig ? nextEnvNs : nextEnvNs.default;\nconst { loadEnvConfig } = nextEnvImport;",
);

if (patched === source) {
  console.error("Could not patch Payload loadEnv.js. The installed Payload version may have changed.");
  process.exit(1);
}

fs.writeFileSync(target, patched);
console.log("Patched Payload env loader for tsx.");
