import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { GalleryCategoryPage } from "../components/gallery/GalleryCategoryPage";
import { getGalleryImages, galleryJsonLd } from "../../../lib/gallery-pages";

const SLUG = "gallery-free-form-pools-4";
const TITLE = "Free Form Pool Gallery - Page 4 | Houston Cool Pools";
const DESCRIPTION =
  "Page 4 of our free-form pool photo gallery — natural stone coping, tropical landscaping and grotto features from Houston Cool Pools in Houston TX.";
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
  return cmsMetadata("/gallery-free-form-pools-4", pageMetadata);
}

export default function Page() {
  const images = getGalleryImages(SLUG, "Free form pool");
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd("Free Form Pool Gallery - Page 4", SLUG)),
        }}
      />
      <GalleryCategoryPage
        category="Free Form Pools"
        heading="Free Form Pools - Page 4"
        intro="Organic, lagoon-style pools with curved lines that flow naturally into your Houston backyard."
        images={images}
        prevHref="/gallery-free-form-pools-3"
        prevLabel="Free Form Pools - Page 3"
        nextHref="/gallery-free-form-pools-5"
        nextLabel="Free Form Pools - Page 5"
      />
    </>
  );
}
