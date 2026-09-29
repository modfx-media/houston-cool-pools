import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { GlossaryClient } from "../components/info/GlossaryClient";

const SLUG = "glossary9";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Glossary of Pool Terms - S | Houston Cool Pools",
  description:
    "Glossary of pool and spa industry terms starting with S - salt system, sand filter, sanitizer, shock, skimmer, spa, swim spa and more.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossary of Pool Terms - S",
  url: CANONICAL,
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/glossary9", pageMetadata);
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
        letter="S"
        letterLabel="S"
        pageIndex={8}
        terms={[
          {
            term: "Salt System",
            body: "A system that uses electricity to disinfect water with chemicals extracted from salt.",
          },
          {
            term: "Sand Filter",
            body: "Filtration system that removes contaminants by forcing the water through a vessel of sand. Requires backwashing about once a month and has no need for replacement chemicals.",
          },
          {
            term: "Sanitizer",
            body: "Chemical used to sanitize pools, kill bacteria, and oxidize organic waste material.",
          },
          {
            term: "Sequester",
            body: "In water chemistry, used to bind metals and scaling products before they adhere on surfaces.",
          },
          {
            term: "Shock",
            body: "Adding extra chlorine to burn out wastes. Assists in making combined chlorine active again, kills bacteria, and increases residual chlorine - a lack of which is often the cause of an unusual odor in the water.",
          },
          {
            term: "Sight Glass",
            body: "Clear window that allows you to view pool water as it backwashes. Backwashing is complete when the murky-colored water is clear.",
          },
          {
            term: "Skimmer",
            body: "Hole on the side of the pool at water level. Contains a basket with a suction line. Skims the top for debris before it falls.",
          },
          {
            term: "Skimmer Weir",
            body: "Door/flap over the skimmer which opens to the pool. Keeps skimmed items from floating back into the pool.",
          },
          { term: "Soda Ash", body: "Water chemical to raise pH levels. Sodium bicarbonate." },
          { term: "Sodium Dichlor", body: "Granular chlorine." },
          { term: "Sodium Hypochlorite", body: "Liquid chlorine." },
          {
            term: "Sports Pool",
            body: "A pool of various shapes and sizes that accommodates a net or goals for games such as volleyball, basketball, or water polo. Usually three to four feet deep at the ends and four-and-a-half or five feet deep in the middle.",
          },
          {
            term: "Spa",
            body: "Any vessel that holds hot water for soaking. Most popular spas are an integral part of the gunite pool, have multiple jets, and use the same circulation system as the pool. Hot tubs usually refer to wooden vessels, and Jacuzzi is a brand of spa equipment.",
          },
          {
            term: "Sweeper System",
            body: "A device that uses water pressure or suction to mechanically remove debris from the floor and walls of a pool.",
          },
          {
            term: "Swim Spa",
            body: "Swim spas are usually about eight feet by twelve feet and have a large jet capable of generating a current to swim against.",
          },
        ]}
      />
    </>
  );
}
