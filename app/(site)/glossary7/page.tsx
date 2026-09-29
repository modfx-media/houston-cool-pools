import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary7";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - L–O | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms L through O - lap pool, main drain, muriatic acid, non-chlorine shock, oxidation, ozone and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - L–O",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary7", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlossaryClient
        letter="L"
        letterLabel="L–O"
        pageIndex={6}
        terms={[
          {
            term: "Lap Pool",
            body: "A long, narrow pool, usually about four feet deep, for swimming laps.",
          },
          {
            term: "Lateral",
            body: "Usually a series of small perforated pipes at the base of a sand filter that forces water through the sand bed for filtration.",
          },
          {
            term: "Leaf Net",
            body: "Deep net attached to the end of a multi-purpose pole that skims surface debris.",
          },
          {
            term: "Leaf Rake",
            body: "Metal brush used to brush off the top of algae spores and allow chlorine to penetrate and kill them.",
          },
          {
            term: "Main Drain",
            body: "The grate at the bottom of a pool or spa - should be equipped as a dual drain with suction or with an anti-vortex system to avoid hair or body entrapment.",
          },
          { term: "Modular Media", body: "Large-capacity cartridge filter." },
          { term: "Muriatic Acid", body: "Dilute hydrochloric acid used to lower pH level in pool water." },
          {
            term: "Non-Chlorine Shock",
            body: "Does not contain chlorine but can oxidize organic waste.",
          },
          {
            term: "O-Ring",
            body: "Rubber ring used on equipment for a better seal. Example: the o-ring under the main circulation pump\u2019s see-through lid.",
          },
          {
            term: "Oxidation",
            body: "Chemical process of burning up and eliminating ammonia compounds, nitrogen compounds and swimmer waste. A chlorine or non-chlorine shock may be used.",
          },
          {
            term: "Ozone",
            body: "Molecule containing 3 atoms of oxygen to oxidize the water. For pool sanitizing this product is called an ozonator.",
          },
        ]}
      />
    </>
  );
}
