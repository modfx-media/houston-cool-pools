import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "gallery-free-form-pools-2";
const TITLE = "Free Form Pool Gallery - Page 2 | Houston Cool Pools";
const DESCRIPTION =
  "Page 2 of our free-form pool gallery — organic, lagoon-inspired custom gunite pools with rock waterfalls and beach entries from Houston Cool Pools.";
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
  return cmsMetadata("/gallery-free-form-pools-2", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Free form pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Free Form Pool Gallery - Page 2", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Free Form Pools"
        heading="Free Form Pools - Page 2"
        intro="Organic, lagoon-style pools with curved lines that flow naturally into your Houston backyard."
        images={images}
        prevHref="/gallery-free-form-pools-1"
        prevLabel="Free Form Pools"
        nextHref="/gallery-free-form-pools-3"
        nextLabel="Free Form Pools - Page 3"
      />
    </>
  );
}
