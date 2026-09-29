import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Fire Features Gallery 2 - Houston Cool Pools";
const DESCRIPTION =
  "More outdoor fire features and fire pits from Houston Cool Pools. Custom pool features serving Cypress, Spring, Tomball, The Heights, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-10";

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
  name: "Fire Features Gallery 2",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-10/01.jpg", alt: "Fire feature glowing beside a pool" },
  { src: "/images/features/features-10/02.jpg", alt: "Outdoor fire pit gathering space" },
  { src: "/images/features/features-10/03.jpg", alt: "Fire bowl on a custom pool deck" },
  { src: "/images/features/features-10/04.jpg", alt: "Fire and water feature near a pool" },
  { src: "/images/features/features-10/05.jpg", alt: "Backyard fire feature with seating" },
  { src: "/images/features/features-10/06.jpg", alt: "Raised fire pit by a pool" },
  { src: "/images/features/features-10/07.jpg", alt: "Evening fire feature in an outdoor living area" },
  { src: "/images/features/features-10/08.jpg", alt: "Custom fire feature centerpiece" },
  { src: "/images/features/features-10/09.jpg", alt: "Fire pit and pool at dusk" },
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
  return cmsMetadata("/features-10", pageMetadata);
}

export default function Features10Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Fire Features Gallery 2"
        intro="More inspiration for warm, inviting outdoor fire features that anchor your backyard living space."
        activeHref="/features-9"
        heroImage="/images/features/features-10/hero.jpg"
        sectionHeading="Fire Features · Gallery 2"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-9"
        prevLabel="Fire Features Gallery 1"
        nextHref="/features-11"
        nextLabel="Custom Features"
      />
    </>
  );
}
