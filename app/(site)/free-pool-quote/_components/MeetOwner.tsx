"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const QUALIFICATIONS = [
  "30+ yrs custom pool builder",
  "Best of Houzz",
  "Angie's List Super Service Award",
  "Personally oversees every build",
  "BBB A+ Rated",
  "SBA Emerging Leaders Award",
  "BBB Gold Star Award",
  "GHBA & NAHB Member",
];

const STATS = [
  { value: "30+", label: "Years" },
  { value: "1,600+", label: "Pools" },
  { value: "A+", label: "BBB Rated", star: true },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#00b4d8" fillOpacity="0.12" />
      <path
        d="M8 12.5l2.8 2.8L16.5 9.5"
        fill="none"
        stroke="#00b4d8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MeetOwner({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`relative overflow-hidden bg-white ${
        compact ? "py-12 sm:py-16" : "py-14 sm:py-24"
      }`}
    >
      {/* subtle floating glow */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[#00b4d8]/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#00b4d8]/8 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-8 lg:grid-cols-[1.05fr_1.15fr] lg:gap-16 lg:px-16 xl:px-20">
        {/* LEFT - photo card with floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Dashed cyan inset frame */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-[#00b4d8]/30"
          />

          {/* Inner photo card */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_60px_-20px_rgba(15,32,53,0.25)] ring-1 ring-slate-200">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/team/mike-lopez-portrait.png"
                alt="Mike Lopez, owner of Houston Cool Pools"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Bottom name plate */}
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
              <div>
                <div className="font-display text-base font-bold text-[#0a1628]">
                  Mike Lopez
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Owner · 30+ Yrs
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 fill-amber-500"
                  aria-hidden="true"
                >
                  <path d="M12 2l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 16.9l-5.9 3.1L7.4 13.4 2.4 8.8l6.7-.7L12 2z" />
                </svg>
                Voted Best
              </span>
            </div>
          </div>

          {/* Top-right floating: 1,600+ POOLS BUILT */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            whileHover={{ y: -3 }}
            className="absolute -right-2 top-5 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-xl sm:-right-4 sm:top-8 sm:px-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00b4d8]/12 text-[#00b4d8]">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                <circle cx="10" cy="7" r="4" />
                <path d="M21 21v-2a4 4 0 0 0-3-3.87M17 3.13A4 4 0 0 1 17 11" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="font-display text-base font-extrabold leading-none text-[#0a1628] sm:text-lg">
                1,600+
              </div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Pools Built
              </div>
            </div>
          </motion.div>

          {/* Bottom-left floating: On-Budget Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            whileHover={{ y: -3 }}
            className="absolute -left-2 bottom-28 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-xl sm:-left-4 sm:bottom-32 sm:px-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M12 2l2.2 4.8L19 8l-3.6 3.4.9 4.9L12 13.9 7.7 16.3l.9-4.9L5 8l4.8-1.2L12 2z" />
              </svg>
            </div>
            <div>
              <div className="font-display text-sm font-bold leading-none text-[#0a1628]">
                On-Budget
              </div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Guarantee
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT - copy + qualifications + stats + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#00b4d8]">
            <CheckIcon />
            Meet The Owner
          </span>

          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl lg:text-6xl">
            Mike Lopez, <span className="text-[#00b4d8]">Owner</span>
          </h2>

          {compact ? (
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Mike has spent more than 30 years designing the kind of backyards
              Houston families gather around, and he personally oversees every
              build.{" "}
              <strong className="text-[#0a1628]">
                Every quote carries his 100% on-budget guarantee, in writing.
              </strong>
            </p>
          ) : (
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                For more than 30 years, Mike has been designing and building
                the kind of backyards Houston families gather around. His
                philosophy is simple: designing fun, building fun, and having
                fun while doing it, and then watching customers enjoy their
                new pools for years to come.
              </p>
              <p>
                Mike personally oversees every project.{" "}
                <strong className="text-[#0a1628]">
                  Every quote carries his 100% on-budget guarantee, in writing.
                </strong>
              </p>
            </div>
          )}

          {/* Qualification pills */}
          {!compact && (
            <div className="mt-7 flex flex-wrap gap-2">
              {QUALIFICATIONS.map((q, i) => (
                <motion.span
                  key={q}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  <CheckIcon />
                  {q}
                </motion.span>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm"
              >
                <div className="flex items-center justify-center font-display text-2xl font-extrabold text-[#0a1628] sm:text-3xl">
                  {s.value}
                  {s.star && (
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-5 w-5 fill-[#fbbf24]"
                      aria-hidden="true"
                    >
                      <path d="M12 2l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 16.9l-5.9 3.1L7.4 13.4 2.4 8.8l6.7-.7L12 2z" />
                    </svg>
                  )}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pull-quote (only in non-compact) */}
          {!compact && (
            <blockquote className="mt-8 rounded-2xl border-l-4 border-[#00b4d8] bg-white/60 px-5 py-4 font-display text-lg italic text-[#0a1628] shadow-sm sm:text-xl">
              “I love what I do and I love who I do it with. Our job is all
              about fun.”
              <footer className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] not-italic text-slate-500">
                Mike Lopez
              </footer>
            </blockquote>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {!compact && (
              <a
                href="#quote-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00b4d8] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-[#00b4d8]/30 transition hover:bg-[#0a1628]"
              >
                Get My Free Pool Quote
                <span>→</span>
              </a>
            )}
            <a
              href={LP_CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-[#0a1628] shadow-sm transition hover:border-[#00b4d8] hover:text-[#00b4d8]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
              </svg>
              {LP_CONTACT.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
