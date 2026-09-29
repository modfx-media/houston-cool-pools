import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "pool-deck-4";
const TITLE = "Pool Deck Gallery - Page 4 | Houston Cool Pools";
const DESCRIPTION =
  "The final page of our pool deck gallery — see how Houston Cool Pools ties together decking, water features and outdoor structures for a finished backyard.";
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
  return cmsMetadata("/pool-deck-4", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Pool deck");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Pool Deck Gallery - Page 4", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Pool Deck Designs"
        heading="Pool Deck Designs - Page 4"
        intro="Travertine, flagstone and custom decking that frames every Houston Cool Pool."
        images={images}
        prevHref="/pool-deck-3"
        prevLabel="Pool Deck Designs - Page 3"
        nextHref="/outdoor-structures-gallery-1"
        nextLabel="Outdoor Structures"
      />
    </>
  );
}
