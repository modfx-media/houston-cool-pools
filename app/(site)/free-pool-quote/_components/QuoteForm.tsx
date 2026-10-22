"use client";

import { motion } from "motion/react";
import Script from "next/script";
import { LP_CONTACT, LP_OFFER_CHECKLIST } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Same embed as the popup (QuoteModal) so this LP only ever uses one form.
const FORM_ID = "XDBGRHc1OgzH7jpnljtT";
const FORM_NAME = "Google LP Opt-In Form";
const FORM_SRC = `https://link.millcreekmktg.com/widget/form/${FORM_ID}`;
const FORM_HEIGHT = 1271;

export function QuoteForm() {
  return (
    <section
      id="quote-form"
      className="relative isolate overflow-x-clip bg-white py-14 sm:py-24"
    >
      {/* Soft motion backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,22,40,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-30, 25, -30], y: [-15, 25, -15] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-6%] top-[8%] h-[380px] w-[380px] rounded-full bg-[#00b4d8]/12 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [30, -20, 30], y: [20, 55, 20] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-6%] bottom-[6%] h-[420px] w-[420px] rounded-full bg-[#22d3ee]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:gap-12 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16 lg:px-16 xl:px-20">
        {/* Left column - info (sticky on desktop so it stays visible while
            the tall MillCreek form iframe scrolls in the right column) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
          <span className="inline-flex items-center rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00b4d8]">
            Free · No Obligation · No Pressure
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl">
            Claim Your{" "}
            <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
              Free Pool Quote
            </span>{" "}
            Today
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Fill out the form and we&apos;ll reach out within one business day
            to schedule your free in-home quote.
          </p>

          <ul className="mt-7 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {LP_OFFER_CHECKLIST.map((c) => (
              <li key={c} className="flex items-start gap-2.5">
                <span className="mt-1 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]">
                  <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 fill-current">
                    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 8.9a1 1 0 0 1 1.4-1.4l4 4 6.6-6.6a1 1 0 0 1 1.4.4Z" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-3 text-sm">
            <p className="flex items-center gap-2 text-slate-700">
              <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
                </svg>
              </span>
              <a
                href={LP_CONTACT.phoneHref}
                className="font-semibold text-[#0a1628] hover:text-[#00b4d8]"
              >
                {LP_CONTACT.phoneDisplay}
              </a>
            </p>
            <p className="flex items-start gap-2 text-slate-700">
              <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 7 12 7 12s1 0 1 0 7-6.75 7-12a8 8 0 0 0-7-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
              </span>
              <span>{LP_CONTACT.address}</span>
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">
              {LP_CONTACT.hours}
            </p>
          </div>
        </motion.div>
        </div>

        {/* Right column - embedded LeadConnector form (same one as popup) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="relative"
        >
          {/* Soft cyan glow ring */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-[#00b4d8]/25 via-transparent to-[#0ea5e9]/20 blur-xl"
          />

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,32,53,0.25)]">
            {/* Form header strip */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2035] to-[#0a1628] px-6 py-5 sm:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#00b4d8]/25 blur-2xl"
              />
              <div className="relative flex items-center gap-3">
                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#00b4d8]/15 text-[#00b4d8]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
                    Quick Quote Form
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    Tell us about your dream pool
                  </div>
                </div>
              </div>
            </div>

            {/* LeadConnector iframe */}
            <iframe
              src={FORM_SRC}
              id={`inline-${FORM_ID}`}
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name={FORM_NAME}
              data-height={String(FORM_HEIGHT)}
              data-layout-iframe-id={`inline-${FORM_ID}`}
              data-form-id={FORM_ID}
              title={FORM_NAME}
              height={FORM_HEIGHT}
              className="block w-full border-0"
            />

            {/* Footer trust strip */}
            <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-[11px] font-medium text-slate-600">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current" aria-hidden>
                  <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </span>
              No obligation · We never share your information
            </div>
          </div>
        </motion.div>
      </div>

      {/* MillCreek embed script for iframe auto-resize */}
      <Script
        src="https://link.millcreekmktg.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </section>
  );
}
