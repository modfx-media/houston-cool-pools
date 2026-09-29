import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "geometric-pools-2";
const TITLE = "Geometric Pool Gallery - Page 2 | Houston Cool Pools";
const DESCRIPTION =
  "See page 2 of our geometric pool gallery — sharp lines, water-in-transit spillways and modern architectural pool designs from Houston Cool Pools in Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/geometric-pools-2", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Geometric pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Geometric Pool Gallery - Page 2", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Geometric Pools"
        heading="Geometric Pools - Page 2"
        intro="Clean lines and modern symmetry - sharp, architectural pool designs built for Houston homes."
        images={images}
        prevHref="/geometric-pools-1"
        prevLabel="Geometric Pools"
        nextHref="/geometric-pools-3"
        nextLabel="Geometric Pools - Page 3"
      />
    </>
  );
}
