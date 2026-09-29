import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "fireplace-firepits-gallery-2";
const TITLE = "Fire Pit & Fireplace Gallery - Page 2 | Houston Cool Pools";
const DESCRIPTION =
  "Page 2 of our poolside fireplace and fire pit gallery — gas fire bowls, custom stone hearths and outdoor lounge spaces by Houston Cool Pools.";
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
  return cmsMetadata("/fireplace-firepits-gallery-2", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Fireplace & fire pit");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Fire Pit & Fireplace Gallery - Page 2", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Fireplaces & Fire Pits"
        heading="Fireplaces & Fire Pits - Page 2"
        intro="Custom fireplaces and fire pits that extend your poolside evenings year-round."
        images={images}
        prevHref="/fireplace-firepits-gallery-1"
        prevLabel="Fireplaces & Fire Pits"
        nextHref="/fireplace-firepits-gallery-3"
        nextLabel="Fireplaces & Fire Pits - Page 3"
      />
    </>
  );
}
