import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { PoolFinancingClient } from "../components/info/PoolFinancingClient";

const SLUG = "poolfinancing";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Pool Financing - Houston Cool Pools",
  description:
    "Trusted lending partners for financing your Houston pool build or remodel - HFS, Lyon Financial, LightStream, Viking Capital, Frost Bank and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pool Financing",
  url: CANONICAL,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://houstoncoolpools.com/" },
      { "@type": "ListItem", position: 2, name: "Pool Information", item: "https://houstoncoolpools.com/pool-information" },
      { "@type": "ListItem", position: 3, name: "Pool Financing", item: CANONICAL },
    ],
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/poolfinancing", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PoolFinancingClient />
    </>
  );
}
