import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Tables & Barstools - Houston Cool Pools";
const DESCRIPTION =
  "In-pool tables, benches and barstools extend your entertainment opportunities. Custom pool features from Houston Cool Pools serving Cypress, Spring, Tomball, and Katy.";
const CANONICAL = "https://houstoncoolpools.com/features-6";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Tables, Barstools, In-Pool Benches, Pool Features, Custom Pool Features, Pool Builder Tomball",
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
  name: "Tables & Barstools",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-6/01.jpg", alt: "In-pool table with barstools" },
  { src: "/images/features/features-6/02.jpg", alt: "Swim-up bar with seating in a custom pool" },
  { src: "/images/features/features-6/03.jpg", alt: "Pool table and bench seating area" },
  { src: "/images/features/features-6/04.jpg", alt: "In-water barstools at a pool" },
  { src: "/images/features/features-6/05.jpg", alt: "Custom in-pool dining table" },
  { src: "/images/features/features-6/06.jpg", alt: "Pool with built-in table and benches" },
];

const SECTIONS = [
  {
    body:
      "Practical, enjoyable and adding an interesting design element to your pool, table and benches can extend your entertainment opportunities. They can be free standing or combined and customized to exact design.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-6", pageMetadata);
}

export default function Features6Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Tables & Barstools"
        intro="Extend your entertaining right into the water with custom in-pool tables, benches and barstools."
        activeHref="/features-6"
        heroImage="/images/features/features-6/hero.jpg"
        sectionHeading="Tables & Benches"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-5"
        prevLabel="Rock Waterfall & Grotto"
        nextHref="/features-pool-decking"
        nextLabel="Pool Decking"
      />
    </>
  );
}
