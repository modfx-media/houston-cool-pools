import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Sun Shelf, Beach Entry & Fast Lane - Houston Cool Pools";
const DESCRIPTION =
  "Sun shelves, beach entries and Fast Lane swim systems for your custom pool. Houston Cool Pools serving Cypress, Spring, Tomball, The Heights, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-4";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Sun Shelf, Tanning Shelf, Beach Entry Pool, Fast Lane, Pool Features, Custom Pool Features, Pool Builder Tomball",
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
  name: "Sun Shelf, Beach Entry & Fast Lane",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-4/01.jpg", alt: "Sun shelf tanning ledge on a custom pool" },
  { src: "/images/features/features-4/02.jpg", alt: "Extended sun shelf entry into a pool" },
  { src: "/images/features/features-4/03.jpg", alt: "Beach entry pool with gradual slope" },
  { src: "/images/features/features-4/04.jpg", alt: "Caribbean-style beach entry pool" },
  { src: "/images/features/features-4/05.jpg", alt: "Fast Lane swim system in a pool" },
  { src: "/images/features/features-4/06.jpg", alt: "Pool with Fast Lane current swim system" },
];

const SECTIONS = [
  {
    title: "Sun Shelf",
    body:
      "Sun shelf (called by many names including Tanning Shelf) have become one of the most popular pool add-ons you can choose for your pool. They can be free standing in a pool or an extended first step for entry into the pool. They can be in the shallow end of a pool or as a feature in your design.",
  },
  {
    title: "Beach Entry",
    body:
      "A beach entry pool has no steps anywhere for a taste of the islands. Everyday can feel like a trip to a Caribbean resort, a natural stone rock or other materials can only accentuate the look.",
  },
  {
    title: "Fast Lane",
    body:
      "Add a Fast Lane swim system to enjoy resistance swimming and aquatic exercise in your own backyard - no matter the size of your pool.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-4", pageMetadata);
}

export default function Features4Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Sun Shelf, Beach Entry & Fast Lane"
        intro="Lounge on a tanning ledge, wade in island-style, or swim against the current - all in your custom pool."
        activeHref="/features-4"
        heroImage="/images/features/features-4/hero.jpg"
        sectionHeading="Sun Shelf · Beach Entry · Fast Lane"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-3"
        prevLabel="Bubblers"
        nextHref="/features-5"
        nextLabel="Rock Waterfall & Grotto"
      />
    </>
  );
}
