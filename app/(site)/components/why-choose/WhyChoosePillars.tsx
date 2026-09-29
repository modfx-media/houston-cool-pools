"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PILLARS } from "../../../../lib/why-choose";
import { PillarIcon } from "./PillarCard";
import { CountUp } from "./CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The three primary pillars from the live page (Stability, Cutting Edge
 * Technology, Peace of Mind). Rendered as a tabs pattern so the section
 * stays compact - only one pillar's content is visible at a time and long
 * bullet lists (like Peace of Mind's 12 items) are laid out in two columns.
 */
export function WhyChoosePillars() {
  const pillars = PILLARS.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20">
      {/* Background pool photo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gallery/hd/estate-luxe.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/92 via-slate-50/96 to-slate-50" />
      </div>

      <span className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/10 blur-[140px]" />
      <span className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[var(--color-gold-light)]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            The HCP Difference
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy)] md:text-5xl">
            Built on stability, technology &amp;{" "}
            <span className="italic text-[var(--color-pool)]">peace of mind</span>
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-slate-600 md:text-base">
            Pick a pillar to see what&rsquo;s standard on every Houston Cool Pools build.
          </p>
        </motion.div>

        {/* ----- Tabs ----- */}
        <div
          role="tablist"
          aria-label="Why Choose HCP pillars"
          className="mt-10 flex flex-wrap items-stretch justify-center gap-2.5 md:mt-12 md:gap-3"
        >
          {pillars.map((p, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveIndex(i)}
                className={`group relative inline-flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] focus-visible:ring-offset-2 sm:px-5 sm:py-3 sm:text-xs ${
                  active
                    ? "-translate-y-0.5 bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-[0_14px_32px_-12px_rgba(0,124,182,0.7)] ring-2 ring-[var(--color-pool)]/25 ring-offset-2 ring-offset-slate-50"
                    : "border-2 border-slate-200 bg-white text-slate-600 shadow-sm hover:-translate-y-0.5 hover:border-[var(--color-pool)]/50 hover:text-[var(--color-pool-deep)]"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full transition-colors ${
                    active ? "bg-white/25 text-white" : "bg-[var(--color-pool)]/10 text-[var(--color-pool)]"
                  }`}
                >
                  <PillarIcon title={p.title} />
                </span>
                {p.title}
              </button>
            );
          })}
        </div>

        {/* ----- Active pillar card ----- */}
        <div className="mt-8 md:mt-10">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease }}
              className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_28px_60px_-32px_rgba(0,55,73,0.45)] md:p-10"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
              />
              <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-pool)]/8 blur-2xl" />

              <div className="relative flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-lg">
                    <PillarIcon title={active.title} />
                  </span>
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                      Pillar {activeIndex + 1} of {pillars.length}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] mt-1 text-2xl font-extrabold leading-tight text-[var(--color-navy)] md:text-3xl">
                      {active.title}
                    </h3>
                  </div>
                </div>
                {active.stat ? (
                  <div className="hidden text-right sm:block">
                    <CountUp
                      value={active.stat.value}
                      prefix={active.stat.prefix}
                      suffix={active.stat.suffix}
                      className="font-[family-name:var(--font-display)] block text-3xl leading-none text-[var(--color-navy)] md:text-4xl"
                    />
                    <p className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[var(--color-pool)]">
                      {active.stat.label}
                    </p>
                  </div>
                ) : null}
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 md:text-base">
                {active.blurb}
              </p>

              {/* Bullets in two columns to compress vertical height */}
              <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {active.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/12 text-[var(--color-pool)]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
