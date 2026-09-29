"use client";

import { motion } from "motion/react";
import { LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const PERKS = [
  "Free in-home quote",
  "Custom design concepts",
  "100% on-budget guarantee",
] as const;

/**
 * OfferCard - animated "Today's Offer" panel rendered on the right side of
 * the hero. Combines motion graphics: rotating dashed ring around a glowing
 * FREE disc, struck-through "Was $500", stamped FREE badge, staggered
 * checklist with check-in animation, and an animated progress / urgency
 * indicator.
 */
export function OfferCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.9, ease }}
      whileHover={{ y: -4 }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      {/* Animated gradient glow border */}
      <motion.div
        aria-hidden
        animate={{
          background: [
            "conic-gradient(from 0deg, rgba(0,180,216,.6), rgba(34,211,238,.1), rgba(0,180,216,.6))",
            "conic-gradient(from 360deg, rgba(0,180,216,.6), rgba(34,211,238,.1), rgba(0,180,216,.6))",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-px rounded-3xl opacity-70 blur-[2px]"
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a1628]/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7">
        {/* Header strip */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#00b4d8]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            Today&apos;s Offer
          </div>
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Limited 2026 Slots
          </span>
        </div>

        {/* Main offer graphic */}
        <div className="relative mt-5 flex items-center justify-center">
          <div className="relative h-44 w-44 sm:h-48 sm:w-48">
            {/* Rotating dashed ring */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="offerRing" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#00b4d8" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="url(#offerRing)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
              />
              <motion.circle
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="#00b4d8"
                strokeOpacity="0.25"
                strokeWidth="1"
                strokeDasharray="2 4"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
              />
            </svg>

            {/* Inner disc with pulse */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0,180,216,0.45)",
                  "0 0 0 24px rgba(0,180,216,0)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-6 rounded-full bg-gradient-to-br from-[#0a1628] via-[#0f2035] to-[#0a1628] ring-1 ring-[#00b4d8]/40"
            />

            {/* FREE label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3, ease }}
                className="font-display text-4xl font-extrabold tracking-tight text-[#00b4d8] drop-shadow-[0_0_18px_rgba(0,180,216,0.55)] sm:text-5xl"
              >
                FREE
              </motion.span>
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/70 sm:text-[10px]">
                Pool Quote
              </span>
            </div>

            {/* Floating "Was $500" tag */}
            <motion.div
              initial={{ opacity: 0, x: -16, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 0.6, delay: 1.6, ease }}
              className="absolute -left-2 top-2 rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60 line-through backdrop-blur"
            >
              Was $500
            </motion.div>

            {/* Stamped SAVE badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: 18 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{
                duration: 0.5,
                delay: 1.9,
                ease,
                type: "spring",
                stiffness: 220,
              }}
              className="absolute -right-3 bottom-2 rounded-full border-2 border-[#22d3ee] bg-[#0a1628] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#22d3ee] shadow-lg shadow-[#00b4d8]/40"
            >
              Save $500
            </motion.div>
          </div>
        </div>

        {/* Perks checklist */}
        <ul className="mt-6 space-y-2">
          {PERKS.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 1.4 + i * 0.12, ease }}
              className="flex items-center gap-2.5 text-[13px] text-[#cbd5e1]"
            >
              <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 ring-1 ring-[#00b4d8]/30">
                <motion.svg
                  viewBox="0 0 20 20"
                  className="h-3 w-3 text-[#00b4d8]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.5 + i * 0.12,
                    ease,
                  }}
                >
                  <motion.path
                    d="M4 10l4 4 8-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
              {p}
            </motion.li>
          ))}
        </ul>

        {/* Progress / urgency */}
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em]">
            <span className="text-white/80">New Build Slots</span>
            <span className="text-[#00b4d8]">82% Booked</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 1.8, delay: 1.6, ease }}
              className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] via-[#00b4d8] to-[#0ea5e9]"
            />
          </div>
          <p className="mt-2 text-[11px] text-[#94a3b8]">
            Reserve your spot. Quotes responded to within{" "}
            <span className="font-semibold text-white">1 business day</span>.
          </p>
        </div>

        {/* CTA inside card */}
        <a
          href="#quote-form"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#00b4d8] px-5 py-3 text-sm font-bold uppercase tracking-[0.1em] text-[#0a1628] transition hover:bg-white"
        >
          Claim My Free Quote
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </a>
        <p className="mt-2 text-center text-[10px] text-[#64748b]">
          Or call{" "}
          <a
            href={LP_CONTACT.phoneHref}
            className="font-semibold text-white/80 hover:text-[#00b4d8]"
          >
            {LP_CONTACT.phoneDisplay}
          </a>
        </p>
      </div>
    </motion.div>
  );
}
