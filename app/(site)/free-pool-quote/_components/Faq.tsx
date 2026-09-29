"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LP_FAQS, LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative isolate overflow-hidden bg-[#0a1628] py-14 sm:py-28">
      {/* ---- Backdrop motion graphics ---- */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-50, 30, -50], y: [-20, 30, -20], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-8%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#00b4d8]/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [40, -30, 40], y: [20, 70, 20], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-8%] bottom-[5%] h-[460px] w-[460px] rounded-full bg-[#22d3ee]/15 blur-3xl"
      />
      {/* spinning conic orb behind heading */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-24 h-[260px] w-[260px] -translate-x-1/2 rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,180,216,0.0), rgba(0,180,216,0.5), rgba(34,211,238,0.2), rgba(0,180,216,0.0))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/50 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Frequently Asked{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                Questions
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#94a3b8]"
          >
            Everything you need to know before your free in-home quote.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-3">
          {LP_FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              index={i}
              q={item.q}
              a={item.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0f2035] via-[#112240] to-[#0f2035] p-5 sm:p-6"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,180,216,0.18),transparent_55%)]"
          />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00b4d8]">
                Still have questions?
              </p>
              <p className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                Talk to a Houston Cool Pools designer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#00b4d8] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:bg-white sm:text-sm"
              >
                Get My Free Quote
              </a>
              <a
                href={LP_CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:border-[#00b4d8] hover:text-[#00b4d8] sm:text-sm"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
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

/* ---------- Accordion item ---------- */

function FaqItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease }}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors ${
        open
          ? "border-[#00b4d8]/40 bg-[#0f2035]/80"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      {/* Cyan side-stripe when open */}
      <motion.span
        aria-hidden
        animate={{ scaleY: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className="absolute inset-y-2 left-0 w-[3px] origin-center rounded-r-full bg-gradient-to-b from-[#22d3ee] to-[#00b4d8]"
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md font-display text-[11px] font-bold transition-colors ${
              open
                ? "bg-[#00b4d8] text-[#0a1628]"
                : "bg-white/10 text-[#cbd5e1]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-display text-[15px] font-semibold leading-snug sm:text-base ${
              open ? "text-white" : "text-[#e2e8f0]"
            }`}
          >
            {q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-colors ${
            open
              ? "border-[#00b4d8] bg-[#00b4d8]/15 text-[#00b4d8]"
              : "border-white/15 bg-white/[0.04] text-[#94a3b8]"
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-14 pr-5 text-sm leading-relaxed text-[#cbd5e1] sm:px-6 sm:pb-6 sm:pl-[3.75rem]">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
