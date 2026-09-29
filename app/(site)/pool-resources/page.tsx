import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { PoolResourcesClient } from "../components/info/PoolResourcesClient";

const CANONICAL = "https://houstoncoolpools.com/pool-resources";

const pageMetadata: Metadata = {
  title: "Pool Owner Resources - Houston Cool Pools",
  description:
    "Combined hub for Houston Cool Pools owners: equipment manuals, product brochures, Pool School video tutorials, and severe-weather care checklists - all in one place.",
  alternates: { canonical: CANONICAL },
  // Hidden from search engines and NOT linked from the site nav.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Pool Owner Resources",
    description:
      "Equipment manuals, product brochures, Pool School videos, and severe-weather checklists in one hub.",
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-resources", pageMetadata);
}

export default function Page() {
  return <PoolResourcesClient />;
}
