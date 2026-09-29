import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cmsMetadata } from "@/lib/cms/generateMeta";
import { getComboBySlug, getLiveCombos } from "../../../data/pseo/slugs";
import { getKeywordsFor } from "../../../data/pseo/keywords";
import { BUSINESS, SITE_URL } from "../../../lib/business";
import { buildPseoFaqs } from "../../../data/pseo/article";
import { PseoPageClient } from "../components/pseo/PseoPageClient";

// SSG only - unknown slugs 404 instantly rather than being generated on demand.
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getLiveCombos().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo || !combo.live) return {};

  const { service, location, slug: comboSlug } = combo;
  const canonical = `${SITE_URL}/${comboSlug}`;
  const title = `${service.shortName} in ${location.cityName}, TX`;
  const description = service.metaTemplate.replace(/\{city\}/g, location.cityName);

  return cmsMetadata(`/${comboSlug}`, {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${BUSINESS.name}`,
      description,
      url: canonical,
      siteName: BUSINESS.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/images/hero/slide-1.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${location.cityName}, TX`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BUSINESS.name}`,
      description,
      images: [`${SITE_URL}/images/hero/slide-1.png`],
    },
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo || !combo.live) notFound();

  const { service, location, slug: comboSlug } = combo;
  const keywords = getKeywordsFor(service.slug, location.slug);
  const url = `${SITE_URL}/${comboSlug}`;

  // Combined JSON-LD graph: LocalBusiness + Service + BreadcrumbList + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness scoped to this page's area served
      {
        "@type": "LocalBusiness",
        "@id": `${url}#business`,
        name: BUSINESS.name,
        url: BUSINESS.url,
        logo: BUSINESS.logo,
        image: BUSINESS.logo,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        foundingDate: BUSINESS.foundingDate,
        priceRange: BUSINESS.priceRange,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.address.streetAddress,
          addressLocality: BUSINESS.address.addressLocality,
          addressRegion: BUSINESS.address.addressRegion,
          postalCode: BUSINESS.address.postalCode,
          addressCountry: BUSINESS.address.addressCountry,
        },
        areaServed: {
          "@type": "City",
          name: location.cityName,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: location.county,
          },
        },
      },
      // Service - specific to this combo
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${service.name} in ${location.cityName}, TX`,
        serviceType: service.shortName,
        description: service.metaTemplate.replace(/\{city\}/g, location.cityName),
        provider: { "@id": `${url}#business` },
        areaServed: {
          "@type": "City",
          name: location.cityName,
        },
        url,
      },
      // Breadcrumb
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Areas We Serve",
            item: `${SITE_URL}/areas-we-serve`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${service.shortName} in ${location.cityName}, TX`,
            item: url,
          },
        ],
      },
      // FAQPage - mirrors the FAQs rendered in the client component
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: buildPseoFaqs(service, location, keywords).map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PseoPageClient
        service={service}
        location={location}
        keywords={keywords}
        slug={slug}
      />
    </>
  );
}

