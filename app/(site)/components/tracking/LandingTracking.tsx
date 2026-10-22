"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ADS_CALLS_FROM_WEBSITE_SEND_TO,
  ADS_LEAD_SEND_TO,
  ADS_PHONE_CLICK_SEND_TO,
  GOOGLE_ADS_ID,
  isGhlLeadSuccess,
  isLpTrackingPhone,
  LEAD_CONVERSION_STORAGE_KEY,
  LP_PHONE_DISPLAY,
  sendGa4Event,
} from "@/lib/tracking/ads";

type Gtag = (...args: unknown[]) => void;

function win(): Window & { dataLayer?: unknown[]; gtag?: Gtag } {
  return window as Window & { dataLayer?: unknown[]; gtag?: Gtag };
}

function ensureGtag(): Gtag {
  const w = win();
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag() {
      // Google's snippet queues the `arguments` object, not a rest array.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  return w.gtag;
}

let adsConfigured = false;

/** Configures the Ads tag once. GA4 itself is loaded by AnalyticsScripts. */
export function ensureAdsConfig() {
  if (adsConfigured) return;
  const w = win();
  const queued = (w.dataLayer || []).some((item) => {
    if (!item || typeof item === "function") return false;
    try {
      const args = Array.from(item as ArrayLike<unknown>);
      return args[0] === "config" && args[1] === GOOGLE_ADS_ID;
    } catch {
      return false;
    }
  });
  adsConfigured = true;
  if (queued) return;
  const gtag = ensureGtag();
  gtag("config", GOOGLE_ADS_ID);
  gtag("config", ADS_CALLS_FROM_WEBSITE_SEND_TO, {
    phone_conversion_number: LP_PHONE_DISPLAY,
  });
}

/**
 * One lead conversion per browser tab. The thank-you page and the form
 * success callback share this guard so a redirect cannot double-count.
 * Returns true only the first time.
 */
export function trackLeadConversion(): boolean {
  try {
    if (sessionStorage.getItem(LEAD_CONVERSION_STORAGE_KEY) === "1") return false;
    sessionStorage.setItem(LEAD_CONVERSION_STORAGE_KEY, "1");
  } catch {
    /* private mode: still fire, but a second call in this document can repeat */
  }
  ensureAdsConfig();
  const gtag = ensureGtag();
  gtag("event", "conversion", {
    send_to: ADS_LEAD_SEND_TO,
    value: 1.0,
    currency: "USD",
    transport_type: "beacon",
  });
  // GA4 is sent on its own collect request. Routing it through gtag on a
  // page that also has the Ads tag drops the hit, and an unscoped event is
  // recorded as an unlabeled Ads conversion.
  sendGa4Event("generate_lead", { currency: "USD", value: 1, method: "form" });
  return true;
}

let lastPhoneClickAt = 0;

export function trackPhoneClick(href: string) {
  const now = Date.now();
  if (now - lastPhoneClickAt < 800) return;
  lastPhoneClickAt = now;
  ensureAdsConfig();
  const gtag = ensureGtag();
  gtag("event", "conversion", {
    send_to: ADS_PHONE_CLICK_SEND_TO,
    value: 5.0,
    currency: "USD",
    transport_type: "beacon",
  });
  sendGa4Event("phone_click", { method: "click_to_call", link_url: href });
}

function thankYouPath(pathname: string): string | null {
  if (pathname.startsWith("/free-pool-quote/thank-you")) return "/free-pool-quote/thank-you";
  if (pathname.startsWith("/pool-maintenance/thank-you")) return "/pool-maintenance/thank-you";
  return null;
}

function leadDestination(pathname: string): string | null {
  if (pathname.startsWith("/free-pool-quote")) return "/free-pool-quote/thank-you";
  if (pathname.startsWith("/pool-maintenance")) return "/pool-maintenance/thank-you";
  return null;
}

/**
 * Landing-page conversion wiring. Ads clicks land on these routes with no
 * GTM and no HubSpot form, so the GoHighLevel success message and the
 * thank-you page are the only confirmed-submit signals.
 */
export function LandingTracking() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const onLanding =
    pathname.startsWith("/free-pool-quote") || pathname.startsWith("/pool-maintenance");
  const onThankYou = thankYouPath(pathname);

  useEffect(() => {
    if (!onLanding) return;
    ensureAdsConfig();
  }, [onLanding]);

  useEffect(() => {
    if (!onThankYou) return;
    trackLeadConversion();
  }, [onThankYou]);

  useEffect(() => {
    if (!onLanding) return;

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (!isLpTrackingPhone(href)) return;
      trackPhoneClick(href);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [onLanding]);

  useEffect(() => {
    if (!onLanding || onThankYou) return;
    const destination = leadDestination(pathname);
    if (!destination) return;
    const nextPath: string = destination;

    let pending: number | undefined;

    function onMessage(event: MessageEvent) {
      if (!isGhlLeadSuccess(event.origin || "", event.data)) return;
      // The form redirects window.top itself after this message. Wait so we
      // don't also fire here and then again on the thank-you page. If the
      // redirect never comes, fire and route from the parent.
      window.clearTimeout(pending);
      pending = window.setTimeout(() => {
        if (window.location.pathname.includes("/thank-you")) return;
        if (!trackLeadConversion()) return;
        router.push(nextPath);
      }, 700);
    }

    window.addEventListener("message", onMessage);
    return () => {
      window.clearTimeout(pending);
      window.removeEventListener("message", onMessage);
    };
  }, [onLanding, onThankYou, pathname, router]);

  return null;
}
