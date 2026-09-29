import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Rock Waterfalls & Grottos - Houston Cool Pools";
const DESCRIPTION =
  "Rock waterfalls and grottos add natural beauty and the soothing sound of falling water to your pool. Custom pool features from Houston Cool Pools.";
const CANONICAL = "https://houstoncoolpools.com/features-5";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Rock Waterfall, Grotto, Pool Waterfalls, Rock Formations, Pool Features, Custom Pool Features, Pool Builder Tomball",
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
  name: "Rock Waterfall & Grotto Waterfall",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-5/01.jpg", alt: "Rock waterfall cascading into a custom pool" },
  { src: "/images/features/features-5/02.jpg", alt: "Natural stone waterfall formation by a pool" },
  { src: "/images/features/features-5/03.jpg", alt: "Pool grotto with hidden seating" },
  { src: "/images/features/features-5/04.jpg", alt: "Grotto waterfall over a backyard pool" },
  { src: "/images/features/features-5/05.jpg", alt: "Rock formation and waterfall pool feature" },
];

const SECTIONS = [
  {
    body:
      "In recent years Rock Formations and Waterfalls have become very popular in pool design. They are a beautiful addition to the look of your pool and add an incredible sound to your pool. Rock Waterfalls can add a wonderful natural visual element to your backyard oasis! A truly unique addition to your pool - a Grotto! Grottos can incorporate a waterfall. They can range from simple seats to hidden pools and gathering areas. Sometimes instead of a waterfall (or in addition to it) the top of a grotto can incorporate another water feature such as a slide.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-5", pageMetadata);
}

export default function Features5Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Rock Waterfall & Grotto Waterfall"
        intro="Bring natural beauty and the soothing sound of falling water to your backyard oasis."
        activeHref="/features-5"
        heroImage="/images/features/features-5/hero.jpg"
        sectionHeading="Rock Waterfalls · Grottos"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-4"
        prevLabel="Sun Shelf & Beach Entry"
        nextHref="/features-6"
        nextLabel="Tables & Barstools"
      />
    </>
  );
}
