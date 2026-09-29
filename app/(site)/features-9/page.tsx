import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Fire Features & Fire Pits - Houston Cool Pools";
const DESCRIPTION =
  "Outdoor fire features and fire pits turn your pool area into a year-round gathering space. Custom pool features from Houston Cool Pools serving Cypress, Spring, and Tomball.";
const CANONICAL = "https://houstoncoolpools.com/features-9";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Fire Features, Fire Pits, Outdoor Living, Pool Features, Custom Pool Features, Pool Builder Tomball",
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
  name: "Fire Features",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-9/01.jpg", alt: "Fire feature beside a custom pool" },
  { src: "/images/features/features-9/02.jpg", alt: "Fire pit gathering area near a pool" },
  { src: "/images/features/features-9/03.jpg", alt: "Outdoor fire bowl by a pool" },
  { src: "/images/features/features-9/04.jpg", alt: "Fire and water feature combination" },
  { src: "/images/features/features-9/05.jpg", alt: "Backyard fire pit with seating" },
  { src: "/images/features/features-9/06.jpg", alt: "Raised fire feature on a pool deck" },
  { src: "/images/features/features-9/07.jpg", alt: "Evening fire feature glowing by a pool" },
  { src: "/images/features/features-9/08.jpg", alt: "Custom fire pit in an outdoor living area" },
  { src: "/images/features/features-9/09.jpg", alt: "Fire feature centerpiece in a backyard" },
];

const SECTIONS = [
  {
    body:
      "When it comes to backyard living and design, outdoor fire features are one of the most popular trends. Today, people are creating new living spaces to enjoy daily. These backyard living areas are designed as extensions of the homes.",
  },
  {
    body:
      "These beautiful pieces are used not only for warmth and marshmallow roasting but more as gathering points for company to sit around enjoy. Along with your pool, living areas defined with a fire pit as the center of attention attract people to the space to socialize, enjoy an evening cocktail, or just hang out.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-9", pageMetadata);
}

export default function Features9Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Fire Features"
        intro="Extend your backyard living into the evening with warm, inviting outdoor fire features and fire pits."
        activeHref="/features-9"
        heroImage="/images/features/features-9/hero.jpg"
        sectionHeading="Fire Features · Gallery 1"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-8"
        prevLabel="Slides"
        nextHref="/features-10"
        nextLabel="Fire Features Gallery 2"
      />
    </>
  );
}
