import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import { BUSINESS, SITE_URL, localBusinessJsonLd } from "../lib/business";
import { getDisplayedGoogleReviews } from "../lib/google-reviews";
import { Header } from "./components/Header";
import { BookNowBanner } from "./components/BookNowBanner";
import { Footer } from "./components/Footer";
import { TaglineBanner } from "./components/TaglineBanner";
import { ChromeGate } from "./components/ChromeGate";
import { AnalyticsScripts } from "./components/AnalyticsScripts";
import { CookieConsent } from "./components/CookieConsent";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: BUSINESS.name,
    template: `%s | ${BUSINESS.name}`,
  },
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  publisher: BUSINESS.name,
  alternates: { canonical: "/" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reviewsPayload = await getDisplayedGoogleReviews();

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AnalyticsScripts />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd(reviewsPayload)),
          }}
        />
        {/* Review Stream + Dandy both validate the requesting domain server-side and
            throw CORS/"domain not registered" console errors on localhost - only
            mount them in production to keep local dev console clean. */}
        {process.env.NODE_ENV === "production" && (
          <Script
            id="review-stream-pixel"
            strategy="afterInteractive"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `!function(){var e,t=document;e=function(){if(window.EMRPixel)return console.info("EMR: Pixel already loaded");var e=t.createElement("script");e.defer=!0,e.src="https://cdn2.revw.me/js/pixel.js?t="+864e5*Math.ceil(new Date/864e5);var n=t.getElementsByTagName("script")[0];n.charset="utf-8",n.parentNode.insertBefore(e,n),e.onload=function(){EMRPixel.init("xpz.app.embedmyreviews.com",582)}},"interactive"===t.readyState||"complete"===t.readyState?e():t.addEventListener("DOMContentLoaded",e())}();`,
            }}
          />
        )}
        <ChromeGate>
          <Header />
        </ChromeGate>
        {children}
        <ChromeGate>
          <CookieConsent />
          <TaglineBanner />
          <Footer />
          <BookNowBanner />
          {process.env.NODE_ENV === "production" && (
            <Script
              id="dandy-chat-widget"
              src="https://widget.chat.getdandy.com/widget/widget.js"
              strategy="afterInteractive"
            />
          )}
        </ChromeGate>
      </body>
    </html>
  );
}
