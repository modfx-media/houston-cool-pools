import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "outdoor-structures-gallery-2";
const TITLE = "Outdoor Structures Gallery - Page 2 | Houston Cool Pools";
const DESCRIPTION =
  "Page 2 of our outdoor structures gallery — cabanas, pergolas and outdoor kitchens paired with custom Houston Cool Pools projects.";
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
  return cmsMetadata("/outdoor-structures-gallery-2", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Outdoor structure");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Outdoor Structures Gallery - Page 2", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Outdoor Structures"
        heading="Outdoor Structures"
        intro="Pergolas, pavilions and outdoor kitchens that complete your backyard retreat."
        images={images}
        prevHref="/outdoor-structures-gallery-1"
        prevLabel="Outdoor Structures"
      />
    </>
  );
}
