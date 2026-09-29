import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "fireplace-firepits-gallery-1";
const TITLE = "Fire Pit & Fireplace Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Browse fire pit and fireplace designs for pools from Houston Cool Pools. Custom gunite pool builder serving Houston, Tomball, Cypress and Spring TX.";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/fireplace-firepits-gallery-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Fireplace & fire pit");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Fire Pit & Fireplace Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Fireplaces & Fire Pits"
        heading="Fireplaces & Fire Pits"
        intro="Custom fireplaces and fire pits that extend your poolside evenings year-round."
        images={images}
        prevHref="/geometric-pools-6"
        prevLabel="Geometric Pools - Page 6"
        nextHref="/fireplace-firepits-gallery-2"
        nextLabel="Fireplaces & Fire Pits - Page 2"
      />
    </>
  );
}
