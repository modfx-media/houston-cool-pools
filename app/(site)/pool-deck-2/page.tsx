import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "pool-deck-2";
const TITLE = "Pool Deck Gallery - Page 2 | Houston Cool Pools";
const DESCRIPTION =
  "Pool deck and coping gallery, page 2 — travertine, flagstone and stamped-concrete decks around custom gunite pools by Houston Cool Pools.";
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
  return cmsMetadata("/pool-deck-2", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Pool deck");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Pool Deck Gallery - Page 2", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Pool Deck Designs"
        heading="Pool Deck Designs - Page 2"
        intro="Travertine, flagstone and custom decking that frames every Houston Cool Pool."
        images={images}
        prevHref="/pool-deck-1"
        prevLabel="Pool Deck Designs"
        nextHref="/pool-deck-3"
        nextLabel="Pool Deck Designs - Page 3"
      />
    </>
  );
}
