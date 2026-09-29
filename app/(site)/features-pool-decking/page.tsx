import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { FeaturePage } from "../components/features/FeaturePage";

const TITLE = "Pool Decking Options - Houston Cool Pools";
const DESCRIPTION =
  "Explore pool decking options from travertine and flagstone to spray deck, pavers and stamped concrete. Custom pool decking from Houston Cool Pools.";
const CANONICAL = "https://houstoncoolpools.com/features-pool-decking";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Decking, Travertine Pavers, Flagstone, Spray Deck, Stamped Concrete, Pool Features, Pool Builder Tomball",
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
  name: "Pool Decking",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const IMAGES = [
  { src: "/images/features/features-pool-decking/01.jpg", alt: "Peagravel pool decking", caption: "Peagravel" },
  { src: "/images/features/features-pool-decking/02.jpg", alt: "Stamped concrete pool decking", caption: "Stamped Concrete" },
  { src: "/images/features/features-pool-decking/03.jpg", alt: "Flagstone runner inlays decking", caption: "Flagstone Runner Inlays" },
  { src: "/images/features/features-pool-decking/04.jpg", alt: "Spray deck pool surface", caption: "Spray Deck" },
  { src: "/images/features/features-pool-decking/05.jpg", alt: "Spray deck pool decking", caption: "Spray Deck" },
  { src: "/images/features/features-pool-decking/06.jpg", alt: "Spray deck pool finish", caption: "Spray Deck" },
  { src: "/images/features/features-pool-decking/07.jpg", alt: "Travertine pavers pool decking", caption: "Travertine Pavers" },
  { src: "/images/features/features-pool-decking/08.jpg", alt: "Travertine tile pool decking", caption: "Travertine Tile" },
  { src: "/images/features/features-pool-decking/09.jpg", alt: "Turf pool decking", caption: "Turf" },
  { src: "/images/features/features-pool-decking/10.jpg", alt: "Sandstone paver pool decking", caption: "Sandstone Paver" },
  { src: "/images/features/features-pool-decking/11.jpg", alt: "Limestone overlay pool decking", caption: "Limestone Overlay" },
  { src: "/images/features/features-pool-decking/12.jpg", alt: "Rustic brick paver pool decking", caption: "Rustic Brick Paver" },
  { src: "/images/features/features-pool-decking/13.jpg", alt: "Flagstone pool decking", caption: "Flagstone" },
  { src: "/images/features/features-pool-decking/14.jpg", alt: "Turf pavers pool decking", caption: "Turf Pavers" },
  { src: "/images/features/features-pool-decking/15.jpg", alt: "Stamped overlay pool decking", caption: "Stamped Overlay" },
  { src: "/images/features/features-pool-decking/16.jpg", alt: "Colored concrete tile with rock salt finish decking", caption: "Colored Concrete Tile With Rock Salt Finish" },
  { src: "/images/features/features-pool-decking/17.jpg", alt: "Stamped concrete with rock salt finish decking", caption: "Stamped Concrete With Rock Salt Finish" },
];

const SECTIONS = [
  {
    body:
      "Your pool deck sets the tone for your entire backyard. From natural stone and travertine to pavers, spray deck and stamped concrete finishes, the right decking ties your poolscape together with beauty, comfort and durability. Explore the many decking types we offer below.",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/features-pool-decking", pageMetadata);
}

export default function FeaturesPoolDeckingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <FeaturePage
        heading="Pool Decking"
        intro="From natural stone to stamped concrete, choose the decking that ties your entire poolscape together."
        activeHref="/features-pool-decking"
        heroImage="/images/features/features-pool-decking/hero.jpg"
        sectionHeading="Decking Types"
        sections={SECTIONS}
        images={IMAGES}
        prevHref="/features-6"
        prevLabel="Tables & Barstools"
        nextHref="/features-7"
        nextLabel="Stepping Stones"
      />
    </>
  );
}
