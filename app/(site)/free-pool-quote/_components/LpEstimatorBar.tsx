"use client";

import { usePathname } from "next/navigation";
import { BookNowBanner } from "../../components/BookNowBanner";

/** Price estimator bar (same as the main site), shown on the landing page but not the thank-you page. */
export function LpEstimatorBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/free-pool-quote/thank-you")) return null;
  return <BookNowBanner alwaysOn />;
}
