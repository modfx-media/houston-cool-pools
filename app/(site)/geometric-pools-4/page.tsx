import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "geometric-pools-4";
const TITLE = "Geometric Pool Gallery - Page 4 | Houston Cool Pools";
const DESCRIPTION =
  "Explore page 4 of our geometric pool gallery — raised spas, tanning ledges and clean-lined pool designs by Houston Cool Pools in Tomball and Cypress TX.";
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
  return cmsMetadata("/geometric-pools-4", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Geometric pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Geometric Pool Gallery - Page 4", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Geometric Pools"
        heading="Geometric Pools - Page 4"
        intro="Clean lines and modern symmetry - sharp, architectural pool designs built for Houston homes."
        images={images}
        prevHref="/geometric-pools-3"
        prevLabel="Geometric Pools - Page 3"
        nextHref="/geometric-pools-5"
        nextLabel="Geometric Pools - Page 5"
      />
    </>
  );
}
