"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { POOL_FEATURES, type PoolFeature } from "../../../../lib/pool-features";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Single-page pool-features catalog. All features live on one route, but only
 * ONE feature is visible at a time. The top grid is a tab strip - clicking a
 * card swaps the active feature below (no route change, no long scroll).
 */
export function ConsolidatedFeaturesPage() {
  const [activeSlug, setActiveSlug] = useState<string>(POOL_FEATURES[0].slug);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const active =
    POOL_FEATURES.find((f) => f.slug === activeSlug) ?? POOL_FEATURES[0];
  const activeIndex = POOL_FEATURES.findIndex((f) => f.slug === active.slug);

  // On hash change (browser back/forward or direct link), sync the active feature.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && POOL_FEATURES.some((f) => f.slug === hash)) {
        setActiveSlug(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    // Update the hash for shareable links without triggering a full scroll jump.
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${slug}`);
    }
    // Smooth-scroll the newly opened feature block into view.
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main className="bg-white">
      <Hero />
      <FeatureGridNav activeSlug={active.slug} onSelect={handleSelect} />

      <div ref={detailRef} className="scroll-mt-24 py-16 md:py-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
          >
            <FeatureBlock
              feature={active}
              index={activeIndex}
              onExpandImage={(src, alt) => setLightbox({ src, alt })}
            />
          </motion.div>
        </AnimatePresence>

        <FeaturePager activeIndex={activeIndex} onSelect={handleSelect} />
      </div>

      <ClosingCta />
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </main>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48">
      <div className="absolute inset-0 -z-10">
        <Image
          src={POOL_FEATURES[0].heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/80 via-[var(--color-navy-deep)]/70 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(0,124,182,0.35),transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-8 text-center md:px-10 md:pb-20 md:pt-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
        >
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          Pool Features
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] mx-auto mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
        >
          Every custom pool feature{" "}
          <span className="italic text-[var(--color-gold-light)]">we build</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          Waterfalls, spillways, fire bowls, swim-up bars, custom mosaics - every
          option laid out on one page. Pick any feature below to jump to it.
        </motion.p>
      </div>
    </section>
  );
}

/* -------------------- Feature Grid Nav -------------------- */

function FeatureGridNav({
  activeSlug,
  onSelect,
}: {
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <section className="relative bg-slate-50 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
              Pick a feature
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-3 text-2xl font-extrabold leading-tight text-[var(--color-navy-deep)] md:text-3xl">
              {POOL_FEATURES.length} custom features to choose from
            </h2>
          </div>
        </div>

        <ul
          role="tablist"
          aria-label="Custom pool features"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5"
        >
          {POOL_FEATURES.map((feature, i) => {
            const isActive = feature.slug === activeSlug;
            return (
              <motion.li
                key={feature.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.03, ease }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="active-feature-panel"
                  onClick={() => onSelect(feature.slug)}
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white text-left shadow-[0_10px_30px_-18px_rgba(0,55,73,0.35)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] focus-visible:ring-offset-2 ${
                    isActive
                      ? "-translate-y-0.5 border-[var(--color-pool)] shadow-[0_22px_50px_-20px_rgba(0,124,182,0.55)] ring-2 ring-[var(--color-pool)]/40"
                      : "border-slate-200/80 hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:shadow-[0_18px_40px_-18px_rgba(0,124,182,0.35)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={feature.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 50vw"
                      className={`object-cover transition-transform duration-700 ${
                        isActive ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    />
                    {isActive ? (
                      <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-[var(--color-pool)] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
                        Viewing
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-3.5 md:p-4">
                    <p
                      className={`font-[family-name:var(--font-display)] text-[15px] font-extrabold leading-tight ${
                        isActive ? "text-[var(--color-pool-deep)]" : "text-[var(--color-navy-deep)]"
                      }`}
                    >
                      {feature.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-slate-500">
                      {feature.tagline}
                    </p>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                        isActive ? "text-[var(--color-pool-deep)]" : "text-[var(--color-pool)]"
                      }`}
                    >
                      {isActive ? "Currently viewing" : "View"}
                      {!isActive ? (
                        <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* -------------------- Prev/Next Pager -------------------- */

function FeaturePager({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (slug: string) => void;
}) {
  const prev = activeIndex > 0 ? POOL_FEATURES[activeIndex - 1] : null;
  const next =
    activeIndex < POOL_FEATURES.length - 1 ? POOL_FEATURES[activeIndex + 1] : null;
  if (!prev && !next) return null;

  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 md:mt-20 md:px-10">
      <div className="grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2 sm:gap-4">
        {prev ? (
          <button
            type="button"
            onClick={() => onSelect(prev.slug)}
            className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:shadow-[0_18px_40px_-20px_rgba(0,124,182,0.4)]"
          >
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-slate-100 text-[var(--color-navy-deep)] transition-colors group-hover:bg-[var(--color-pool)]/10 group-hover:text-[var(--color-pool)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 -scale-x-100">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Previous feature</p>
              <p className="truncate font-display text-[14px] font-extrabold text-[var(--color-navy-deep)] group-hover:text-[var(--color-pool)]">
                {prev.name}
              </p>
            </div>
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button
            type="button"
            onClick={() => onSelect(next.slug)}
            className="group flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/40 hover:shadow-[0_18px_40px_-20px_rgba(0,124,182,0.4)]"
          >
            <div className="min-w-0">
              <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-400">Next feature</p>
              <p className="truncate font-display text-[14px] font-extrabold text-[var(--color-navy-deep)] group-hover:text-[var(--color-pool)]">
                {next.name}
              </p>
            </div>
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-slate-100 text-[var(--color-navy-deep)] transition-colors group-hover:bg-[var(--color-pool)]/10 group-hover:text-[var(--color-pool)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

/* -------------------- Feature Block -------------------- */

function FeatureBlock({
  feature,
  index,
  onExpandImage,
}: {
  feature: PoolFeature;
  index: number;
  onExpandImage: (src: string, alt: string) => void;
}) {
  const flipped = index % 2 === 1;
  return (
    <section
      id="active-feature-panel"
      role="tabpanel"
      aria-label={feature.name}
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section number + name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-10 flex items-baseline gap-5"
        >
          <span className="font-[family-name:var(--font-display)] text-[38px] font-black leading-none text-[var(--color-pool)]/15 md:text-[48px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
              Feature {index + 1} of {POOL_FEATURES.length}
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-2 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              {feature.name}
            </h2>
          </div>
        </motion.div>

        {/* Content + hero image */}
        <div className={`grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center ${flipped ? "lg:[&>:first-child]:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: flipped ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-[24px] shadow-[0_28px_60px_-24px_rgba(0,55,73,0.4)] ring-1 ring-black/5"
          >
            <button
              type="button"
              onClick={() => onExpandImage(feature.heroImage, feature.name)}
              aria-label={`Expand image of ${feature.name}`}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)]"
            >
              <Image
                src={feature.heroImage}
                alt={feature.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="absolute bottom-4 left-5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/90">
                {feature.tagline}
              </p>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: flipped ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            <p className="text-[15.5px] leading-relaxed text-slate-700 md:text-[16px]">
              {feature.body}
            </p>

            {feature.variants && feature.variants.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {feature.variants.map((v) => (
                  <li key={v.title} className="flex items-start gap-3">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-1 h-4 w-4 flex-none text-[var(--color-pool)]"
                    >
                      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                      <path
                        d="M8 12.5l2.5 2.5L16 9"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] leading-snug text-slate-700">
                      <span className="font-bold text-[var(--color-navy-deep)]">{v.title}.</span>{" "}
                      {v.body}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={QUOTE_HREF}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_28px_-8px_rgba(0,124,182,0.6)] transition-all hover:-translate-y-0.5"
              >
                Add this to my design
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] transition-colors hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
              >
                Or call {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Gallery strip */}
        {feature.gallery.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {feature.gallery.slice(0, 4).map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_14px_30px_-20px_rgba(0,55,73,0.4)]"
              >
                <button
                  type="button"
                  onClick={() => onExpandImage(img.src, img.alt)}
                  aria-label={`Expand image: ${img.alt}`}
                  className="block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 22vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </motion.figure>
            ))}
          </div>
        ) : null}

        {/* Testimonials marquee */}
        <FeatureTestimonials feature={feature} />
      </div>
    </section>
  );
}

/* -------------------- Testimonials Marquee -------------------- */

function FeatureTestimonials({ feature }: { feature: PoolFeature }) {
  if (feature.testimonials.length === 0) return null;
  // Duplicate so translation from 0 to -50% loops seamlessly.
  const track = [...feature.testimonials, ...feature.testimonials];
  // Stagger the animation duration slightly per feature so they don't feel identical.
  const duration = 26 + (feature.testimonials.length * 4);

  return (
    <div className="mt-12">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]">
        What customers say about this feature
      </p>
      <div
        className="group relative mt-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <motion.ul
          aria-label={`Customer reviews mentioning ${feature.name}`}
          className="flex w-max gap-4 md:gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {track.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(0,55,73,0.4)] sm:w-[340px] md:p-5"
            >
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-yellow-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-2.5 text-[13.5px] leading-relaxed text-slate-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-[11px] font-bold text-white">
                  {initials(t.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[12.5px] font-extrabold leading-tight text-[var(--color-navy-deep)]">
                    {t.name}
                  </p>
                  {t.location ? (
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {t.location}
                    </p>
                  ) : null}
                </div>
              </figcaption>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

/* -------------------- Closing CTA -------------------- */

function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-gold-light)]">
          Ready when you are
        </p>
        <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-5xl">
          Mix, match, and make it{" "}
          <span className="italic text-[var(--color-gold-light)]">yours</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Every one of these features is fully customizable. Tell us which ones
          caught your eye and we&apos;ll design them into your yard.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href={QUOTE_HREF}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5"
          >
            Get a free pool quote
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z. ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/* -------------------- Lightbox -------------------- */

function Lightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/30 transition-colors hover:bg-white/20 md:right-6 md:top-6"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

