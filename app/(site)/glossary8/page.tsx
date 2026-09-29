import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary8";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - P–R | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms P through R - pH, plaster, prime, pressure gauge, pump, pump basket, reagent and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - P–R",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary8", pageMetadata);
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
        letter="P"
        letterLabel="P–R"
        pageIndex={7}
        terms={[
          {
            term: "pH",
            body: "Potential hydrogen ion concentration. The number represents how acidic or basic the water is in a pool or spa. Probably the most important factor in pool water chemistry.",
          },
          {
            term: "Plaster",
            body: "A smooth cement coating that seals a gunite pool shell. The color of the plaster determines the apparent color of the water. White = Light Blue, Grey = Deep Blue, Green = Blue/Green, Brown = Emerald Green Water.",
          },
          {
            term: "Prime",
            body: "Process you sometimes have to use to make a pump run as intended - full of water, no air bubbles, and not dry. A dry run can burn your pump out.",
          },
          { term: "PSI", body: "Pounds per square inch. A measure of pressure." },
          {
            term: "Pole",
            body: "A multi-purpose maintenance pole with attachment holes that can extend to a long length. Can be used with a brush, vacuum head, leaf net or rake.",
          },
          {
            term: "Pressure Gauge",
            body: "Gauge on top of the filter to measure pressure. It will indicate when the filter needs to be cleaned.",
          },
          {
            term: "Pump",
            body: "Pool equipment located on your main equipment pad. Circulates water from the pool to the equipment and back to the pool.",
          },
          {
            term: "Pump Basket",
            body: "Basket at the front of the pump, usually under a clear lid so you can check for debris. Generally needs to be emptied about once a week or more.",
          },
          { term: "Reagent", body: "Chemical used with test kits to test water chemistry." },
        ]}
      />
    </>
  );
}
