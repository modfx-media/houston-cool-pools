import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "../../../lib/business";
import { CustomHomeBuilderPage } from "../components/info/CustomHomeBuilderPage";
import { getCustomHomeBuilder } from "../../../lib/custom-home-builders";

const SLUG = "ridgewater-homes";
const builder = getCustomHomeBuilder(SLUG);
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
const pageMetadata: Metadata = {
  ...base,
  title: `${builder?.shortName ?? SLUG} - Houston Cool Pools Builder Partner`,
  description: builder?.cardBlurb,
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/ridgewater-homes", pageMetadata);
}

export default function Page() {
  if (!builder) notFound();
  return <CustomHomeBuilderPage builder={builder} />;
}
