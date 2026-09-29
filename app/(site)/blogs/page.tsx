import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { ArticlesIndex } from "../components/articles/ArticlesIndex";
import { ARTICLES } from "../../../lib/articles";

const SLUG = "blogs";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Swimming Pool Articles",
  url: CANONICAL,
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://houstoncoolpools.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pool Information",
        item: "https://houstoncoolpools.com/pool-information",
      },
      { "@type": "ListItem", position: 3, name: "Pool Articles", item: CANONICAL },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://houstoncoolpools.com/blogs/${a.slug}`,
      name: a.title,
    })),
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/blogs", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <ArticlesIndex />
    </>
  );
}
