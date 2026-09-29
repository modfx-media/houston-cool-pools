import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary2";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - B | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms starting with B - backwash, balance, beam, blower, bromine and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - B",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary2", pageMetadata);
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
        letter="B"
        letterLabel="B"
        pageIndex={1}
        terms={[
          { term: "Backwash", body: "Reverses the flow of water through your pool filter to assist in cleaning it out." },
          { term: "Backwash Valve", body: "The valve attached to a pool filter to put it in backwash or cleaning mode." },
          {
            term: "Balance",
            body: "Proper chemical level to avoid common problems in pools that are not cared for. Problems can include: corrosive, scaling, swimmer irritation, surface damages and staining.",
          },
          {
            term: "Beam",
            body: "The upper section of the vertical wall of a gunite pool or spa. A \u201craised beam\u201d is one that extends above ground level.",
          },
          {
            term: "Blower",
            body: "An electrical unit that generates air pressure to provide the spa jets with bubbles.",
          },
          {
            term: "Bromines",
            body: "Bromine tied with ammonia will prevent it from killing bacteria in a spa.",
          },
          {
            term: "Bromine",
            body: "Chemical product for sanitizing water. Usually used in spas, which operate at a higher temperature than a pool.",
          },
        ]}
      />
    </>
  );
}
