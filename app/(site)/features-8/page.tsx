import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Slides - Houston Cool Pools";
const DESCRIPTION =
  "Pool slides guarantee a memorable experience for the whole family. Custom pool features from Houston Cool Pools serving Cypress, Spring, Tomball, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-8";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Slides, Water Slides, Pool Features, Custom Pool Features, Pool Builder Tomball, Pool Company Tomball",
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
  name: "Slides",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-8/01.jpg", alt: "Pool slide into a custom pool" },
  { src: "/images/features/features-8/02.jpg", alt: "Rock-style water slide by a pool" },
  { src: "/images/features/features-8/03.jpg", alt: "Curved pool slide in a backyard" },
  { src: "/images/features/features-8/04.jpg", alt: "Pool slide built into a grotto" },
  { src: "/images/features/features-8/05.jpg", alt: "Family pool slide feature" },
  { src: "/images/features/features-8/06.jpg", alt: "Custom pool with water slide" },
];

const SECTIONS = [
  {
    body:
      "Pool Slides - they have taken our pool enjoyment to another level for decades! What fun! Different configurations are available and proper installation is a must but if you are looking for a pool feature that will guarantee a memorable experience, look no further than a pool slide.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-8", pageMetadata);
}

export default function Features8Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Slides"
        intro="Guarantee a memorable splash with a custom pool slide built for fun and adventure."
        activeHref="/features-8"
        heroImage="/images/features/features-8/hero.jpg"
        sectionHeading="Pool Slides"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-7"
        prevLabel="Stepping Stones"
        nextHref="/features-9"
        nextLabel="Fire Features"
      />
    </>
  );
}
