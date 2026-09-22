import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/business";
import { getDisplayedGoogleReviews } from "../../lib/google-reviews";
import { isFiveStarReview } from "../../lib/reviews";
import { TestimonialsClient } from "../components/info/TestimonialsClient";

const SLUG = "customer-reviews-testimonials";
const CANONICAL = `https://houstoncoolpools.com/${SLUG}`;

const base = buildPageMetadata(`/${SLUG}`);
export const metadata: Metadata = {
  ...base,
  title: "Customer Reviews & Testimonials - Houston Cool Pools",
  description:
    "Read real 5-star reviews from Houston Cool Pools customers across Cypress, Spring, Tomball, Katy and the greater Houston area.",
  alternates: { canonical: CANONICAL },
  openGraph: { ...base.openGraph, url: CANONICAL },
};

export default async function Page() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Houston Cool Pools",
    url: CANONICAL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(meta.rating),
      reviewCount: String(meta.reviewCount),
      bestRating: "5",
    },
    ...(visible.length > 0
      ? {
          review: visible.map((review) => ({
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

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TestimonialsClient reviews={reviews} meta={meta} />
    </>
  );
}
