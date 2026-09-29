"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Landing-page financing section. Positioned as section 5 (after Offer, before
 * Gallery) so a visitor's "can I actually afford this?" objection is answered
 * before the pricing tiers are shown. Kept self-contained (no external logos)
 * to preserve LP page-speed for Google Ads Quality Score.
 */

const BENEFITS: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Low Monthly Payments",
    body: "Structure the build around a payment that fits your budget - not a lump sum.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M3 7h18M6 7v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M9 12h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fixed Interest Rates",
    body: "Predictable rates so your payment never surprises you mid-project.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v10H5z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fast Approval Decisions",
    body: "Most applicants get pre-qualified in minutes with a soft credit pull.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Finance Up to 100%",
    body: "Pool, decking, landscape, spa, outdoor kitchen - roll the full backyard into one loan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M3 12l3 3 15-15M3 20h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/** Trusted lender network - text pills only, no external image requests.
 *  Names + order match the /poolfinancing page. */
const LENDERS = [
  "HFS Financial",
  "Lyon Financial",
  "LightStream Financial",
  "Viking Capital",
  "Frost Bank",
] as const;

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export function Financing() {
  return (
    <section
      id="financing"
      aria-labelledby="lp-financing-heading"
      className="relative isolate overflow-hidden bg-[#0a1628] py-16 text-white sm:py-24"
    >
      {/* Ambient background: dot grid + soft cyan glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,180,216,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-30, 25, -30], y: [-10, 25, -10] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-16 top-16 h-[420px] w-[420px] rounded-full bg-[#00b4d8]/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [30, -20, 30], y: [10, 40, 10] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-16 bottom-10 h-[380px] w-[380px] rounded-full bg-[#0ea5e9]/12 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-16 xl:px-20">
        {/* ─────────── LEFT: headline + benefits ─────────── */}
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            Flexible options for qualified homeowners
          </motion.span>

          <motion.h2
            id="lp-financing-heading"
            variants={item}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Build now.{" "}
            <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
              Pay monthly.
            </span>
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            We work with trusted lending partners to provide{" "}
            <span className="font-semibold text-white">
              flexible financing options
            </span>{" "}
            for qualified homeowners - so you can start building your custom
            pool this season instead of years from now.
          </motion.p>

          {/* Benefits grid */}
          <motion.ul
            variants={item}
            className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4"
          >
            {BENEFITS.map((b) => (
              <li
                key={b.title}
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:border-[#00b4d8]/40 hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#00b4d8]/15 text-[#00b4d8]">
                  {b.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white">{b.title}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-400">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>

          {/* CTA row */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link
              href="#quote-form"
              data-quote-modal
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0ea5e9] px-6 py-3.5 text-sm font-bold text-white shadow-[0_20px_40px_-15px_rgba(0,180,216,0.7)] transition-transform hover:-translate-y-0.5 sm:text-[15px]"
            >
              Get My Financing Options
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <a
              href={LP_CONTACT.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#00b4d8]/60 hover:bg-[#00b4d8]/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
              </svg>
              {LP_CONTACT.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>

        {/* ─────────── RIGHT: payment illustration card ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          {/* Soft outer glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#00b4d8]/25 via-transparent to-[#0ea5e9]/20 blur-2xl"
          />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#112240] via-[#0f2035] to-[#0a1628] p-6 shadow-[0_30px_60px_-20px_rgba(0,180,216,0.35)] sm:p-8">
            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00b4d8]">
                  Sample Loan Snapshot
                </div>
                <div className="font-display mt-1 text-lg font-extrabold text-white">
                  Your dream pool, made affordable
                </div>
              </div>
              <span
                className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300"
              >
                Pre-qualified
              </span>
            </div>

            {/* Illustrative payment blocks */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Term", value: "15 yrs" },
                { label: "APR", value: "Fixed" },
                { label: "Down", value: "0%" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {s.label}
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-white">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#00b4d8]/25 bg-gradient-to-br from-[#00b4d8]/15 to-transparent p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
                Est. Monthly Payment
              </div>
              <div className="mt-1 font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                  Low as a car payment
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                Actual payment depends on loan amount, term, credit profile and
                lender. Ask about your options in your free in-home quote.
              </p>
            </div>

            {/* Lender trust strip */}
            <div className="mt-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Trusted Lender Network
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {LENDERS.map((l) => (
                  <li
                    key={l}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-slate-200"
                  >
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
                The companies listed above are in no way affiliated with
                Houston Cool Pools. We have, however, worked with each of them
                and can attest to their service and professionalism.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
