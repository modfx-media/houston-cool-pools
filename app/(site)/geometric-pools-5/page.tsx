import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "geometric-pools-5";
const TITLE = "Geometric Pool Gallery - Page 5 | Houston Cool Pools";
const DESCRIPTION =
  "Geometric pool inspiration, page 5 — modern rectangle pools with negative-edge spillways and glass tile detail from Houston Cool Pools in Spring TX.";
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
  return cmsMetadata("/geometric-pools-5", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Geometric pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Geometric Pool Gallery - Page 5", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Geometric Pools"
        heading="Geometric Pools - Page 5"
        intro="Clean lines and modern symmetry - sharp, architectural pool designs built for Houston homes."
        images={images}
        prevHref="/geometric-pools-4"
        prevLabel="Geometric Pools - Page 4"
        nextHref="/geometric-pools-6"
        nextLabel="Geometric Pools - Page 6"
      />
    </>
  );
}
