import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { ConsolidatedFeaturesPage } from "../components/features/ConsolidatedFeaturesPage";

const TITLE = "Custom Pool Features - Houston Cool Pools";
const DESCRIPTION =
  "Every custom pool feature Houston Cool Pools builds - waterfalls, spillways, sun shelves, slides, fire bowls, custom mosaics, and more. Serving Cypress, Spring, Tomball, The Heights, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/custom-pool-features-1";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Features, Sheer Descents, Waterfalls, Spa Spillways, Bubblers, Sun Shelf, Beach Entry, Fast Lane, Rock Waterfall, Grotto, Fire Features, Pool Decking, Custom Pool Features",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Swimming Pool Features",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/custom-pool-features-1", pageMetadata);
}

export default function CustomPoolFeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <ConsolidatedFeaturesPage />
    </>
  );
}
