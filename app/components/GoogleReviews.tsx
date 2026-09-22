import type { ReactNode } from "react";
import { getDisplayedGoogleReviews } from "../../lib/google-reviews";

/**
 * Async Server Component that fetches the live (cached, once/day) Google
 * reviews payload and hands it to a render-prop child. Renders nothing when
 * there are zero qualifying 5-star reviews (no key, failed request, and no
 * verified fallback quotes on file) - never invents cards.
 */
export async function GoogleReviews({
  children,
}: {
  children: (
    payload: Awaited<ReturnType<typeof getDisplayedGoogleReviews>>,
  ) => ReactNode;
}) {
  const payload = await getDisplayedGoogleReviews();
  if (payload.reviews.length === 0) return null;
  return children(payload);
}
