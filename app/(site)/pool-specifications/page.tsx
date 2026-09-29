import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { PoolSpecsHero } from "../components/pool-specifications/PoolSpecsHero";
import { SpecsGrid } from "../components/pool-specifications/SpecsGrid";
import { SpecsShowcase } from "../components/pool-specifications/SpecsShowcase";
import { ContactFormSection } from "../components/contact/ContactFormSection";

const TITLE = "Detailed Pool Specifications in Houston, TX";
const DESCRIPTION =
  "See the detailed standard pool construction specifications from Houston Cool Pools. Steel, gunite, electrical, equipment and finishes - all laid out clearly.";
const CANONICAL = "https://houstoncoolpools.com/pool-specifications";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
  name: "Standard Pool Construction Specifications",
  description:
    "Detailed standard pool construction specifications from Houston Cool Pools Houston TX",
  url: "https://houstoncoolpools.com/pool-specifications",
  isPartOf: {
    "@type": "WebSite",
    name: "Houston Cool Pools",
    url: "https://houstoncoolpools.com",
  },
};

const SPEC_CATEGORIES: { heading: string; icon: string; items: string[] }[] = [
  {
    heading: "Steel",
    icon: "steel",
    items: [
      "8 inch on center 3/8 inch steel rebar throughout the pool (extra steel used for deeper pools)",
      "12 x 12 inch box beam containing 4 - 1/2 inch rebar reinforcement",
    ],
  },
  {
    heading: "Gunite",
    icon: "gunite",
    items: [
      "12 inch continuous bond beam with 6 to 9 inch walls and floors",
      "Gunite cures for 18 days before plaster.",
    ],
  },
  {
    heading: "Electrical",
    icon: "electrical",
    items: [
      "100 ft of underground wiring per National Electrical Code on every job, City or County",
    ],
  },
  {
    heading: "Equipment - Part of Base Pool",
    icon: "equipment",
    items: [
      "Pentair 420 sq. ft. Clean & Clear Plus Cartridge Filter",
      "Cyclone Centrifugal Pre Filter",
      "Pentair Intelliflow Variable Speed Energy Efficient Pump",
      "Pentair Pool Cleaner",
      "1 LED Pool Light - premium LED multicolored with light shows or 2 Glow Bright Lights",
      "Pentair Remote System with Smart Phone Control",
      "Pool maintenance equipment included: Test kit, pole, brush, net, vacuum hose, vacuum head, thermometer",
      "4+ in. poured gunite equipment slab with steel rebar",
      "Rainbow 320 inline chlorinator",
    ],
  },
  {
    heading: "Finishes",
    icon: "finishes",
    items: [
      "Standard Coping - Travertine / Flagstone / Brick",
      "6 inch standard waterline tile selection included - 100's to choose from",
      "3 entrance steps (Step width: 1st 18 in., 2nd 18 in., 3rd 14 in.)",
      "Double coat of white marble plaster with silicone additive",
    ],
  },
  {
    heading: "Pool School & Maintenance",
    icon: "school",
    items: [
      "Training on how to use your pool equipment and maintain your chemicals - given by our certified Pentair Rep",
      "1 month of maintenance provided to ensure proper startup",
    ],
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-specifications", pageMetadata);
}

export default function PoolSpecificationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <PoolSpecsHero />
      <SpecsGrid categories={SPEC_CATEGORIES} />
      <SpecsShowcase />
      <ContactFormSection />
    </>
  );
}
