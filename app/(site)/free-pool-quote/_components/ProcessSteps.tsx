"use client";

import { motion } from "motion/react";
import { LP_TIMELINE, LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const STEP_ICONS = [
  // Review your request
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8} aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h16" strokeLinecap="round" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  // Call to schedule
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
    </svg>
  ),
  // Team comes to you
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.7} aria-hidden>
      <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2V10z" strokeLinejoin="round" />
    </svg>
  ),
  // Full quote
  (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.7} aria-hidden>
      <path d="M8 4h9l3 3v13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" strokeLinejoin="round" />
      <path d="M9 10h8M9 14h5" strokeLinecap="round" />
      <circle cx="17" cy="14" r="1.8" />
    </svg>
  ),
];

export function ProcessSteps() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f5f8fa] to-white py-14 sm:py-24">
      {/* Backdrop motion */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,22,40,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-30, 20, -30], y: [-20, 30, -20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-6%] top-1/3 h-[380px] w-[380px] rounded-full bg-[#00b4d8]/12 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [30, -20, 30], y: [10, 50, 10] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-6%] bottom-1/4 h-[420px] w-[420px] rounded-full bg-[#22d3ee]/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl lg:text-6xl"
          >
            From request to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                dream pool
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent"
              />
            </span>{" "}
            in four steps
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            No pushy sales calls. No mystery pricing. Here&apos;s exactly what
            happens after you request your free in-home quote.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="relative mt-14">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent 0, rgba(0,180,216,0.35) 40px, rgba(0,180,216,0.35) calc(100% - 40px), transparent 100%)",
            }}
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LP_TIMELINE.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-22px_rgba(15,32,53,0.18)] transition hover:border-[#00b4d8]/40 hover:shadow-[0_28px_55px_-22px_rgba(0,180,216,0.35)]"
              >
                {/* corner wash */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#00b4d8]/15 to-transparent blur-2xl transition group-hover:from-[#00b4d8]/25"
                />

                {/* Icon + step number */}
                <div className="relative flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 6 }}
                    transition={{ duration: 0.4, ease }}
                    className="relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] text-white shadow-lg shadow-[#00b4d8]/30"
                  >
                    {STEP_ICONS[i]}
                    {/* pulse ring */}
                    <motion.span
                      aria-hidden
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      className="absolute inset-0 rounded-2xl bg-[#00b4d8]/40"
                    />
                  </motion.div>

                  <span className="font-display text-3xl font-extrabold text-[#0a1628]/10 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-lg font-bold text-[#0a1628]">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>

                {/* bottom accent */}
                <div className="relative mt-5 h-[2px] w-10 rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent transition-all duration-500 group-hover:w-20" />
              </motion.li>
            ))}
          </ol>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-[#f5f8fa] to-white p-6 shadow-[0_20px_40px_-22px_rgba(15,32,53,0.12)] sm:p-8"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,180,216,0.1),transparent_55%)]"
          />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00b4d8]">
                Ready when you are
              </p>
              <p className="mt-2 font-display text-xl font-bold text-[#0a1628] sm:text-2xl">
                Start your build. It all begins with a free quote.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#00b4d8] px-6 py-3 text-sm font-semibold text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:bg-[#0a1628] hover:text-white"
              >
                Get My Free Quote
                <span className="transition group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href={LP_CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#0a1628] transition hover:border-[#00b4d8] hover:text-[#00b4d8]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden
                >
                  <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
                </svg>
                {LP_CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
