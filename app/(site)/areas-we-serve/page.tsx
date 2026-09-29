import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "../../../lib/business";
import { AreasWeServeClient } from "../components/pseo/AreasWeServeClient";

const SLUG = "areas-we-serve";
const CANONICAL = `${SITE_URL}/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: "Areas We Serve - Houston Cool Pools | Custom Pools Across Houston, TX",
  description:
    "Custom gunite pool builder serving Houston, Cypress, Spring, Tomball, The Heights, Katy, and neighboring communities across the greater Houston metro since 1996.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/areas-we-serve", pageMetadata);
}

export default function Page() {
  return <AreasWeServeClient />;
}
