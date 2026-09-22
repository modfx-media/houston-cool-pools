/**
 * Google review types + the offline fallback used when the Places API
 * key/place id is missing, the request fails, or Google returns zero
 * 5-star reviews with text.
 *
 * Fallback quotes are real 5-star Google reviews for Houston Cool Pools
 * (business "Houston Cool Pools", 21902 Highway 249, Houston, TX 77070 -
 * Google Place ID ChIJq-TAjfLSQIYRwBaVa6OpCyQ), copied verbatim from
 * lib/testimonials.ts. Never write a quote that wasn't copied from Google.
 */
import { TESTIMONIALS } from "./testimonials";

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return (
    review.rating === 5 &&
    review.quote.trim().length > 0 &&
    review.name.trim().length > 0
  );
}

export const googleReviews: GoogleReview[] = TESTIMONIALS.map((t) => ({
  quote: t.quote,
  name: t.name,
  rating: t.rating,
}));

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);

export const googleReviewsMeta: GoogleReviewsMeta = {
  rating: 5, // FALLBACK_RATING - Google's published overall rating for this business
  reviewCount: 192, // FALLBACK_REVIEW_COUNT - Google's total review count, all stars
  fiveStarCount: fiveStarReviews.length,
  placeId: "ChIJq-TAjfLSQIYRwBaVa6OpCyQ",
  reviewsUrl: "https://maps.google.com/?cid=2597356129458919104",
};
