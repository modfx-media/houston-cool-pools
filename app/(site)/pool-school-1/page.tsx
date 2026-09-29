import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { PoolSchoolClient } from "../components/info/PoolSchoolClient";

const SLUG = "pool-school-1";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Pool Owner School | Chemistry and Equipment Tutorials",
  description:
    "Free owner tutorials from Houston Cool Pools on water testing, filters, chlorinators, and storm shutdown. For pool owners, not swim lessons.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Pool School",
  url: CANONICAL,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://houstoncoolpools.com/" },
      { "@type": "ListItem", position: 2, name: "Pool Information", item: "https://houstoncoolpools.com/pool-information" },
      { "@type": "ListItem", position: 3, name: "Pool School", item: CANONICAL },
    ],
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-school-1", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PoolSchoolClient />
    </>
  );
}
