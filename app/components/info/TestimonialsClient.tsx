"use client";

import { InfoHero } from "./InfoHero";
import { Testimonials } from "../home/Testimonials";
import type { GoogleReview, GoogleReviewsMeta } from "../../../lib/reviews";

export function TestimonialsClient({
  reviews,
  meta,
}: {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
}) {
  return (
    <>
      <InfoHero
        eyebrow="Customer Stories"
        title="Reviews & Testimonials"
        subtitle="Every 5-star review below comes from a real Houston Cool Pools customer. We build our reputation one pool at a time."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Customer Reviews" },
        ]}
        backgroundImage="/images/gallery/hd/family-1.jpg"
        backgroundAlt="Houston family enjoying their Houston Cool Pools backyard"
      />

      <Testimonials
        items={reviews.map((review) => ({
          name: review.name,
          quote: review.quote,
          when: review.relativeTime ?? "Posted on Google",
        }))}
        rating={meta.rating}
        reviewCount={meta.reviewCount}
        reviewsUrl={meta.reviewsUrl}
      />
    </>
  );
}
