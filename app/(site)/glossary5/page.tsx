import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary5";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - F–G | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms starting with F and G - float valve, gas heater, gate valve, grid, gunite and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - F–G",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary5", pageMetadata);
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
        letter="F"
        letterLabel="F–G"
        pageIndex={4}
        terms={[
          {
            term: "Float Valve",
            body: "Valve at the bottom of a skimmer to control the water flow.",
          },
          {
            term: "Gas Heater",
            body: "Spas and heated pools require a large heater to quickly heat the large volume of water necessary. These are fueled by propane or natural gas and are often the most expensive piece of equipment.",
          },
          {
            term: "Gate Valve",
            body: "Valve that twists on and off, lowering or raising a gate internally.",
          },
          {
            term: "Grid",
            body: "Can be called grid or filter element. Device inside a DE filter that is coated with DE powder and traps particles in the water.",
          },
          {
            term: "Gunite",
            body: "A type of concrete that is applied with a sprayer to form the pool shell. It can also be used to form slides, waterfalls, pads, and other features.",
          },
        ]}
      />
    </>
  );
}
