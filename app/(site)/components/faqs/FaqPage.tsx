"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { FAQS, type Faq } from "../../../../lib/faqs";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/** Rising-bubble decorations for the hero (water motion graph). */
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

export type FaqPageProps = {
  /** Current FAQ. */
  faq: Faq;
  /** Zero-based position in the paginated chain. */
  index: number;
  /** Total number of FAQ pages. */
  total: number;
  /** Previous FAQ in the chain. */
  prev: Faq | null;
  /** Next FAQ in the chain. */
  next: Faq | null;
};

export function FaqPage({ faq, index, total, prev, next }: FaqPageProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  // Page-wide scroll progress for the sticky bar indicator.
  const { scrollYProgress: pageProgress } = useScroll();

  // Fraction of the FAQ journey completed (for the stepper fill).
  const journey = total > 1 ? index / (total - 1) : 0;

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/hd/feature-pool-3.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/72 to-[var(--color-navy-deep)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.32),transparent_62%)]" />
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-[var(--color-pool)]/20 blur-[150px]"
        />
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[150px]"
        />

        {/* Rising bubbles */}
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
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link
              href="/pool-information"
              className="transition-colors hover:text-white"
            >
              Pool Information
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[var(--color-gold-light)]">FAQs</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-8 text-[11px] font-bold uppercase tracking-[0.34em] text-[var(--color-pool)]"
          >
            Frequently Asked Questions
          </motion.p>

          {/* Word-by-word headline */}
          <h1 className="font-[family-name:var(--font-display)] mt-4 text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
            {"FAQs".split(" ").map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.28em] inline-block"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 + i * 0.07, ease }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-6 max-w-2xl text-base text-white/70 md:text-lg"
          >
            Real answers about building your custom gunite pool - from layout and
            excavation through start-up. Serving Houston, Tomball, Cypress and
            Spring, TX.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/65"
          >
            <span className="inline-flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl text-white">
                {index + 1}
              </span>
              of {total} questions
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl text-white">
                {faq.section}
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* Wave divider into content */}
        <div className="absolute inset-x-0 bottom-0 leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="h-[60px] w-full md:h-[90px]"
            fill="none"
          >
            <path
              d="M0 80L60 74.7C120 69 240 59 360 64C480 69 600 91 720 96C840 101 960 91 1080 77.3C1200 64 1320 48 1380 40L1440 32V120H0V80Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ===== Sticky progress bar ===== */}
      <div className="sticky top-[64px] z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl md:top-[72px]">
        <motion.span
          aria-hidden
          style={{ scaleX: pageProgress }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)]"
        />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 md:px-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Question {index + 1} / {total}
          </span>
          <span className="truncate text-sm font-semibold text-[var(--color-navy)]">
            {faq.section}
          </span>
        </div>
      </div>

      {/* ===== Stepper motion graph ===== */}
      <section className="bg-white pt-12 md:pt-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative min-w-[560px] md:min-w-0">
              {/* track */}
              <div className="absolute left-0 right-0 top-[11px] h-[3px] rounded-full bg-slate-200" />
              {/* animated fill */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: journey }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease }}
                style={{ originX: 0 }}
                className="absolute left-0 right-0 top-[11px] h-[3px] rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)]"
              />
              <ol className="relative flex justify-between">
                {FAQS.map((f, i) => {
                  const isActive = i === index;
                  const isDone = i < index;
                  return (
                    <li key={f.slug} className="flex flex-col items-center">
                      <Link
                        href={`/${f.slug}`}
                        aria-current={isActive ? "step" : undefined}
                        title={f.question}
                        className="group flex flex-col items-center"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.03, ease }}
                          className={`flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors ${
                            isActive
                              ? "border-[var(--color-pool-deep)] bg-[var(--color-pool-deep)] text-white shadow-[0_8px_20px_-6px_rgba(0,124,182,0.8)]"
                              : isDone
                                ? "border-[var(--color-pool)] bg-[var(--color-pool)] text-white"
                                : "border-slate-300 bg-white text-slate-400 group-hover:border-[var(--color-pool)]"
                          }`}
                        >
                          {i + 1}
                        </motion.span>
                        <span
                          className={`mt-2.5 hidden max-w-[88px] text-center text-[11px] font-bold uppercase leading-tight tracking-[0.04em] md:block ${
                            isActive
                              ? "text-[var(--color-pool-deep)]"
                              : "text-[var(--color-navy)]"
                          }`}
                        >
                          {f.section}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Main answer */}
          <div>
            <motion.article
              key={faq.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_30px_70px_-50px_rgba(0,55,73,0.55)] md:p-12"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-pool)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-pool-deep)]">
                {faq.section}
              </span>
              <h2 className="font-[family-name:var(--font-display)] mt-5 text-2xl leading-tight text-[var(--color-navy)] md:text-4xl">
                {faq.question}
              </h2>
              <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-slate-600 md:text-lg">
                {faq.answer}
              </p>
            </motion.article>

            {/* Prev / Next pagination */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/${prev.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:shadow-lg"
                >
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3 w-3 transition-transform group-hover:-translate-x-1"
                    >
                      <path
                        d="M19 12H5M11 19l-7-7 7-7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Previous
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[var(--color-navy)]">
                    {prev.question}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/${next.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 text-right transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:shadow-lg"
                >
                  <span className="flex items-center justify-end gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Next
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-[var(--color-navy)]">
                    {next.question}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          </div>

          {/* Sticky question index */}
          <aside className="lg:sticky lg:top-[120px] lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                All Questions
              </p>
              <ol className="mt-4 space-y-1">
                {FAQS.map((f, i) => {
                  const isActive = f.slug === faq.slug;
                  return (
                    <li key={f.slug}>
                      <Link
                        href={`/${f.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors ${
                          isActive
                            ? "bg-white text-[var(--color-pool-deep)] shadow-sm"
                            : "text-[var(--color-navy)] hover:bg-white hover:text-[var(--color-pool-deep)]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            isActive
                              ? "bg-[var(--color-pool-deep)] text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="leading-snug">{f.question}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[var(--color-navy-deep)] py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl"
          >
            Still have questions?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mx-auto mt-4 max-w-xl text-base text-white/70 md:text-lg"
          >
            Our team is happy to walk you through every stage of building your
            custom Houston pool. Reach out for a free, no-pressure estimate.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
