import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary3";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - C | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms starting with C - calcium, cantilever edge, cartridge filter, chlorine, coping, cyanuric acid and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - C",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary3", pageMetadata);
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
        letter="C"
        letterLabel="C"
        pageIndex={2}
        terms={[
          {
            term: "Calcium Carbonate",
            body: "Calcium scale - forms crystals and can hinder circulation and cause rough deposits on surfaces.",
          },
          { term: "Calcium Hardness", body: "Amount of minerals in pool water." },
          { term: "Calcium Hypochlorite", body: "A form of chlorine shock." },
          {
            term: "Cantilever Edge",
            body: "A pool deck of a poured or sprayed material that extends slightly beyond the edge of the pool, negating the need for traditional coping.",
          },
          {
            term: "Cartridge Filter",
            body: "A filtration system that uses a fine mesh material to remove suspended contaminants from the water. Requires a 30-minute cleaning with a garden hose six to ten times per year.",
          },
          {
            term: "Chloramine",
            body: "Chlorine tied up with ammonia to a level that doesn\u2019t allow it to kill bacteria or oxidize organic waste.",
          },
          {
            term: "Chlorine",
            body: "Chemical used to sanitize pools. Comes in several forms and strengths. Free chlorine is available to sanitize; combined chlorine is tied up; total chlorine is the measure of both.",
          },
          {
            term: "Chlorinator",
            body: "A unit that holds chlorine tablets and automatically treats the water.",
          },
          {
            term: "Clarifier",
            body: "Chemical that assists the main filter by combining particles too small for the filter into larger particles the filter can capture.",
          },
          {
            term: "Coping",
            body: "The material that covers the first nine to twelve inches of horizontal surface at the pool\u2019s edge. It can be brick, flagstone, concrete, or one of many natural or man-made materials.",
          },
          { term: "Copper", body: "A metal that can be found in pools. Can stain with blue or aqua color spots." },
          {
            term: "Corrosive",
            body: "Water condition that is too acidic. If uncorrected it can cause increased wear on metal parts of the pool and equipment and can also cause etching of walls in a gunite pool.",
          },
          {
            term: "Cyanuric Acid",
            body: "Also called conditioner or stabilizer. Added to assist chlorine in not dissipating as quickly in sunlight.",
          },
        ]}
      />
    </>
  );
}
