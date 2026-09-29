import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "More Custom Pool Features - Houston Cool Pools";
const DESCRIPTION =
  "Discover even more custom pool feature inspiration from Houston Cool Pools serving Cypress, Spring, Tomball, The Heights, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-14";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Custom Pool Features, Water Features, Pool Design, Custom Pools, Pool Builder Tomball, Pool Company Tomball",
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
  name: "Custom Pool Features",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-14/01.jpg", alt: "Custom water feature on a designer pool" },
  { src: "/images/features/features-14/02.jpg", alt: "Artistic pool with integrated water feature" },
  { src: "/images/features/features-14/03.jpg", alt: "One-of-a-kind custom pool design" },
  { src: "/images/features/features-14/04.jpg", alt: "Custom pool with unique water elements" },
  { src: "/images/features/features-14/05.jpg", alt: "Creative water feature in a backyard pool" },
  { src: "/images/features/features-14/06.jpg", alt: "Signature custom pool feature" },
  { src: "/images/features/features-14/07.jpg", alt: "Bespoke pool with sculptural water feature" },
  { src: "/images/features/features-14/08.jpg", alt: "Inspirational custom pool design" },
];

const SECTIONS = [
  {
    body:
      "Every Houston Cool Pools project is unique. Contact us to learn more about the custom features shown here and across our galleries, and let's design a one-of-a-kind pool built around the way you live.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-14", pageMetadata);
}

export default function Features14Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Custom Pool Features"
        intro="Even more inspiration for a pool designed entirely around your vision."
        activeHref="/features-11"
        heroImage="/images/features/features-14/hero.jpg"
        sectionHeading="Custom Pool Features"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-13"
        prevLabel="Custom Features Gallery 3"
      />
    </>
  );
}
