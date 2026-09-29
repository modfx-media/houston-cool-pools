"use client";

import { motion } from "motion/react";
import { LP_TESTIMONIALS } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Per-card metadata (avatar color + "posted" date) - Google review look.
const AVATAR_PALETTE = [
  "from-[#4285F4] to-[#1a73e8]", // blue
  "from-[#EA4335] to-[#c5221f]", // red
  "from-[#34A853] to-[#188038]", // green
  "from-[#FBBC04] to-[#f29900]", // yellow / orange
  "from-[#A142F4] to-[#8430ce]", // purple
  "from-[#00B4D8] to-[#0077a3]", // brand cyan
] as const;

const POSTED = [
  "2 weeks ago",
  "1 month ago",
  "2 months ago",
  "3 months ago",
  "5 months ago",
  "7 months ago",
] as const;

const REVIEW_COUNTS = [12, 4, 24, 6, 17, 9] as const;

export function Testimonials() {
  const total = LP_TESTIMONIALS.length;

  return (
    <section className="relative isolate overflow-hidden bg-[#E8F0F7] py-14 sm:py-28">
      <BackdropGraphics />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
          >
            <GoogleG className="h-4 w-4" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
              Verified Google Reviews
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl lg:text-6xl"
          >
            Five-star reviews from real{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                Houston homeowners
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
        </div>

        {/* Google rating summary card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_18px_40px_-22px_rgba(15,32,53,0.18)] sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <GoogleG className="h-9 w-9" />
              <div className="text-left">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Google Reviews
                </div>
                <div className="font-display text-base font-bold text-[#0a1628]">
                  Houston Cool Pools
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-extrabold text-[#0a1628]">
                5.0
              </span>
              <div className="flex flex-col items-start">
                <Stars />
                <span className="mt-1 text-[11px] font-medium text-slate-500">
                  Based on {total * 8}+ reviews
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review cards grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LP_TESTIMONIALS.map((t, i) => (
            <ReviewCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              location={t.location}
              palette={AVATAR_PALETTE[i % AVATAR_PALETTE.length]}
              posted={POSTED[i % POSTED.length]}
              reviewCount={REVIEW_COUNTS[i % REVIEW_COUNTS.length]}
              index={i}
            />
          ))}
        </div>

        {/* CTA - "see more on Google" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0a1628] shadow-sm transition hover:border-[#00b4d8]/60 hover:bg-[#f0fbff]"
          >
            <GoogleG className="h-4 w-4" />
            Read all reviews on Google
            <span className="transition group-hover:translate-x-1">&rarr;</span>
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#0a1628] shadow-sm">
            <FacebookF className="h-3.5 w-3.5" />
            Verified on Facebook
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Review card ---------- */

function ReviewCard({
  quote,
  name,
  location,
  palette,
  posted,
  reviewCount,
  index,
}: {
  quote: string;
  name: string;
  location: string;
  palette: string;
  posted: string;
  reviewCount: number;
  index: number;
}) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-22px_rgba(15,32,53,0.18)] transition hover:-translate-y-0.5 hover:border-[#00b4d8]/40 hover:shadow-[0_25px_50px_-22px_rgba(0,180,216,0.25)]"
    >
      {/* Google G top-right */}
      <div className="absolute right-5 top-5">
        <GoogleG className="h-5 w-5" />
      </div>

      {/* Top: avatar + name */}
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gradient-to-br ${palette} font-display text-lg font-bold text-white shadow-sm`}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-bold text-[#0a1628]">
            {name}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current text-[#00b4d8]" aria-hidden>
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 7 12 7 12s1 0 1 0 7-6.75 7-12a8 8 0 0 0-7-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <span className="truncate">{location}</span>
            <span className="text-slate-300">·</span>
            <span>{reviewCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Stars + posted */}
      <div className="mt-4 flex items-center gap-2">
        <Stars />
        <span className="text-[11px] text-slate-500">{posted}</span>
      </div>

      {/* Quote */}
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{quote}</p>

      {/* Bottom row: like / share visual (decorative, Google style) */}
      <div className="mt-5 flex items-center gap-4 border-t border-slate-200 pt-4 text-[11px] font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 7.59 6.59C7.22 6.95 7 7.45 7 8v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z" />
          </svg>
          Helpful
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
          Share
        </span>
      </div>
    </motion.article>
  );
}

/* ---------- Stars ---------- */

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#fbbc04]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
          <path d="M12 2l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 16.9l-5.9 3.1L7.4 13.4 2.4 8.8l6.7-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Google G logo ---------- */

function GoogleG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

/* ---------- Facebook icon ---------- */

function FacebookF({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#1877F2"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      />
    </svg>
  );
}

/* ---------- Backdrop motion graphics ---------- */

function BackdropGraphics() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,22,40,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-40, 30, -40], y: [-20, 30, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-8%] top-[6%] h-[380px] w-[380px] rounded-full bg-[#00b4d8]/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [40, -30, 40], y: [20, 70, 20] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-8%] bottom-[5%] h-[420px] w-[420px] rounded-full bg-[#22d3ee]/8 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/25 to-transparent"
      />
    </>
  );
}
