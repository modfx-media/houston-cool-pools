"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ADS_CALLS_FROM_WEBSITE_SEND_TO,
  ADS_LEAD_SEND_TO,
  ADS_PHONE_CLICK_SEND_TO,
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  isGhlLeadSuccess,
  LEAD_PENDING_STORAGE_KEY,
  LEAD_PENDING_TTL_MS,
  LP_PHONE_DISPLAY,
  pageLocationForConfig,
  pageLocationWithoutQuery,
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
  const page_location = pageLocationForConfig();
  gtag("config", GOOGLE_ADS_ID, { page_location });
  gtag("config", ADS_CALLS_FROM_WEBSITE_SEND_TO, {
    phone_conversion_number: LP_PHONE_DISPLAY,
    page_location,
  });
}

function trackGa4Event(name: string, params: Record<string, string | number>) {
  ensureGtag()("event", name, {
    send_to: GA4_MEASUREMENT_ID,
    page_location: pageLocationWithoutQuery(),
    ...params,
  });
}

function markLeadPending() {
  try {
    sessionStorage.setItem(LEAD_PENDING_STORAGE_KEY, String(Date.now()));
  } catch {
    /* private mode: the thank-you page will not see a flag */
  }
}

/** True once, when a success message in this tab set a fresh timestamp. */
function consumeLeadPending(): boolean {
  try {
    const raw = sessionStorage.getItem(LEAD_PENDING_STORAGE_KEY);
    sessionStorage.removeItem(LEAD_PENDING_STORAGE_KEY);
    const at = Number(raw);
    if (!raw || !Number.isFinite(at)) return false;
    const age = Date.now() - at;
    return age >= 0 && age <= LEAD_PENDING_TTL_MS;
  } catch {
    return false;
  }
}

/**
 * One Ads lead conversion and one GA4 generate_lead. Call only after
 * consumeLeadPending() so a thank-you refresh or a direct visit does not count,
 * and a later submission can count on its own.
 */
export function trackLeadConversion() {
  ensureAdsConfig();
  const gtag = ensureGtag();
  gtag("event", "conversion", {
    send_to: ADS_LEAD_SEND_TO,
    value: 1.0,
    currency: "USD",
    transport_type: "beacon",
  });
  trackGa4Event("generate_lead", { currency: "USD", value: 1, method: "form" });
}

const lastPhoneClickAt = new WeakMap<Element, number>();
const lastPhoneClickByNumber = new Map<string, number>();

function phoneDigits(href: string): string {
  return href.replace(/\D/g, "") || href;
}

export function trackPhoneClick(href: string, link?: Element | null) {
  const now = Date.now();
  // A second tap on the same link inside 800ms is one call. A different
  // link, including a different number, is counted on its own.
  if (link) {
    const last = lastPhoneClickAt.get(link) ?? 0;
    if (now - last < 800) return;
    lastPhoneClickAt.set(link, now);
  } else {
    const key = phoneDigits(href);
    const last = lastPhoneClickByNumber.get(key) ?? 0;
    if (now - last < 800) return;
    lastPhoneClickByNumber.set(key, now);
  }
  ensureAdsConfig();
  const gtag = ensureGtag();
  gtag("event", "conversion", {
    send_to: ADS_PHONE_CLICK_SEND_TO,
    value: 5.0,
    currency: "USD",
    transport_type: "beacon",
  });
  trackGa4Event("phone_click", { method: "click_to_call", link_url: href });
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
 * GTM and no HubSpot form, so the GoHighLevel success message is the
 * confirmed-submit signal and the thank-you page is where it is counted.
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
    if (!consumeLeadPending()) return;
    trackLeadConversion();
  }, [onThankYou]);

  useEffect(() => {
    if (!onLanding) return;

    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
      // Google's calls-from-website config can swap the href for a forwarding
      // number. Every tel: link on these landing pages is a call we want.
      trackPhoneClick(link.getAttribute("href") || "", link);
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
      if (!isGhlLeadSuccess(event)) return;
      markLeadPending();
      // The form usually redirects window.top itself. Wait so we don't race
      // that navigation. If it never comes, route from the parent. The
      // thank-you page is the only place that fires the conversion.
      window.clearTimeout(pending);
      pending = window.setTimeout(() => {
        if (window.location.pathname.includes("/thank-you")) return;
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
