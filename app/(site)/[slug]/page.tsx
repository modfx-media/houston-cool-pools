import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cmsMetadata } from "@/lib/cms/generateMeta";
import { getComboBySlug, getLiveCombos } from "../../../data/pseo/slugs";
import { getKeywordsFor } from "../../../data/pseo/keywords";
import { BUSINESS, SITE_URL } from "../../../lib/business";
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
  const title = `${service.shortName} in ${location.cityName}, TX | Houston Cool Pools`;
  const description = service.metaTemplate.replace(/\{city\}/g, location.cityName);

  return cmsMetadata(`/${comboSlug}`, {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
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
      title,
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
        mainEntity: buildFaqSchema(service, location, keywords),
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

// Mirror of the FAQ list the client renders - kept here so the JSON-LD stays
// in sync with what's actually shown on-page.
function buildFaqSchema(
  service: { slug: string; shortName: string },
  location: { cityName: string; county: string },
  keywords: { query: string }[],
) {
  const costQuery = keywords.find((q) => /cost|price|financ|afford/i.test(q.query));
  const list: { q: string; a: string }[] = [
    {
      q: costQuery
        ? `${cap(costQuery.query)}${costQuery.query.endsWith("?") ? "" : "?"}`
        : `How much does a custom pool cost in ${location.cityName}, TX?`,
      a: `Custom gunite pools cover a wide price range depending on size, depth, features, decking, and finishes. Rather than quote a number here, we publish our tiered pricing pages so you can see what different budgets typically buy - from starter builds to larger resort-style pools. Financing is available for qualified homeowners.`,
    },
    {
      q: `How long does a ${service.shortName.toLowerCase()} project take in ${location.cityName}?`,
      a: `Custom gunite pool projects generally run 8-16 weeks from ground-breaking to first swim, depending on scope, weather, and inspection scheduling. Remodels vary more - a straight interior resurface is a much shorter project than a structural addition.`,
    },
  ];

  if (service.slug === "pool-remodeling") {
    list.push({
      q: `What's included in a pool remodel?`,
      a: `A remodel usually starts with interior resurfacing and can layer in tile, coping, decking, equipment upgrades, and structural additions like a spa spillover or sun shelf.`,
    });
  } else if (service.slug === "pool-service-maintenance") {
    list.push({
      q: `Do you offer weekly pool service in ${location.cityName}?`,
      a: `We support homeowners with equipment quote, chemistry guidance, and maintenance planning for Houston's climate.`,
    });
  } else if (service.slug === "pool-design-construction") {
    list.push({
      q: `Do you handle permits and inspections?`,
      a: `Yes. We handle permitting and coordinate the required inspections at each construction milestone for your ${location.cityName} address.`,
    });
  } else {
    list.push({
      q: `Do you build fully custom pool designs or work from a catalog?`,
      a: `Every ${location.cityName} project is designed for the specific yard. We don't have a shape catalog.`,
    });
  }

  list.push({
    q: `Do you actually service ${location.cityName}, TX?`,
    a: `Yes - Houston Cool Pools serves ${location.cityName} and the surrounding ${location.county} area from our office on Highway 249 in northwest Houston. Reach us at (281) 645-6631 or through our free-quote form.`,
  });

  if (!costQuery) {
    list.push({
      q: `Is pool financing available?`,
      a: `Financing is available for qualified homeowners. We can walk you through the options and typical monthly cost ranges when we scope your project.`,
    });
  }

  return list.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  }));
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
