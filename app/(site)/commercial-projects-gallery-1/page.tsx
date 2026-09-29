import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "commercial-projects-gallery-1";
const TITLE = "Commercial Projects Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Commercial fountains and water features by Houston Cool Pools. Custom gunite pool and fountain builder serving Houston, Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/commercial-projects-gallery-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Commercial project");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Commercial Projects Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Commercial Projects"
        heading="Commercial Projects"
        intro="Fountains and water features built by Houston Cool Pools for HOAs, apartment communities, and commercial properties."
        images={images}
      />
    </>
  );
}
