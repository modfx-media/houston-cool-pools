import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "geometric-pools-6";
const TITLE = "Geometric Pool Gallery - Page 6 | Houston Cool Pools";
const DESCRIPTION =
  "Final page of our geometric pool gallery — showcase of luxury architectural pools built across Houston, The Heights, Katy and Tomball by Houston Cool Pools.";
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
  return cmsMetadata("/geometric-pools-6", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Geometric pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Geometric Pool Gallery - Page 6", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Geometric Pools"
        heading="Geometric Pools - Page 6"
        intro="Clean lines and modern symmetry - sharp, architectural pool designs built for Houston homes."
        images={images}
        prevHref="/geometric-pools-5"
        prevLabel="Geometric Pools - Page 5"
        nextHref="/fireplace-firepits-gallery-1"
        nextLabel="Fireplaces & Fire Pits"
      />
    </>
  );
}
