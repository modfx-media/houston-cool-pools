import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Custom Pool Features Gallery 3 - Houston Cool Pools";
const DESCRIPTION =
  "Even more custom water features and creative pool designs from Houston Cool Pools serving Cypress, Spring, Tomball, The Heights, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-13";

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
  name: "Custom Features Gallery 3",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-13/01.jpg", alt: "Custom water feature on a designer pool" },
  { src: "/images/features/features-13/02.jpg", alt: "Artistic pool with integrated water feature" },
  { src: "/images/features/features-13/03.jpg", alt: "One-of-a-kind custom pool design" },
  { src: "/images/features/features-13/04.jpg", alt: "Custom pool with unique water elements" },
  { src: "/images/features/features-13/05.jpg", alt: "Creative water feature in a backyard pool" },
  { src: "/images/features/features-13/06.jpg", alt: "Signature custom pool feature" },
  { src: "/images/features/features-13/07.jpg", alt: "Bespoke pool with sculptural water feature" },
  { src: "/images/features/features-13/08.jpg", alt: "Inspirational custom pool design" },
];

const SECTIONS = [
  {
    body:
      "Water features in your custom pool are one of the most creative and integral parts of a pool design experience. This gallery rounds out our showcase of the special inspirations that allow our pools to be works of art that will be enjoyed and admired now and into the future.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-13", pageMetadata);
}

export default function Features13Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Custom Features Gallery 3"
        intro="The final chapter of our custom water feature showcase - pools designed to be admired for years to come."
        activeHref="/features-11"
        heroImage="/images/features/features-13/hero.jpg"
        sectionHeading="Custom Water Features · Gallery 3"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-12"
        prevLabel="Custom Features Gallery 2"
        nextHref="/features-14"
        nextLabel="More Custom Features"
      />
    </>
  );
}
