import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary4";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - D–E | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms starting with D and E - deck, DE filter, diverter valve, dry acid and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - D–E",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary4", pageMetadata);
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
        letter="D"
        letterLabel="D–E"
        pageIndex={3}
        terms={[
          {
            term: "Deck",
            body: "The patio that is attached to the pool itself. Typical materials and finishes include brushed concrete, spraycrete, cool deck, sundek, flagstone, and pea gravel. The deck often accounts for 20 to 30% of a pool budget.",
          },
          {
            term: "DE Filter",
            body: "A filtration system that uses a layer of fine powder (diatomaceous earth) to remove contaminants from the water. Requires a ten-minute backwashing process about once a month, accomplished by adjusting the valves. The DE powder is relatively inexpensive but must be replaced after each backwashing.",
          },
          {
            term: "Diverter Valve",
            body: "A valve in plumbing used to change the direction of water flow.",
          },
          {
            term: "Dry Acid",
            body: "Dry form of acid that can be broadcast throughout the pool to lower pH and/or Total Alkalinity.",
          },
        ]}
      />
    </>
  );
}
