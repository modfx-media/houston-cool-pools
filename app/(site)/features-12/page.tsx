import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Custom Pool Features Gallery 2 - Houston Cool Pools";
const DESCRIPTION =
  "More custom water features and creative pool designs from Houston Cool Pools serving Cypress, Spring, Tomball, The Heights, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-12";

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
  name: "Custom Features Gallery 2",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-12/01.jpg", alt: "Custom water feature on a designer pool" },
  { src: "/images/features/features-12/02.jpg", alt: "Artistic pool with integrated water feature" },
  { src: "/images/features/features-12/03.jpg", alt: "One-of-a-kind custom pool design" },
  { src: "/images/features/features-12/04.jpg", alt: "Custom pool with unique water elements" },
  { src: "/images/features/features-12/05.jpg", alt: "Creative water feature in a backyard pool" },
  { src: "/images/features/features-12/06.jpg", alt: "Signature custom pool feature" },
  { src: "/images/features/features-12/07.jpg", alt: "Bespoke pool with sculptural water feature" },
  { src: "/images/features/features-12/08.jpg", alt: "Inspirational custom pool design" },
];

const SECTIONS = [
  {
    body:
      "Water features in your custom pool are one of the most creative and integral parts of a pool design experience. This gallery continues to showcase the special inspirations that allow our pools to be works of art that will be enjoyed and admired now and into the future.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-12", pageMetadata);
}

export default function Features12Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Custom Features Gallery 2"
        intro="A continued look at the creative water features that make our pools true works of art."
        activeHref="/features-11"
        heroImage="/images/features/features-12/hero.jpg"
        sectionHeading="Custom Water Features · Gallery 2"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-11"
        prevLabel="Custom Features Gallery 1"
        nextHref="/features-13"
        nextLabel="Custom Features Gallery 3"
      />
    </>
  );
}
