"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Horizontal pill nav - one pill per destination page so a single pill
 * highlights as active (no duplicate-page pills).
 */
export const FEATURE_NAV: { label: string; href: string }[] = [
  { label: "Sheer Descents", href: "/custom-pool-features-1" },
  { label: "Scuppers & Spillways", href: "/features-2" },
  { label: "Bubblers", href: "/features-3" },
  { label: "Sun Shelf & Beach Entry", href: "/features-4" },
  { label: "Waterfalls & Grottos", href: "/features-5" },
  { label: "Tables & Barstools", href: "/features-6" },
  { label: "Decking", href: "/features-pool-decking" },
  { label: "Stepping Stones", href: "/features-7" },
  { label: "Slides", href: "/features-8" },
  { label: "Fire Features", href: "/features-9" },
  { label: "Custom Features", href: "/features-11" },
];

/** Rising-bubble decorations for the hero (water motion graph). */
const BUBBLES = [
  { left: "6%", size: 16, delay: 0, dur: 10 },
  { left: "14%", size: 9, delay: 1.4, dur: 13 },
  { left: "24%", size: 22, delay: 0.6, dur: 11 },
  { left: "37%", size: 11, delay: 2.2, dur: 14 },
  { left: "52%", size: 7, delay: 1, dur: 9 },
  { left: "63%", size: 18, delay: 2.8, dur: 12 },
  { left: "74%", size: 10, delay: 0.4, dur: 15 },
  { left: "85%", size: 24, delay: 1.8, dur: 11 },
  { left: "93%", size: 8, delay: 3.1, dur: 13 },
];

export type FeatureSection = {
  /** Optional sub-heading shown above the paragraph. */
  title?: string;
  /** Paragraph body. */
  body?: string;
  /** Optional bullet list. */
  bullets?: string[];
};

export type FeatureImage = { src: string; alt: string; caption?: string };

export type FeaturePageProps = {
  /** Hero eyebrow label, e.g. "POOL FEATURES". */
  eyebrow?: string;
  /** Hero H1 / feature name. */
  heading: string;
  /** Short lead-in shown under the H1. */
  intro?: string;
  /** Slug of the current page so its pill highlights. */
  activeHref: string;
  /** Hero background photo. */
  heroImage: string;
  /** Heading above the content/gallery block. */
  sectionHeading: string;
  /** One or more content sections (paragraphs / bullet lists). */
  sections: FeatureSection[];
  /** Gallery images for this feature. */
  images: FeatureImage[];
  /** Previous page in the pagination chain. */
  prevHref?: string;
  prevLabel?: string;
  /** Next page in the pagination chain. */
  nextHref?: string;
  nextLabel?: string;
};

export function FeaturePage({
  eyebrow = "Pool Features",
  heading,
  intro,
  activeHref,
  heroImage,
  sectionHeading,
  sections,
  images,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: FeaturePageProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Parallax for the hero photo.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "22%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.08, 1.22]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Page-wide scroll progress for the sticky nav indicator.
  const { scrollYProgress: pageProgress } = useScroll();

  const words = heading.split(" ");
  const leadSections = sections.filter((s) => !s.title);
  const cardSections = sections.filter((s) => s.title);
  const featuredGallery = images.length > 3;

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48"
      >
        {/* Parallax project photo */}
        <motion.div
          aria-hidden
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 -z-20"
        >
          <Image
            src={heroImage}
            alt="Houston Cool Pools custom pool feature"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[var(--color-navy-deep)]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/70 via-[var(--color-navy-deep)]/85 to-[var(--color-navy-deep)]" />
        </motion.div>

        {/* Motion glow orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(0,124,182,0.34),transparent_60%)]" />
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

        {/* Rising bubbles */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          {BUBBLES.map((b, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full border border-white/30 bg-white/5 backdrop-blur-[1px]"
              style={{ left: b.left, width: b.size, height: b.size }}
              animate={{ y: [40, -460], opacity: [0, 0.7, 0], scale: [0.6, 1, 0.85] }}
              transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative mx-auto max-w-5xl px-6 pb-28 pt-10 text-center md:px-10 md:pb-32 md:pt-14"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)] backdrop-blur"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            {eyebrow}
          </motion.p>

          {/* Word-by-word headline reveal */}
          <h1 className="font-[family-name:var(--font-display)] mx-auto mt-6 max-w-4xl text-4xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease }}
                  className="inline-block pr-[0.25em]"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {intro ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + words.length * 0.06, ease }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
            >
              {intro}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 + words.length * 0.06 }}
            className="mt-10 flex justify-center"
          >
            <motion.span
              aria-hidden
              className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-white/30 p-1.5"
            >
              <motion.span
                className="h-2 w-1 rounded-full bg-[var(--color-gold-light)]"
                animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Wave divider into the content */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 leading-[0]">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="h-[60px] w-full md:h-[90px]">
            <path
              d="M0,48 C240,96 480,8 720,40 C960,72 1200,16 1440,52 L1440,90 L0,90 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ===== Sticky pill nav ===== */}
      <div className="sticky top-[64px] z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl md:top-[72px]">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 md:px-10">
          <span className="hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 lg:inline">
            Explore:
          </span>
          <nav className="flex flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FEATURE_NAV.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative inline-flex shrink-0 items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all ${
                    active
                      ? "bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-[0_10px_24px_-10px_rgba(0,124,182,0.8)]"
                      : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:text-[var(--color-pool-deep)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Scroll progress indicator */}
        <motion.div
          aria-hidden
          style={{ scaleX: pageProgress }}
          className="h-0.5 origin-left bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-pool-deep)]"
        />
      </div>

      {/* ===== Content ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 px-6 py-20 md:px-10 md:py-28">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--color-pool)]/5 blur-3xl"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--color-gold-light)]/5 blur-3xl"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Section kicker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
              <span className="h-px w-8 bg-[var(--color-pool)]/50" />
              {sectionHeading}
              <span className="h-px w-8 bg-[var(--color-pool)]/50" />
            </p>
          </motion.div>

          {/* Lead paragraphs + spec bullets */}
          {leadSections.length > 0 ? (
            <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center">
              {leadSections.map((section, i) => (
                <div key={i}>
                  {section.body ? (
                    <motion.p
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease }}
                      className="text-lg leading-relaxed text-slate-600 md:text-xl"
                    >
                      {section.body}
                    </motion.p>
                  ) : null}

                  {section.bullets && section.bullets.length > 0 ? (
                    <motion.ul
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                      className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2"
                    >
                      {section.bullets.map((b) => (
                        <motion.li
                          key={b}
                          variants={{
                            hidden: { opacity: 0, y: 14 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                          }}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_-18px_rgba(0,55,73,0.4)]"
                        >
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)]">
                            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-white">
                              <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="text-sm font-medium text-slate-600">{b}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {/* Titled feature cards */}
          {cardSections.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {cardSections.map((section, i) => (
                <motion.article
                  key={section.title}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_12px_36px_-22px_rgba(0,55,73,0.4)] transition-shadow hover:shadow-[0_28px_56px_-30px_rgba(0,124,182,0.55)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-pool)]/5 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <span className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-pool)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] mt-2 text-xl text-[var(--color-navy-deep)] md:text-2xl">
                    {section.title}
                  </h3>
                  <span className="mt-3 block h-0.5 w-10 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-gold-light)] transition-all duration-500 group-hover:w-16" />
                  {section.body ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{section.body}</p>
                  ) : null}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-pool)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.article>
              ))}
            </motion.div>
          ) : null}

          {/* Gallery - featured-first mosaic */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="mt-16 grid grid-cols-2 gap-4 [grid-auto-rows:170px] sm:gap-5 lg:grid-cols-4 lg:[grid-auto-rows:210px]"
          >
            {images.map((img, i) => {
              const featured = featuredGallery && i === 0;
              return (
                <motion.figure
                  key={img.src}
                  variants={{
                    hidden: { opacity: 0, y: 28, scale: 0.97 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
                  }}
                  whileHover={{ y: -5 }}
                  className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_36px_-22px_rgba(0,55,73,0.4)] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,124,182,0.55)] ${
                    featured ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-[1100ms] group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/65 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-navy-deep)]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold-light)] backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
                    Houston Cool Pools
                  </span>
                  {img.caption ? (
                    <figcaption className="absolute inset-x-4 bottom-4 text-sm font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {img.caption}
                    </figcaption>
                  ) : (
                    <figcaption className="absolute inset-x-4 bottom-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.alt}
                    </figcaption>
                  )}
                </motion.figure>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Prev / Next pagination ===== */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-16 text-white md:px-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,124,182,0.28),transparent_65%)]" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
          {prevHref ? (
            <Link
              href={prevHref}
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 transition-transform group-hover:-translate-x-1">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">Previous</span>
                <span className="font-[family-name:var(--font-display)] mt-0.5 block text-lg text-white">
                  {prevLabel ?? "Previous Feature"}
                </span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}

          {nextHref ? (
            <Link
              href={nextHref}
              className="group flex items-center justify-end gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-right backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
            >
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">Next</span>
                <span className="font-[family-name:var(--font-display)] mt-0.5 block text-lg text-white">
                  {nextLabel ?? "Next Feature"}
                </span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 transition-transform group-hover:translate-x-1">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy)] px-6 py-20 text-white md:px-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
          <motion.div
            aria-hidden
            className="absolute -bottom-32 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-[var(--color-pool)]/15 blur-[150px]"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left"
        >
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
              Ready to add this feature to your pool?
            </h2>
            <p className="mt-3 text-white/70">
              Tell us your vision and we&rsquo;ll put together a custom quote.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
