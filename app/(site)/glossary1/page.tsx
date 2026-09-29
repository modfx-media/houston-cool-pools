import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary1";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - A | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms starting with A - acid, air relief valve, algae, algaecide, alkalinity, automatic controller, automatic pool cleaner and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - A",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary1", pageMetadata);
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
        letter="A"
        letterLabel="A"
        pageIndex={0}
        terms={[
          {
            term: "Acid",
            body: "1) Level of pH in your pool water - how corrosive it is. 2) Liquid you put in your pool to make water-chemistry corrections.",
          },
          {
            term: "Air Relief Valve",
            body: "The small screw valve on the top of a pool filter by the pressure gauge. It bleeds off air after you turn the pump on.",
          },
          {
            term: "Algae",
            body: "A plant-type organism that can grow in a pool when not sanitized enough. Types include blue-green (or black), mustard yellow, and pink slime.",
          },
          {
            term: "Algae Brush",
            body: "Metal brush used to brush the top off the spores and allow chlorine to penetrate and kill it.",
          },
          {
            term: "Algaecide",
            body: "Surrounds the algae cell, causing it to open so chlorine has a better chance of killing it.",
          },
          {
            term: "Alkalinity",
            body: "Sometimes called Total Alkalinity - the proper level helps pH balance and prevents extremes in pH that can cause many problems in chemistry.",
          },
          {
            term: "Alkalinity Increaser",
            body: "Increases the total-alkalinity reading. Sodium bicarbonate - baking soda.",
          },
          {
            term: "Automatic Controller",
            body: "Computerized device that controls all equipment functionality automatically.",
          },
          {
            term: "Automatic Pool Cleaner",
            body: "Device that automatically vacuums pools - for example, the Pentair Legend Cleaner.",
          },
        ]}
      />
    </>
  );
}
