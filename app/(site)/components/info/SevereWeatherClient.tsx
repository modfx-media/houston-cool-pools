"use client";

import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";
import {
  HURRICANE_STEPS as HURRICANE,
  FREEZE_STEPS as FREEZE,
  type SevereWeatherStep,
} from "../../../../lib/pool-resources";

const ease = [0.22, 1, 0.36, 1] as const;

type Step = SevereWeatherStep;

function Checklist({ steps, tone }: { steps: Step[]; tone: "warn" | "cold" }) {
  const accent = tone === "warn"
    ? "from-[#a01d1d] to-[#f37121]"
    : "from-[var(--color-pool-deep)] to-[var(--color-pool)]";
  const chipBg = tone === "warn" ? "bg-[#a01d1d]" : "bg-[var(--color-pool-deep)]";

  return (
    <div className="grid gap-4">
      {steps.map((s, i) => (
        <motion.article
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-28px_rgba(0,27,36,0.2)] md:p-7"
        >
          <span aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
          <div className="flex items-start gap-4">
            <span className={`grid h-11 w-11 flex-none place-items-center rounded-2xl ${chipBg} font-display text-[15px] font-extrabold text-white shadow-md`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-[19px] font-extrabold text-[var(--color-navy-deep)] sm:text-xl">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{s.body}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export function SevereWeatherClient() {
  return (
    <>
      <InfoHero
        eyebrow="Weather Guide"
        title="Severe Weather Pool Care"
        subtitle="Every Houston pool owner needs a plan for hurricane season and the occasional hard freeze. Follow these steps to protect your investment when the forecast turns."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Severe Weather" },
        ]}
        backgroundImage="/images/gallery/hd/sunset-pool.jpg"
        backgroundAlt="Sunset over a Houston Cool Pools backyard build"
      />

      <section className="bg-[#f7f6f2] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          {/* Hurricane */}
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#a01d1d] to-[#f37121] text-white shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#a01d1d]">
                Hurricane &amp; Tropical Storm
              </p>
              <h2 className="font-display text-2xl font-extrabold text-[var(--color-navy-deep)] sm:text-3xl">
                Storm-prep checklist
              </h2>
            </div>
          </div>
          <Checklist steps={HURRICANE} tone="warn" />

          {/* Freeze */}
          <div className="mt-16 mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool-deep)] to-[var(--color-pool)] text-white shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9M8 4l4 3 4-3M8 20l4-3 4 3M4 8l1 4-1 4M20 8l-1 4 1 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool-deep)]">
                Hard Freeze
              </p>
              <h2 className="font-display text-2xl font-extrabold text-[var(--color-navy-deep)] sm:text-3xl">
                Freezing-weather checklist
              </h2>
            </div>
          </div>
          <Checklist steps={FREEZE} tone="cold" />

          {/* Emergency card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-navy-deep)] to-[#022b3a] p-8 text-white shadow-[0_20px_60px_-30px_rgba(0,27,36,0.5)] md:p-10"
          >
            <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--color-pool)]/30 blur-3xl" />
            <span aria-hidden className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl" />
            <div className="relative">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                Emergency service
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                Storm damage or a broken freeze line?
              </h3>
              <p className="mt-3 max-w-xl text-[15px] text-white/75">
                Houston Cool Pools&rsquo; service team handles emergency repairs after major weather events. Call the office and we&rsquo;ll get you on the schedule.
              </p>
              <a
                href="tel:+12816456631"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition hover:brightness-110"
              >
                Call 281-645-6631
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
