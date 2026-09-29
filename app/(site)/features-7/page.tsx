import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Stepping Stones - Houston Cool Pools";
const DESCRIPTION =
  "Landscaping stepping stones line hardscape elements and add definition to your pool. Custom pool features from Houston Cool Pools serving Cypress, Spring, and Tomball.";
const CANONICAL = "https://houstoncoolpools.com/features-7";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Stepping Stones, Landscaping Stones, Pool Features, Custom Pool Features, Pool Builder Tomball, Pool Company Tomball",
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
  name: "Stepping Stones",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-7/01.jpg", alt: "Stepping stones leading to a pool" },
  { src: "/images/features/features-7/02.jpg", alt: "Landscaping stones lining a pool deck" },
  { src: "/images/features/features-7/03.jpg", alt: "Natural stepping stones in a backyard" },
  { src: "/images/features/features-7/04.jpg", alt: "Stone path transitioning to soft landscaping" },
  { src: "/images/features/features-7/05.jpg", alt: "Stepping stones accenting a poolscape" },
  { src: "/images/features/features-7/06.jpg", alt: "Hardscape stepping stones by a pool" },
];

const SECTIONS = [
  {
    body:
      "Landscaping stones are a fantastic way to line hardscape elements and accents to your pool. They can add interest and definition to hard edges and help transition hard space to soft space.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-7", pageMetadata);
}

export default function Features7Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Stepping Stones"
        intro="Line hardscape edges and transition hard space to soft with beautiful landscaping stones."
        activeHref="/features-7"
        heroImage="/images/features/features-7/hero.jpg"
        sectionHeading="Stepping Stones"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-pool-decking"
        prevLabel="Pool Decking"
        nextHref="/features-8"
        nextLabel="Slides"
      />
    </>
  );
}
