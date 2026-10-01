import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { PoolRemodelHero } from "../components/pool-remodel/PoolRemodelHero";
import { PoolRemodelIntro } from "../components/pool-remodel/PoolRemodelIntro";
import { PoolRemodelVideo } from "../components/pool-remodel/PoolRemodelVideo";
import { RenovationIdeas } from "../components/pool-remodel/RenovationIdeas";
import { WhatsCovered } from "../components/pool-remodel/WhatsCovered";

const TITLE = "Pool Renovation & Remodeling Services in Houston, TX";
const DESCRIPTION =
  "Is your old pool looking dated? Houston Cool Pools offers expert pool remodeling and renovation services in Houston, TX. Resurfacing, tile, spa additions and more.";
const CANONICAL = "https://houstoncoolpools.com/pool-remodel";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Builder, Pool Remodel, Pool Renovation Houston TX, Pool Resurfacing",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pool Remodel and Renovation Houston TX",
  serviceType: "Pool Renovation, Pool Resurfacing, Pool Remodeling",
  provider: {
    "@type": "LocalBusiness",
    name: "Houston Cool Pools",
    telephone: "+1-281-938-4830",
    address: {
      "@type": "PostalAddress",
      streetAddress: "21902 Highway 249",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77070",
    },
  },
};

const REASON_GROUPS: { heading: string; items: string[] }[] = [
  {
    heading: "Why Choose Houston Cool Pools?",
    items: [
      "30+ Years in Business",
      "A+ Rated with the BBB",
      "A Rated with Angie's List",
    ],
  },
  {
    heading: "Peace of Mind",
    items: [
      'We only use "Best Practice" Building Techniques',
      "Highest Quality Materials",
      "State of the Art Equipment",
    ],
  },
  {
    heading: "We Got You Covered!",
    items: [
      "Full showroom",
      "Prepare HOA Applications",
      "Coordinate Utility Reroutes",
      "One Stop Shopping: Outdoor Kitchens, Patios/Pergolas, Fire Pits/Fireplaces, Landscaping Packages",
    ],
  },
];

const RENOVATION_IDEAS: { label: string; icon: string; href?: string }[] = [
  { label: "Resurfacing the pool", icon: "resurface", href: "https://houstoncoolpools.com/pdf/DisposableSandSiltBagIG.pdf" },
  { label: "Installing new tiles", icon: "tile", href: "https://houstoncoolpools.com/pdf/DisposableSandSiltBagIG.pdf" },
  { label: "New coping", icon: "coping", href: "https://houstoncoolpools.com/pdf/Rebel_Warrior_Tucson_Eng_OM_20181025_062540.pdf" },
  { label: "Installing LED lighting", icon: "light", href: "https://houstoncoolpools.com/pdf/ParamountOwnersManual.pdf" },
  { label: "Adding a spa", icon: "spa", href: "https://houstoncoolpools.com/pdf/Prowler820-830EOM.pdf" },
  { label: "Putting in new equipment", icon: "equipment", href: "https://houstoncoolpools.com/pdf/RacerEngOM.pdf" },
  { label: "Update decking", icon: "decking", href: "https://houstoncoolpools.com/pdf/RacerEngOM.pdf" },
  { label: "Salt chlorination systems", icon: "salt", href: "https://houstoncoolpools.com/pdf/RacerEngOM.pdf" },
  { label: "Heat pumps", icon: "heat", href: "https://houstoncoolpools.com/pdf/RacerEngOM.pdf" },
  { label: "Adding waterfall features", icon: "waterfall", href: "https://houstoncoolpools.com/pdf/RacerEngOM.pdf" },
  { label: "Automatic pool cleaner", icon: "equipment", href: "https://houstoncoolpools.com/pdf/RacerEngOM.pdf" },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-remodel", pageMetadata);
}

export default function PoolRemodelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <PoolRemodelHero />
      <PoolRemodelIntro reasonGroups={REASON_GROUPS} />
      <PoolRemodelVideo />
      <WhatsCovered />
      <RenovationIdeas ideas={RENOVATION_IDEAS} />
    </>
  );
}
