import type { NextConfig } from "next";
import { HTML_REDIRECTS } from "./lib/site-urls";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
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

export default nextConfig;
