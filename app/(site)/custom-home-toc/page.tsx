import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { CustomHomeTocClient } from "../components/info/CustomHomeTocClient";

const SLUG = "custom-home-toc";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Custom Home Builder Associations - Houston Cool Pools",
  description:
    "Houston Cool Pools partners with leading Houston-area custom home builders including Ridgewater Homes, Mazzarino Construction, Robert Sanders, Timeline Construction and Nautilus Real Estate.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Custom Home Builder Associations",
  url: CANONICAL,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://houstoncoolpools.com/" },
      { "@type": "ListItem", position: 2, name: "Pool Information", item: "https://houstoncoolpools.com/pool-information" },
      { "@type": "ListItem", position: 3, name: "Custom Home Builder", item: CANONICAL },
    ],
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/custom-home-toc", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomHomeTocClient />
    </>
  );
}
