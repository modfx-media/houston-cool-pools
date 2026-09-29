import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import { HTML_REDIRECTS } from "./lib/site-urls";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "pg",
    "@payloadcms/db-vercel-postgres",
    "@neondatabase/serverless",
    "@vercel/postgres",
  ],
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  images: {
    qualities: [75, 95],
    remotePatterns: [
      { protocol: "https", hostname: "houstoncoolpools.com" },
      { protocol: "https", hostname: "www.houstoncoolpools.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    // Includes /blog -> /blogs so the singular path does not fall through to [slug].
    return HTML_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
