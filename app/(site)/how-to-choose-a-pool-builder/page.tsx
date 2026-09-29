import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { HowToChooseClient } from "../components/info/HowToChooseClient";

const SLUG = "how-to-choose-a-pool-builder";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "How To Choose The Right Pool Builder - 15 Questions",
  description:
    "The 15 questions every Houston homeowner should ask before hiring a swimming pool builder - a builder-transparent guide to protect yourself before signing any contracts.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How To Choose The Right Pool Builder",
  description:
    "Ask these 15 questions to protect yourself from an unpleasant pool-building experience.",
  url: CANONICAL,
  author: {
    "@type": "Organization",
    name: "Houston Cool Pools",
  },
  publisher: {
    "@type": "Organization",
    name: "Houston Cool Pools",
    logo: {
      "@type": "ImageObject",
      url: "https://houstoncoolpools.com/images/logo.png",
    },
  },
  mainEntityOfPage: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/how-to-choose-a-pool-builder", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HowToChooseClient />
    </>
  );
}
