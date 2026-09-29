import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary10";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - T–Z | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms T through Z - test kit, total dissolved solids, trichlor, tile, vac head and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - T–Z",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary10", pageMetadata);
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
        letter="T"
        letterLabel="T–Z"
        pageIndex={9}
        terms={[
          {
            term: "Test Kit",
            body: "Kit to test pool water. Contains reagents, test strips or DPD tablets.",
          },
          {
            term: "Total Dissolved Solids",
            body: "Measured in ppm of all minerals and chemicals in pool water for saturation levels.",
          },
          { term: "Trichlor", body: "Stabilized chlorine tablets. Used to sanitize pool water." },
          {
            term: "Tile",
            body: "Builders use this term to refer to whatever material lines the inside vertical rim of the pool and spa at the waterline. Typically the \u201ctile\u201d extends from just under the coping edge downward six inches. It can be ceramic tile, porcelain tile, flagstone, or marble. Since any floating contaminants tend to collect here, a non-porous tile surface works best.",
          },
          {
            term: "Vac Head",
            body: "Attached to a pool pole to manually vacuum the pool. Usually hooked up to the skimmer or a dedicated suction line.",
          },
        ]}
      />
    </>
  );
}
