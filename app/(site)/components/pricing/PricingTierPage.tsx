"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CountUp } from "../why-choose/CountUp";
import { ContactFormSection } from "../contact/ContactFormSection";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../../lib/navigation";
import {
  POOL_PRICING_TIERS,
  findTier,
  type PoolPricingTier,
  type PricingImage,
} from "../../../../lib/pool-pricing";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 30, suffix: "+", label: "Years Building" },
  { value: 1600, suffix: "+", label: "Pools Built" },
  { value: 100, suffix: "%", label: "On-Budget" },
  { value: 6, label: "Areas Served" },
];

/**
 * Single-page pricing catalog. All 5 tiers live in `lib/pool-pricing.ts` and
 * are swapped in client-side when the user clicks a price-range pill - no
 * route reload, no scroll-to-top. Direct visits to /pricing-XX-YY still work
 * (the corresponding tier is initially active) and the URL is kept in sync
 * via history.replaceState as the visitor switches tiers.
 */
export function PricingTierPage({ activeHref }: { activeHref: string }) {
  const initial = findTier(activeHref);
  const [tier, setTier] = useState<PoolPricingTier>(initial);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openAt = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () =>
      setLightboxIndex((cur) =>
        cur === null ? null : (cur - 1 + tier.images.length) % tier.images.length,
      ),
    [tier.images.length],
  );
  const goNext = useCallback(
    () =>
      setLightboxIndex((cur) =>
        cur === null ? null : (cur + 1) % tier.images.length,
      ),
    [tier.images.length],
  );

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  /** Switch tier without navigating: update state + URL (no scroll reset). */
  const selectTier = useCallback((next: PoolPricingTier) => {
    if (next.slug === tier.slug) return;
    setTier(next);
    setLightboxIndex(null);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", next.href);
    }
  }, [tier.slug]);

  return (
    <>
      {/* ----- Hero ----- */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-24 text-white md:pt-28 lg:pt-32">
        {/* Real project photo background - crossfades between tiers */}
        <div className="absolute inset-0 -z-20">
          <AnimatePresence initial={false}>
            <motion.div
              key={tier.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={tier.heroImage}
                alt="Houston Cool Pools custom pool project"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-[var(--color-navy-deep)]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/70 via-[var(--color-navy-deep)]/85 to-[var(--color-navy-deep)]" />
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,124,182,0.32),transparent_60%)]" />
          <motion.div
            aria-hidden
            className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[var(--color-pool)]/15 blur-[160px]"
            animate={{ x: [0, 60, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-gold-light)]/15 blur-[160px]"
            animate={{ x: [0, -50, 0], opacity: [0.6, 0.35, 0.6] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-10 pt-6 text-center md:px-10 md:pb-12 md:pt-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
          >
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Custom Pool Pricing
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-[family-name:var(--font-display)] mx-auto mt-5 text-4xl leading-[1.04] tracking-tight md:text-5xl lg:text-6xl"
          >
            Quality Pools.{" "}
            <span className="italic text-[var(--color-gold-light)]">Transparent Pricing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mx-auto mt-6 text-base leading-relaxed text-white/75 md:text-lg"
          >
            Every backyard is unique, and so is every pool. While the final
            investment depends on your design, size, and custom features,
            we&apos;ve provided general pricing ranges to help you begin planning
            with confidence. Our team will work with you to create a pool that
            fits both your vision and your budget.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            key={`currently-${tier.slug}`}
            className="mt-8 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-light)]"
          >
            Currently viewing &middot;{" "}
            <span className="text-white/85">{tier.heading}</span>
          </motion.p>
        </div>

        {/* ----- Compact stats ----- */}
        <div className="relative mx-auto max-w-4xl px-6 pb-10 md:px-10 md:pb-14">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3"
          >
            {STATS.map((s) => (
              <motion.li
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center backdrop-blur-md md:px-4"
              >
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="font-[family-name:var(--font-display)] block text-xl text-white md:text-2xl"
                />
                <span className="mt-1 block text-[9.5px] font-bold uppercase tracking-[0.16em] text-white/55">
                  {s.label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ----- Price Range Switcher (sticky, client-side only, no route change) ----- */}
      <div className="sticky top-[64px] z-30 border-y border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/95 shadow-[0_10px_28px_-18px_rgba(0,55,73,0.4)] backdrop-blur-xl md:top-[72px]">
        <div className="relative mx-auto max-w-6xl px-6 py-5 md:px-10 md:py-6">
          {/* Prompt line above the pills */}
          <div className="mb-3.5 flex items-center justify-center gap-2 md:mb-4">
            <motion.span
              aria-hidden
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[var(--color-pool)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            <p className="font-[family-name:var(--font-display)] text-[13px] font-extrabold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] sm:text-sm md:tracking-[0.24em]">
              Tap a range to explore
            </p>
            <motion.span
              aria-hidden
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[var(--color-pool)]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </div>

          <nav
            aria-label="Pool pricing tiers"
            className="flex items-stretch justify-center gap-2 overflow-x-auto pb-1 sm:gap-2.5 md:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {POOL_PRICING_TIERS.map((t) => {
              const active = t.slug === tier.slug;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => selectTier(t)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.14em] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] focus-visible:ring-offset-2 sm:px-5 sm:py-3 sm:text-xs ${
                    active
                      ? "-translate-y-0.5 bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-[0_16px_36px_-12px_rgba(0,124,182,0.75)] ring-2 ring-[var(--color-pool)]/25 ring-offset-2 ring-offset-white"
                      : "border-2 border-slate-200 bg-white text-slate-600 shadow-[0_6px_18px_-10px_rgba(0,55,73,0.25)] hover:-translate-y-0.5 hover:border-[var(--color-pool)]/60 hover:bg-[var(--color-pool)]/5 hover:text-[var(--color-pool-deep)] hover:shadow-[0_14px_28px_-12px_rgba(0,124,182,0.4)]"
                  }`}
                >
                  {/* Active-state check icon + soft pulse ring */}
                  {active ? (
                    <>
                      <motion.span
                        aria-hidden
                        animate={{
                          scale: [1, 1.35, 1],
                          opacity: [0.55, 0, 0.55],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="pointer-events-none absolute inset-0 rounded-full bg-[var(--color-pool)]/40"
                      />
                      <span className="relative grid h-4 w-4 place-items-center rounded-full bg-white/25">
                        <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 text-white">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </>
                  ) : null}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ----- Gallery (single flat grid, swaps in place on tier change) ----- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 px-6 py-16 md:px-10 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--color-pool)]/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--color-gold-light)]/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            key={`heading-${tier.slug}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
              <span className="h-px w-8 bg-[var(--color-pool)]/50" />
              Our Work
              <span className="h-px w-8 bg-[var(--color-pool)]/50" />
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              {tier.sectionHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {tier.body}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={`gallery-${tier.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
              className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {tier.images.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => openAt(i)}
                    aria-label={`Enlarge pool photo ${i + 1}`}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-[0_14px_36px_-22px_rgba(0,55,73,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-24px_rgba(0,124,182,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[var(--color-navy-deep)] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                          <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>

      {/* ----- Budget-Guarantee Video ----- */}
      <BudgetGuaranteeVideo />

      {/* ----- Financing Callout ----- */}
      <FinancingCallout />

      {/* ----- Contact Form ----- */}
      <ContactFormSection />

      {/* ----- Lightbox ----- */}
      <Lightbox
        images={tier.images}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
}

/* -------------------- Lightbox -------------------- */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: PricingImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-navy-deep)]/95 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Pool photo viewer"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 md:left-6"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 md:right-6"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : null}

          <motion.div
            key={`lightbox-${index}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-2xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="90vw"
              priority
              className="object-contain"
            />
          </motion.div>

          <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
            {index + 1} / {images.length}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------- Financing -------------------- */

function FinancingCallout() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-[0_28px_60px_-30px_rgba(0,55,73,0.35)] md:p-12">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
          />
          <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
                Pool Financing
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
                Don&rsquo;t let budget hold back your{" "}
                <span className="italic text-[var(--color-pool)]">dream backyard</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 md:text-base">
                Houston Cool Pools works with lending partners offering flexible
                pool-financing programs. Soft credit pulls, high approval rates,
                fast funding, and veteran / military-family discounts - all with
                5-star rated customer service.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  "Soft credit pull (no score impact)",
                  "High approval rates",
                  "Fast funding, straight to build",
                  "Veteran & military-family discounts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13.5px] leading-snug text-slate-700">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 flex-none text-[var(--color-pool)]">
                      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/poolfinancing"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_28px_-8px_rgba(0,124,182,0.6)] transition-all hover:-translate-y-0.5"
                >
                  Learn about financing
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] transition-colors hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                >
                  Or call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] p-8 text-white shadow-[0_28px_60px_-24px_rgba(0,124,182,0.55)]">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
                  Payment example
                </p>
                <p className="font-[family-name:var(--font-display)] mt-4 text-5xl font-extrabold leading-none md:text-6xl">
                  $65K
                </p>
                <p className="mt-2 text-sm text-white/70">Starting pool build</p>
                <div className="mt-6 rounded-xl border border-white/15 bg-white/[0.06] p-4">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/70">
                    Financed as low as
                  </p>
                  <p className="font-[family-name:var(--font-display)] mt-2 text-3xl font-extrabold">
                    $499<span className="text-lg text-white/70">/mo*</span>
                  </p>
                  <p className="mt-1 text-[11px] text-white/55">*subject to credit approval</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Budget Guarantee Video -------------------- */

function BudgetGuaranteeVideo() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            Our promise
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            100% On-Budget{" "}
            <span className="italic text-[var(--color-pool)]">Guarantee</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Watch Mike explain why the price on your signed proposal is the price
            you pay - no change-order games, no last-minute surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="relative mt-10"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[24px] bg-gradient-to-br from-[var(--color-pool)] via-[var(--color-pool-deep)] to-[var(--color-navy-deep)] opacity-70"
          />
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-video w-full">
              <iframe
                title="Houston Cool Pools 100% On-Budget Guarantee"
                src="https://www.youtube-nocookie.com/embed/jMgjSEhaS70?rel=0&modestbranding=1&iv_load_policy=3"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
