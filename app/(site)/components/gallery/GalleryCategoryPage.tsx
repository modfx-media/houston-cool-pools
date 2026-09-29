"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  QUOTE_HREF,
} from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Gallery collections - power the sticky top nav and the fixed right-side rail
 * so visitors can jump between collections (mirrors the pricing pages). `match`
 * is compared against the page's `category` prop to flag the active collection;
 * `slugs` lists every page in that collection for the rail's page dots.
 */
const GALLERY_CATEGORIES: {
  label: string;
  match: string;
  href: string;
  slugs: string[];
}[] = [
  {
    label: "Free Form",
    match: "Free Form Pools",
    href: "/gallery-free-form-pools-1",
    slugs: [
      "/gallery-free-form-pools-1",
      "/gallery-free-form-pools-2",
      "/gallery-free-form-pools-3",
      "/gallery-free-form-pools-4",
      "/gallery-free-form-pools-5",
    ],
  },
  {
    label: "Geometric",
    match: "Geometric Pools",
    href: "/geometric-pools-1",
    slugs: [
      "/geometric-pools-1",
      "/geometric-pools-2",
      "/geometric-pools-3",
      "/geometric-pools-4",
      "/geometric-pools-5",
      "/geometric-pools-6",
    ],
  },
  {
    label: "Fire Features",
    match: "Fireplaces & Fire Pits",
    href: "/fireplace-firepits-gallery-1",
    slugs: [
      "/fireplace-firepits-gallery-1",
      "/fireplace-firepits-gallery-2",
      "/fireplace-firepits-gallery-3",
    ],
  },
  {
    label: "Pool Decks",
    match: "Pool Deck Designs",
    href: "/pool-deck-1",
    slugs: ["/pool-deck-1", "/pool-deck-2", "/pool-deck-3", "/pool-deck-4"],
  },
  {
    label: "Outdoor",
    match: "Outdoor Structures",
    href: "/outdoor-structures-gallery-1",
    slugs: [
      "/outdoor-structures-gallery-1",
      "/outdoor-structures-gallery-2",
    ],
  },
  {
    label: "Commercial",
    match: "Commercial Projects",
    href: "/commercial-projects-gallery-1",
    slugs: ["/commercial-projects-gallery-1"],
  },
  {
    label: "Water Features",
    match: "Water Features",
    href: "/water-features-gallery-1",
    slugs: ["/water-features-gallery-1"],
  },
];

/** Rising-bubble decorations for the hero (water motion graph). */
const BUBBLES = [
  { left: "7%", size: 16, delay: 0, dur: 11 },
  { left: "16%", size: 9, delay: 1.4, dur: 13 },
  { left: "27%", size: 22, delay: 0.6, dur: 12 },
  { left: "39%", size: 11, delay: 2.2, dur: 14 },
  { left: "54%", size: 7, delay: 1, dur: 9 },
  { left: "66%", size: 18, delay: 2.8, dur: 12 },
  { left: "78%", size: 10, delay: 0.4, dur: 15 },
  { left: "88%", size: 24, delay: 1.8, dur: 11 },
  { left: "95%", size: 8, delay: 3.1, dur: 13 },
];

export type GalleryImage = { src: string; alt: string };

export type GalleryCategoryPageProps = {
  /** Eyebrow label above the H1, e.g. "Project Gallery". */
  eyebrow?: string;
  /** Breadcrumb + heading category label, e.g. "Free Form Pools". */
  category: string;
  /** Page H1 (may include "- Page N"). */
  heading: string;
  /** Short lead-in under the H1. */
  intro?: string;
  /** Gallery images served live from houstoncoolpools.com. */
  images: GalleryImage[];
  /** Previous page in the pagination chain. */
  prevHref?: string;
  prevLabel?: string;
  /** Next page in the pagination chain. */
  nextHref?: string;
  nextLabel?: string;
};

export function GalleryCategoryPage({
  eyebrow = "Project Gallery",
  category,
  heading,
  intro,
  images,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: GalleryCategoryPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const pathname = usePathname();

  // Parallax for the hero backdrop.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  // Page-wide scroll progress for the sticky nav indicator.
  const { scrollYProgress: pageProgress } = useScroll();

  const words = heading.split(" ");

  const activeCategory =
    GALLERY_CATEGORIES.find((c) => c.match === category) ?? null;
  const pageIndex = activeCategory ? activeCategory.slugs.indexOf(pathname) : -1;
  const pageCount = activeCategory ? activeCategory.slugs.length : 0;

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48"
      >
        {/* Gradient + glow orbs */}
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
            <Link href="/gallery" className="transition-colors hover:text-white">
              Gallery
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[var(--color-gold-light)]">{category}</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-8 text-[11px] font-bold uppercase tracking-[0.34em] text-[var(--color-pool)]"
          >
            {eyebrow}
          </motion.p>

          {/* Word-by-word headline */}
          <h1 className="font-[family-name:var(--font-display)] mt-4 max-w-4xl text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
            {words.map((w, i) => (
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

          {intro ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mt-6 max-w-2xl text-base text-white/70 md:text-lg"
            >
              {intro}
            </motion.p>
          ) : null}

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/65"
          >
            <span className="inline-flex items-center gap-2">
              <span className="font-[family-name:var(--font-display)] text-2xl text-white">
                {images.length}
              </span>
              project photos
            </span>
            {pageCount > 1 && pageIndex >= 0 ? (
              <span className="inline-flex items-center gap-2">
                <span className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {pageIndex + 1}
                </span>
                of {pageCount} in this collection
              </span>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </motion.div>

        {/* Wave divider into content */}
        <div className="absolute inset-x-0 bottom-0 leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[60px] w-full md:h-[90px]" fill="none">
            <path d="M0 80L60 74.7C120 69 240 59 360 64C480 69 600 91 720 96C840 101 960 91 1080 77.3C1200 64 1320 48 1380 40L1440 32V120H0V80Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ===== Sticky category nav (follows on scroll) ===== */}
      <div className="sticky top-[64px] z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl md:top-[72px]">
        {/* scroll progress line */}
        <motion.span
          aria-hidden
          style={{ scaleX: pageProgress }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)]"
        />
        <div className="mx-auto max-w-6xl px-6 py-3 md:px-10">
          {/* Row 1: category tabs */}
          <div className="flex items-center gap-3">
            <span className="hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 lg:inline">
              Browse by:
            </span>
            <nav
              aria-label="Gallery categories"
              className="flex flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {GALLERY_CATEGORIES.map((c) => {
                const isActive = c.match === category;
                return (
                  <Link
                    key={c.href}
                    href={c.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-[0_10px_24px_-10px_rgba(0,124,182,0.8)]"
                        : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:text-[var(--color-pool-deep)]"
                    }`}
                  >
                    {c.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Row 2: page pills for the active collection */}
          {activeCategory && activeCategory.slugs.length > 1 ? (
            <div className="mt-2.5 flex items-center gap-3 border-t border-slate-200/60 pt-2.5">
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {activeCategory.label} Galleries
              </span>
              <nav
                aria-label={`${activeCategory.label} pages`}
                className="flex flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {activeCategory.slugs.map((slug, i) => {
                  const onThisPage = slug === pathname;
                  return (
                    <Link
                      key={slug}
                      href={slug}
                      scroll={false}
                      aria-current={onThisPage ? "page" : undefined}
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                        onThisPage
                          ? "bg-[var(--color-navy-deep)] text-white shadow-[0_6px_16px_-6px_rgba(0,55,73,0.6)]"
                          : "border border-slate-200 bg-white text-slate-500 hover:-translate-y-0.5 hover:border-[var(--color-pool)]/50 hover:text-[var(--color-pool-deep)]"
                      }`}
                    >
                      {i + 1}
                    </Link>
                  );
                })}
                <span className="ml-1 shrink-0 text-[10px] font-semibold text-slate-400">
                  of {activeCategory.slugs.length}
                </span>
              </nav>
            </div>
          ) : null}
        </div>
      </div>

      {/* ===== Fixed side-rail (desktop) ===== */}
      <nav
        aria-label="Jump to gallery collection"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      >
        <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-[0_24px_60px_-28px_rgba(0,55,73,0.55)] backdrop-blur-xl">
          <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Collections
          </p>
          <ul className="relative flex flex-col gap-5">
            {/* vertical track line */}
            <span
              aria-hidden
              className="absolute left-[5px] bottom-2 top-2 w-px bg-slate-200"
            />
            {GALLERY_CATEGORIES.map((c) => {
              const isActive = c.match === category;
              return (
                <li key={c.href} className="relative">
                  <Link href={c.href} className="group flex items-center gap-3">
                    <span
                      className={`relative z-10 grid h-[11px] w-[11px] shrink-0 place-items-center rounded-full transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] ring-4 ring-[var(--color-pool)]/20"
                          : "bg-white ring-2 ring-slate-300 group-hover:ring-[var(--color-pool)]"
                      }`}
                    />
                    <span
                      className={`whitespace-nowrap text-xs font-bold tracking-wide transition-colors ${
                        isActive
                          ? "text-[var(--color-navy)]"
                          : "text-slate-400 group-hover:text-[var(--color-pool-deep)]"
                      }`}
                    >
                      {c.label}
                    </span>
                  </Link>

                  {/* Page dots for the active collection */}
                  {isActive && c.slugs.length > 1 ? (
                    <ul className="mt-3 ml-[2px] flex flex-col gap-2 border-l border-slate-200 pl-4">
                      {c.slugs.map((slug, i) => {
                        const onThisPage = slug === pathname;
                        return (
                          <li key={slug}>
                            <Link
                              href={slug}
                              scroll={false}
                              aria-current={onThisPage ? "page" : undefined}
                              className="group/sub flex items-center gap-2"
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full transition-all ${
                                  onThisPage
                                    ? "bg-[var(--color-pool)] ring-2 ring-[var(--color-pool)]/25"
                                    : "bg-slate-300 group-hover/sub:bg-[var(--color-pool)]/60"
                                }`}
                              />
                              <span
                                className={`text-[11px] font-semibold transition-colors ${
                                  onThisPage
                                    ? "text-[var(--color-pool-deep)]"
                                    : "text-slate-400 group-hover/sub:text-[var(--color-pool-deep)]"
                                }`}
                              >
                                Page {i + 1}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ===== Gallery grid ===== */}
      <main className="relative bg-white">
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
                <span className="h-px w-8 bg-[var(--color-pool)]/50" />
                {category}
              </p>
              <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl text-[var(--color-navy)] md:text-4xl">
                {images.length} project photo{images.length === 1 ? "" : "s"}
              </h2>
            </div>
            <p className="hidden text-sm text-slate-400 sm:block">
              Tap any photo to view full size
            </p>
          </motion.div>

          {/* Uniform grid - every card shares the same aspect ratio so rows stay aligned */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease }}
                className="group block overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)]"
              >
                <span className="relative block aspect-[4/3] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute right-3 top-3 inline-flex h-7 items-center rounded-full bg-[var(--color-navy-deep)]/70 px-2.5 text-[10px] font-bold tracking-[0.12em] text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy)] opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ===== Prev / Next pagination ===== */}
        {(prevHref || nextHref) && (
          <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {prevHref ? (
                <Link
                  href={prevHref}
                  scroll={false}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)]/5 text-[var(--color-navy)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Previous
                    </span>
                    <span className="mt-1 block font-[family-name:var(--font-display)] text-lg text-[var(--color-navy)]">
                      {prevLabel}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {nextHref ? (
                <Link
                  href={nextHref}
                  scroll={false}
                  className="group flex items-center justify-end gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:shadow-lg"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Next
                    </span>
                    <span className="mt-1 block font-[family-name:var(--font-display)] text-lg text-[var(--color-navy)]">
                      {nextLabel}
                    </span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)]/5 text-[var(--color-navy)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
            </div>
          </section>
        )}
      </main>

      {/* ===== Closing CTA ===== */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/15 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Inspired by what you see?
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight md:text-5xl">
            Let&apos;s build your{" "}
            <span className="italic text-[var(--color-gold-light)]">
              {category.toLowerCase()}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            Every Houston Cool Pool is custom designed for your backyard and
            budget - with our 100% on-budget guarantee.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-navy-deep)]/92 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setActive((p) => (p === null ? p : (p - 1 + images.length) % images.length));
              }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                width={1400}
                height={1050}
                unoptimized
                className="mx-auto h-auto max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-white/55">
                {active + 1} / {images.length}
              </p>
            </motion.div>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setActive((p) => (p === null ? p : (p + 1) % images.length));
              }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
