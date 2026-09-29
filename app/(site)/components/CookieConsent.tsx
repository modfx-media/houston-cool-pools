"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "hcp-cookie-consent";
export const COOKIE_CONSENT_EVENT = "hcp-cookie-consent-changed";

export type ConsentValue = "accepted" | "declined";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

function storeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore (private browsing / storage disabled) */
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(COOKIE_CONSENT_EVENT, { detail: value }));
}

/** Clears the stored decision so the consent card shows again (used by the Privacy Policy page). */
export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent<null>(COOKIE_CONSENT_EVENT, { detail: null }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(getStoredConsent() === null));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentValue | null>).detail;
      setVisible(detail === null);
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  if (!visible) return null;

  function decide(value: ConsentValue) {
    storeConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-[70] w-[min(90vw,360px)] rounded-2xl border border-white/10 bg-[var(--color-navy-deep)] p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] sm:bottom-6 sm:left-6"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[var(--color-pool)]/20 text-base"
        >
          🍪
        </span>
        <p className="font-display text-sm font-bold text-white">We value your privacy</p>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-white/75">
        We use cookies to improve your experience, analyze site traffic, and personalize
        content. See our{" "}
        <Link href="/privacynotice" className="underline underline-offset-2 hover:text-white">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => decide("declined")}
          className="flex-1 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/50 hover:text-white"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="flex-1 rounded-full bg-[var(--color-pool)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-pool-deep)]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
