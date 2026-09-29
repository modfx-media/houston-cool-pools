"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  SEQUENCE_PAGES,
  type SequencePage,
} from "../../../../lib/construction-sequence";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/** Rising-bubble motion decorations for the navy hero. */
const BUBBLES = [
  { left: "6%", size: 15, delay: 0, dur: 11 },
  { left: "18%", size: 9, delay: 1.4, dur: 13 },
  { left: "29%", size: 21, delay: 0.6, dur: 12 },
  { left: "41%", size: 11, delay: 2.2, dur: 14 },
  { left: "55%", size: 7, delay: 1, dur: 9 },
  { left: "67%", size: 18, delay: 2.8, dur: 12 },
  { left: "79%", size: 10, delay: 0.4, dur: 15 },
  { left: "90%", size: 23, delay: 1.8, dur: 11 },
];

export type ConstructionSequencePageProps = {
  page: SequencePage;
  total: number;
  prev: SequencePage | null;
  next: SequencePage | null;
};

export function ConstructionSequencePage({
  page,
  total,
  prev,
  next,
}: ConstructionSequencePageProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  const { scrollYProgress: pageProgress } = useScroll();

  const journey = total > 1 ? (page.index - 1) / (total - 1) : 0;

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.32),transparent_62%)]" />
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-[var(--color-pool)]/20 blur-[150px]"
        />
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[150px]"
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {BUBBLES.map((b, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full border border-white/20 bg-white/5"
              style={{ left: b.left, width: b.size, height: b.size }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -460, opacity: [0, 0.7, 0] }}
              transition={{
                duration: b.dur,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36"
        >
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/pool-information" className="transition hover:text-white">
              Pool Information
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">Construction Sequence</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-6 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-light)]"
          >
            Pool Construction Sequence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            {page.label}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-6 max-w-3xl text-base text-white/75 sm:text-lg"
          >
            A step-by-step walkthrough of how Houston Cool Pools builds your
            custom backyard pool - from the first stake in the ground to the
            first splash.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70"
          >
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-semibold uppercase tracking-[0.18em] text-white/80">
              Step {page.index} of {total}
            </span>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5">
              {page.label}
            </span>
          </motion.div>
        </motion.div>

        {/* SVG wave divider */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-white"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 40 C 240 80, 480 0, 720 40 C 960 80, 1200 0, 1440 40 L 1440 80 L 0 80 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* ===== Sticky page-progress bar ===== */}
      <div className="sticky top-[64px] z-30 -mt-1 h-1 w-full bg-white md:top-[72px]">
        <motion.div
          style={{ scaleX: pageProgress, transformOrigin: "0% 50%" }}
          className="h-full w-full bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-pool)]"
        />
      </div>

      {/* ===== Stepper ===== */}
      <section
        aria-label="Construction sequence steps"
        className="border-b border-slate-200 bg-white py-10"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="relative">
            {/* Track (base) */}
            <div className="absolute left-0 right-0 top-4 h-[2px] rounded-full bg-slate-200" />
            {/* Track (progress) */}
            <div
              className="absolute left-0 top-4 h-[2px] rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-gold-light)]"
              style={{ width: `${journey * 100}%` }}
            />

            <ol className="relative flex items-start justify-between gap-2">
              {SEQUENCE_PAGES.map((p) => {
                const isActive = p.index === page.index;
                const isDone = p.index < page.index;
                return (
                  <li
                    key={p.slug}
                    className="flex min-w-0 flex-1 flex-col items-center text-center"
                  >
                    <Link
                      href={`/${p.slug}`}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative flex flex-col items-center"
                    >
                      <span
                        className={
                          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[11px] font-bold transition " +
                          (isActive
                            ? "border-[var(--color-pool)] bg-[var(--color-pool)] text-white shadow-lg shadow-[var(--color-pool)]/40"
                            : isDone
                              ? "border-[var(--color-pool)] bg-white text-[var(--color-pool)]"
                              : "border-slate-300 bg-white text-slate-500 group-hover:border-[var(--color-pool)] group-hover:text-[var(--color-pool)]")
                        }
                      >
                        {p.index}
                      </span>
                      <span
                        className={
                          "mt-3 hidden text-[11px] font-semibold uppercase tracking-[0.12em] transition sm:block " +
                          (isActive
                            ? "text-[var(--color-navy-deep)]"
                            : "text-slate-500 group-hover:text-[var(--color-navy-deep)]")
                        }
                      >
                        {p.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className="relative bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="space-y-14 md:space-y-16">
            {page.steps.map((step, i) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] md:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy-deep)] font-display text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[var(--color-navy-deep)] sm:text-3xl">
                    {step.title}
                  </h2>
                </div>

                {step.image && (
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700 sm:text-base">
                  {step.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </motion.article>
            ))}

            {page.steps.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                Content for this step is coming soon.
              </div>
            )}
          </div>

          {/* ===== Prev / Next ===== */}
          <nav
            aria-label="Sequence pagination"
            className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2"
          >
            {prev ? (
              <Link
                href={`/${prev.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:shadow-md"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  ← Previous step
                </span>
                <span className="mt-2 font-display text-lg font-bold text-[var(--color-navy-deep)] transition group-hover:text-[var(--color-pool)]">
                  {prev.index}. {prev.label}
                </span>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {next ? (
              <Link
                href={`/${next.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:shadow-md"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Next step →
                </span>
                <span className="mt-2 font-display text-lg font-bold text-[var(--color-navy-deep)] transition group-hover:text-[var(--color-pool)]">
                  {next.index}. {next.label}
                </span>
              </Link>
            ) : null}
          </nav>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,124,182,0.35),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Ready to start your build?
          </h2>
          <p className="max-w-2xl text-white/75">
            Talk to Houston Cool Pools about your custom backyard project. We&apos;ll
            walk you through every step of the construction sequence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-navy-deep)] shadow-lg transition hover:brightness-110"
            >
              Request a Free Quote
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/[0.12]"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
