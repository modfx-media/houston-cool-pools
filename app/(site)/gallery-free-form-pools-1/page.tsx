import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "gallery-free-form-pools-1";
const TITLE = "Free Form Pool Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Browse free form pool designs and photos from Houston Cool Pools. Custom gunite pool builder serving Houston, Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/gallery-free-form-pools-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Free form pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Free Form Pool Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Free Form Pools"
        heading="Free Form Pools"
        intro="Organic, lagoon-style pools with curved lines that flow naturally into your Houston backyard."
        images={images}
        nextHref="/gallery-free-form-pools-2"
        nextLabel="Free Form Pools - Page 2"
      />
    </>
  );
}
