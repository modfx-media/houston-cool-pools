import type { Metadata } from "next";
import Script from "next/script";
import { TopBar } from "./_components/TopBar";
import { QuoteModal } from "./_components/QuoteModal";
import { MobileStickyCTA } from "./_components/MobileStickyCTA";

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
    <div className="lp-root min-h-screen bg-[#0a1628] pb-20 text-white md:pb-0">
      {/* Google tag (gtag.js) — Google Ads conversion tracking for this
          landing page + its thank-you page (this layout wraps both). */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-990264356"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-990264356');
          gtag('config', 'AW-990264356/nMiBCPbO09ccEKT4mNgD', {
            'phone_conversion_number': '(281) 938-4830'
          });
        `}
      </Script>
      {/* Event snippet for MFX Click to call conversion page. Call
          window.gtag_report_conversion(url) on click-to-call links/buttons. */}
      <Script id="gtag-report-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-990264356/y9PqCPnO09ccEKT4mNgD',
                'value': 5.0,
                'currency': 'USD',
                'event_callback': callback
            });
            return false;
          }
          window.gtag_report_conversion = gtag_report_conversion;
        `}
      </Script>
      <TopBar />
      {children}
      <QuoteModal />
      <MobileStickyCTA />
    </div>
  );
}
