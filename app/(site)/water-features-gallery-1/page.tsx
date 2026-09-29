import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "water-features-gallery-1";
const TITLE = "Water Features Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Custom pool water features by Houston Cool Pools - spillways, sheer-descent walls, and bubblers. Custom gunite pool builder serving Houston, Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/water-features-gallery-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Water feature");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Water Features Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Water Features"
        heading="Water Features"
        intro="Sheer-descent walls, spillways and bubblers - the custom water features that turn a pool into a statement piece."
        images={images}
      />
    </>
  );
}
