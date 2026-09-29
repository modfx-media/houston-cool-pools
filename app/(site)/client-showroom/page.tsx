import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { ClientShowroomHero } from "../components/client-showroom/ClientShowroomHero";
import { ClientShowroomGallery } from "../components/client-showroom/ClientShowroomGallery";
import { PoolCtaBanner } from "../components/PoolCtaBanner";

const pageMetadata: Metadata = buildPageMetadata("/client-showroom");

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://houstoncoolpools.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pool Information",
      item: "https://houstoncoolpools.com/pool-information",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Client Showroom",
      item: "https://houstoncoolpools.com/client-showroom",
    },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/client-showroom", pageMetadata);
}

export default function ClientShowroomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ClientShowroomHero />
      <ClientShowroomGallery />
      <PoolCtaBanner heading="Want your backyard in this showroom next?" />
    </>
  );
}
