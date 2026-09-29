import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Bubblers & Gushers - Houston Cool Pools";
const DESCRIPTION =
  "Energy-efficient bubblers add eye-catching style and soothing sound to sun shelves, steps and beach entries. Custom pool features from Houston Cool Pools.";
const CANONICAL = "https://houstoncoolpools.com/features-3";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Bubblers, Gushers, Sun Shelf Bubblers, Pool Features, Custom Pool Features, Pool Builder Tomball",
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
  name: "Bubblers (Gushers)",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-3/01.jpg", alt: "Pool bubbler on a sun shelf" },
  { src: "/images/features/features-3/02.jpg", alt: "Bubbler plume on a tanning ledge" },
  { src: "/images/features/features-3/03.jpg", alt: "LED-lit bubbler at night" },
  { src: "/images/features/features-3/04.jpg", alt: "Multiple bubblers on a pool shelf" },
  { src: "/images/features/features-3/05.jpg", alt: "Bubbler water feature with color lighting" },
  { src: "/images/features/features-3/06.jpg", alt: "Gusher bubbler in a custom pool" },
];

const SECTIONS = [
  {
    body:
      "Whether you're in the mood to relax or entertain, bubblers are the perfect way to showcase and enhance pool features like sun shelves, steps and beach entries. Their minimal water flow requirements make them an ideal, energy-efficient addition to pools, fountains, ponds and more. Plus, they add eye-catching style and soothing sound to heighten your senses and elevate your aquatic experience.",
    bullets: [
      "Designed for 2 in. – 10 in. of water depth",
      "Plume height up to 24 in.",
      "Low flow requirements allow for multiple units per pool",
      "Energy efficient color LED lights with vibrant colors",
      "Provides 5 brilliant fixed colors, 7 dazzling light shows",
    ],
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-3", pageMetadata);
}

export default function Features3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Bubblers (Gushers)"
        intro="Energy-efficient bubblers add eye-catching style and soothing sound to sun shelves, steps and beach entries."
        activeHref="/features-3"
        heroImage="/images/features/features-3/hero.jpg"
        sectionHeading="Bubblers & Gushers"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-2"
        prevLabel="Scuppers & Spillways"
        nextHref="/features-4"
        nextLabel="Sun Shelf & Beach Entry"
      />
    </>
  );
}
