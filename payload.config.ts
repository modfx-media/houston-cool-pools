import path from "path";
import { fileURLToPath } from "url";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./src/cms/collections/Media";
import { Pages } from "./src/cms/collections/Pages";
import { Posts } from "./src/cms/collections/Posts";
import { Users } from "./src/cms/collections/Users";
import { Footer } from "./src/cms/globals/Footer";
import { Header } from "./src/cms/globals/Header";
import { SiteSettings } from "./src/cms/globals/SiteSettings";
import { plugins } from "./src/cms/plugins";
import { getCorsOrigins, getServerURL } from "./lib/cms/url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isVercel = Boolean(process.env.VERCEL);
const isImport = Boolean(process.env.CMS_IMPORT_APPLY);
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
const isLocalDb = /localhost|127\.0\.0\.1/.test(connectionString);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
    user: Users.slug,
    meta: {
      titleSuffix: " — Houston Cool Pools",
    },
  },
  collections: [Users, Media, Pages, Posts],
  cors: getCorsOrigins(),
  csrf: getCorsOrigins(),
  db: vercelPostgresAdapter({
    forceUseVercelPostgres: !isLocalDb,
    pool: {
      connectionString,
      ...(isImport ? { max: 1 } : {}),
    },
    push: !isVercel && !isImport && Boolean(connectionString),
  }),
  editor: lexicalEditor(),
  globals: [Header, Footer, SiteSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getServerURL(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
