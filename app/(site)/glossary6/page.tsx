import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary6";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - H–K | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms H through K - head pressure, heater, hypochlorous acid, in-floor cleaning system, inlet, ion generating system, iron.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - H–K",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary6", pageMetadata);
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
        letter="H"
        letterLabel="H–K"
        pageIndex={5}
        terms={[
          {
            term: "Head Pressure",
            body: "1) Level of pH in your pool water - how corrosive it is. 2) Liquid you put in your pool to make water-chemistry corrections.",
          },
          { term: "Heater", body: "Equipment used to heat water in the pool and/or spa." },
          { term: "Hypochlorous Acid", body: "Bacteria-killing chlorine." },
          {
            term: "In-Floor Cleaning System",
            body: "A system of pop-up jets in the floor of a pool that direct settled debris to an active drain for removal.",
          },
          {
            term: "Inlet",
            body: "A PVC fitting in the side of the pool which returns water from the equipment pad.",
          },
          {
            term: "Ion Generating System",
            body: "A sanitizing system that utilizes copper and silver ions to sanitize the pool. This system does require chlorine shock.",
          },
          {
            term: "Iron",
            body: "Metal that can form in pool water. May produce brown or rust color stains.",
          },
        ]}
      />
    </>
  );
}
