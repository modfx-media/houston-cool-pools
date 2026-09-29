import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "pool-deck-1";
const TITLE = "Pool Deck Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Browse pool deck and coping designs from Houston Cool Pools in Houston TX. Custom gunite pool builder serving Houston, Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/pool-deck-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Pool deck");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Pool Deck Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Pool Deck Designs"
        heading="Pool Deck Designs"
        intro="Travertine, flagstone and custom decking that frames every Houston Cool Pool."
        images={images}
        prevHref="/fireplace-firepits-gallery-3"
        prevLabel="Fireplaces & Fire Pits - Page 3"
        nextHref="/pool-deck-2"
        nextLabel="Pool Deck Designs - Page 2"
      />
    </>
  );
}
