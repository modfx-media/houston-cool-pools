"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isChromeHidden } from "./ChromeGate";
import { COOKIE_CONSENT_EVENT, getStoredConsent } from "./CookieConsent";
import {
  ADS_CALLS_FROM_WEBSITE_SEND_TO,
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  LP_PHONE_DISPLAY,
} from "@/lib/tracking/ads";

// Loads the analytics/marketing pixels. On the standalone landing pages
// (gated by ChromeGate) these always run, same as before the cookie
// banner existed. Everywhere else they only load once the visitor has
// accepted cookies.
export function AnalyticsScripts() {
  const pathname = usePathname() ?? "";
  const onLandingPage = isChromeHidden(pathname);
  const [consented, setConsented] = useState(onLandingPage);

  useEffect(() => {
    if (onLandingPage) return;
    const frame = requestAnimationFrame(() => setConsented(getStoredConsent() === "accepted"));
    const onChange = (event: Event) => {
      setConsented((event as CustomEvent<string>).detail === "accepted");
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
    };
  }, [onLandingPage]);

  if (!consented) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        id="ga4-gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
          ${
            onLandingPage
              ? `
          gtag('config', '${GOOGLE_ADS_ID}');
          gtag('config', '${ADS_CALLS_FROM_WEBSITE_SEND_TO}', {
            'phone_conversion_number': '${LP_PHONE_DISPLAY}'
          });
          `
              : ""
          }
        `}
      </Script>
      <Script
        id="cometly-pixel"
        src="https://js.comet-serve.com/script.js?uid=6678fb-6755399442000000-d2fba5-s"
        strategy="afterInteractive"
      />
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1350205399658487');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1350205399658487&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yj6l26gkwb");
        `}
      </Script>
    </>
  );
}
