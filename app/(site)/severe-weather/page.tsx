import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { SevereWeatherClient } from "../components/info/SevereWeatherClient";

const SLUG = "severe-weather";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Severe Weather Pool Care - Hurricane & Freeze Guide | Houston Cool Pools",
  description:
    "Houston pool owner\u2019s guide to protecting your pool and equipment during hurricanes, tropical storms, and hard freezes.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Severe Weather Pool Care",
  url: CANONICAL,
  publisher: { "@type": "Organization", name: "Houston Cool Pools" },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/severe-weather", pageMetadata);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SevereWeatherClient />
    </>
  );
}
