import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Scuppers, Spa Spillways & Bubblers - Houston Cool Pools";
const DESCRIPTION =
  "Scuppers and spa spillways add lively streams of water to your pool design. Custom pool features from Houston Cool Pools serving Cypress, Spring, Tomball, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-2";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Scuppers, Spa Spillways, Pool Features, Custom Pool Features, Pool Builder Tomball, Pool Company Tomball",
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
  name: "Scuppers, Spa Spillways & Bubblers",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-2/01.jpg", alt: "Spa spillway flowing into a custom pool" },
  { src: "/images/features/features-2/02.jpg", alt: "Raised wall spillway with sheeting water" },
  { src: "/images/features/features-2/03.jpg", alt: "Pool spillway feature with stone accents" },
  { src: "/images/features/features-2/04.jpg", alt: "Elevated spa with cascading spillway" },
  { src: "/images/features/features-2/05.jpg", alt: "Spillway streaming into a backyard pool" },
  { src: "/images/features/features-2/06.jpg", alt: "Water spillway on a modern pool design" },
  { src: "/images/features/features-2/07.jpg", alt: "Spa spillway with tile detailing" },
  { src: "/images/features/features-2/08.jpg", alt: "Spillway feature with natural rock" },
  { src: "/images/features/features-2/09.jpg", alt: "Scupper spout re-entering a pool" },
  { src: "/images/features/features-2/10.jpg", alt: "Wall-mounted scupper water feature" },
  { src: "/images/features/features-2/11.jpg", alt: "Row of scuppers along a raised pool wall" },
];

const SECTIONS = [
  {
    body:
      "Most scupper and spillways styles are natural flowing and create a lively stream of water. You can find scuppers and spillways in a variety of different designs. Scuppers can be an attractive alternative (and save you money) over Waterfalls and Sheer Descents. They can often be slots (or spouts) in a raised wall that re-enters a pool.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-2", pageMetadata);
}

export default function Features2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Scuppers, Spa Spillways & Bubblers"
        intro="Add a lively, money-smart stream of water to your pool with scuppers and spa spillways in endless designs."
        activeHref="/features-2"
        heroImage="/images/features/features-2/hero.jpg"
        sectionHeading="Spas · Spillways · Scuppers"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/custom-pool-features-1"
        prevLabel="Sheer Descents"
        nextHref="/features-3"
        nextLabel="Bubblers"
      />
    </>
  );
}
