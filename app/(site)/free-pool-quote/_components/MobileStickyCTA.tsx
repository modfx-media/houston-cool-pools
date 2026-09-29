"use client";

import { usePathname } from "next/navigation";
import { LP_CONTACT } from "../_lib/data";

/**
 * Sticky bottom CTA with Free Quote + Phone buttons.
 * Full-width bar on mobile; floating pill anchored bottom-right on desktop.
 * Hidden on TYP.
 */
export function MobileStickyCTA() {
  const pathname = usePathname();
  const isTyp = pathname?.startsWith("/free-pool-quote/thank-you") ?? false;
  if (isTyp) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-[#0a1628]/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:rounded-full md:border md:border-white/10 md:px-2 md:py-2 md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto flex max-w-md items-center gap-2 md:max-w-none">
        <a
          href="#quote-form"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#00b4d8] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:brightness-110 active:scale-[0.98] md:flex-none md:px-6 md:py-3 md:text-sm"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Request Free Quote
        </a>
        <a
          href={LP_CONTACT.phoneHref}
          aria-label={`Call ${LP_CONTACT.phoneDisplay}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white/[0.12] active:scale-[0.98] md:flex-none md:px-6 md:py-3 md:text-sm md:tracking-normal md:normal-case"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
          </svg>
          <span className="md:hidden">Call</span>
          <span className="hidden md:inline">{LP_CONTACT.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
