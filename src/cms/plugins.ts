import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import type { Plugin } from "payload";

export const plugins: Plugin[] = [
  vercelBlobStorage({
    enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    collections: {
      media: true,
    },
    // Direct-to-Blob uploads bypass the Vercel serverless body limit that
    // otherwise fails admin uploads with "There was a problem while uploading the file".
    clientUploads: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
];
