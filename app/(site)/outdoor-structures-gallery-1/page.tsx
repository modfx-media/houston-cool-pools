import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "outdoor-structures-gallery-1";
const TITLE = "Outdoor Structures Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Pergolas, outdoor kitchens and structures from Houston Cool Pools. Custom gunite pool builder serving Houston, Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/outdoor-structures-gallery-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Outdoor structure");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Outdoor Structures Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Outdoor Structures"
        heading="Outdoor Structures"
        intro="Pergolas, pavilions and outdoor kitchens that complete your backyard retreat."
        images={images}
        prevHref="/pool-deck-4"
        prevLabel="Pool Deck Designs - Page 4"
        nextHref="/outdoor-structures-gallery-2"
        nextLabel="Outdoor Structures - Page 2"
      />
    </>
  );
}
