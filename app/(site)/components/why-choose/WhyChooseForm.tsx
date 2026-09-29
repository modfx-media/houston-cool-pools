"use client";

import { motion } from "motion/react";
import { ConsultationForm } from "../contact/ConsultationForm";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const POINTS = [
  "100% on-budget guarantee - no surprise change orders",
  "30+ years building pools across the Houston area",
  "Real-time project updates, start to finish",
  "One dedicated team from design through dive-in",
] as const;

export function WhyChooseForm() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
      <span className="pointer-events-none absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />
      <span className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Intro column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="lg:sticky lg:top-28 lg:pt-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-pool)]/20 bg-[var(--color-pool)]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pool)]" />
              Let&apos;s talk
            </span>
            <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.05] text-[var(--color-navy)] md:text-5xl">
              See the difference for{" "}
              <span className="italic text-[var(--color-pool)]">yourself</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 md:text-lg">
              Request your free home quote and we&apos;ll show you exactly how our
              process keeps your build on time, on budget, and stress-free.
            </p>

            <ul className="mt-9 space-y-3">
              {POINTS.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3.5 text-sm font-medium text-slate-700 shadow-[0_10px_30px_-22px_rgba(0,55,73,0.5)] backdrop-blur-sm transition-colors hover:border-[var(--color-pool)]/30"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/10 text-[var(--color-pool)]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-[0_14px_40px_-28px_rgba(0,55,73,0.6)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-navy)] text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Prefer to talk now?
                </p>
                <a
                  href={PHONE_HREF}
                  className="text-lg font-bold text-[var(--color-navy)] transition-colors hover:text-[var(--color-pool)]"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Shared quote form */}
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
