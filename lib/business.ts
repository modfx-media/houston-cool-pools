import type { Metadata } from "next";
import { getPageMeta } from "./site-metadata";
import { isFiveStarReview } from "./reviews";
import type { GoogleReviewsPayload } from "./google-reviews";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://houstoncoolpools.com";

/** Default social share image used when a page doesn't set its own. */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/hero/slide-1.png`,
  width: 1200,
  height: 630,
  alt: "Houston Cool Pools - Premier Custom Gunite Pool Builder in Houston, TX",
} as const;

export const BUSINESS = {
  name: "Houston Cool Pools",
  legalName: "Houston Cool Pools",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  telephone: "+1-281-645-6631",
  email: "info@houstoncoolpools.com",
  foundingDate: "1996",
  priceRange: "$$$",
  address: {
    streetAddress: "21902 Highway 249",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77070",
    addressCountry: "US",
  },
  areaServed: [
    "Houston",
    "Cypress",
    "Spring",
    "Tomball",
    "The Heights",
    "Katy",
    "Magnolia",
    "The Woodlands",
    "Hockley",
    "Garden Oaks",
    "Pinehurst",
  ],
  awards: [
    "A+ Rated with the Better Business Bureau",
    "BBB Gold Star Certificate",
    "Angie's List Super Service Award Winner",
    "Best of Houzz",
    "SBA Emerging Leaders Award",
    "GHBA Member",
    "NAHB Member",
  ],
  sameAs: [] as string[],
} as const;

/**
 * Site-wide LocalBusiness JSON-LD. Pass the live Google reviews payload
 * (from getDisplayedGoogleReviews()) so aggregateRating and review[] reflect
 * Google's real overall rating/count and only the 5-star quotes actually
 * shown on the page. Omit `review` entirely when there are none to show.
 */
export function localBusinessJsonLd(reviewsPayload?: GoogleReviewsPayload) {
  const visibleReviews = reviewsPayload
    ? reviewsPayload.reviews.filter(isFiveStarReview)
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
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
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    award: BUSINESS.awards,
    sameAs: BUSINESS.sameAs,
    ...(reviewsPayload
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(reviewsPayload.meta.rating),
            reviewCount: String(reviewsPayload.meta.reviewCount),
            bestRating: "5",
          },
        }
      : {}),
    ...(visibleReviews.length > 0
      ? {
          review: visibleReviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody: review.quote,
          })),
        }
      : {}),
  };
}

/**
 * Build a Next.js Metadata object for a given clean path using the metadata
 * scraped from the live site. Returns a minimally-valid Metadata (with default
 * OG image + Twitter card) if the path is unknown so callers can spread/extend
 * safely.
 */
export function buildPageMetadata(path: string): Metadata {
  const meta = getPageMeta(path);
  const canonical = `${SITE_URL}${path}`;
  const title = meta?.title;
  const description = meta?.description ?? undefined;
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(meta?.keywords ? { keywords: meta.keywords } : {}),
    alternates: { canonical },
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: canonical,
      siteName: BUSINESS.name,
      type: "website",
      locale: "en_US",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
