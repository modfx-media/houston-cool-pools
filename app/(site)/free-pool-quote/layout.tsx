import type { Metadata } from "next";
import { TopBar } from "./_components/TopBar";
import { QuoteModal } from "./_components/QuoteModal";
import { LpEstimatorBar } from "./_components/LpEstimatorBar";

export const metadata: Metadata = {
  title: "Get a Free Pool Quote | Houston Cool Pools",
  description:
    "Claim your free custom pool quote from Houston's most trusted gunite pool builder since 1996. 1,600+ pools built. 100% on-budget guarantee.",
  alternates: { canonical: "/free-pool-quote" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Get a Free Pool Quote | Houston Cool Pools",
    description:
      "Free in-home quote from Houston's most trusted custom gunite pool builder. 1,600+ pools built since 1996. 100% on-budget guarantee.",
    url: "https://houstoncoolpools.com/free-pool-quote",
    siteName: "Houston Cool Pools",
    type: "website",
    images: [
      {
        url: "/images/gallery/hd/silverman-1.jpg",
        width: 1200,
        height: 630,
        alt: "Houston Cool Pools | Free Pool Quote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Free Pool Quote | Houston Cool Pools",
    description:
      "Free in-home quote. 1,600+ pools built since 1996. 100% on-budget guarantee.",
    images: ["/images/gallery/hd/silverman-1.jpg"],
  },
};

export default function FreePoolQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lp-root min-h-screen bg-[#0a1628] pb-28 text-white sm:pb-20">
      {/* Ads + GA4 conversions are fired by LandingTracking (one gtag.js,
          shared with the rest of the site). A second gtag.js here was
          downloading the Ads library twice and the click helper was never
          attached to a phone link. */}
      <TopBar />
      {children}
      <QuoteModal />
      <LpEstimatorBar />
    </div>
  );
}
