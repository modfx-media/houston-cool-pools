import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "geometric-pools-1";
const TITLE = "Geometric Pool Gallery | Houston Cool Pools";
const DESCRIPTION =
  "Browse geometric pool designs and photos from Houston Cool Pools. Custom gunite pool builder serving Houston, Tomball, Cypress and Spring TX.";
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
  return cmsMetadata("/geometric-pools-1", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Geometric pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Geometric Pool Gallery", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Geometric Pools"
        heading="Geometric Pools"
        intro="Clean lines and modern symmetry - sharp, architectural pool designs built for Houston homes."
        images={images}
        prevHref="/gallery-free-form-pools-5"
        prevLabel="Free Form Pools - Page 5"
        nextHref="/geometric-pools-2"
        nextLabel="Geometric Pools - Page 2"
      />
    </>
  );
}
