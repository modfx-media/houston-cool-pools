"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LP_TYP_GALLERY, LP_TESTIMONIALS } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * TYP recent-work gallery. Horizontal auto-scrolling strip (marquee-style
 * continuous scroll, pauses on hover) with prev/next arrow controls for
 * manual navigation. Uses the native scroll container + `scrollBy` so the
 * behavior is smooth on both desktop and touch devices.
 */
export function TypGallery() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Card width (px) used by the arrow controls + auto-scroll increment.
  const CARD_STEP = 340;

  // Reset scroll to 0 (loop) when reaching the end.
  const autoScrollTick = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Halfway point of the doubled track = end of the "original" list.
    const halfway = el.scrollWidth / 2;
    if (el.scrollLeft >= halfway - 2) {
      el.scrollTo({ left: 0, behavior: "auto" });
    } else {
      el.scrollBy({ left: 1, behavior: "auto" });
    }
  }, []);

  // Continuous ~60fps auto-scroll (paused while hovering OR while the
  // lightbox is open).
  useEffect(() => {
    if (isHovering || lightboxIndex !== null) return;
    const id = window.setInterval(autoScrollTick, 24);
    return () => window.clearInterval(id);
  }, [isHovering, lightboxIndex, autoScrollTick]);

  const scrollPrev = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // If at the very start, jump to the end of the "original" list so the
    // user can go "backwards" through the whole loop.
    if (el.scrollLeft <= 0) {
      el.scrollTo({ left: el.scrollWidth / 2 - CARD_STEP, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -CARD_STEP, behavior: "smooth" });
    }
  }, []);

  const scrollNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: CARD_STEP, behavior: "smooth" });
  }, []);

  // Lightbox controls (navigate through the original list, not the doubled one).
  const total = LP_TYP_GALLERY.length;
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % total)),
    [total],
  );
  const lightboxPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total)),
    [total],
  );

  // Keyboard nav + body-scroll lock while lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, lightboxNext, lightboxPrev]);

  // Duplicate the list so the scroll can loop seamlessly.
  const items = [...LP_TYP_GALLERY, ...LP_TYP_GALLERY];

  return (
    <section className="bg-[#0a1628] py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00b4d8]">
            Recent Builds
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Take a look at some of our recent work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#94a3b8]">
            A live scroll through custom gunite pools we&apos;ve built for
            Houston families - hover to pause, or use the arrows to navigate.
          </p>
        </div>

        {/* ─── Horizontal scroller + arrow controls ─── */}
        <div
          className="relative mt-10"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Edge fade masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a1628] to-transparent sm:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a1628] to-transparent sm:w-24"
          />

          {/* Prev arrow */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous images"
            className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#0f2035]/90 text-white backdrop-blur transition hover:border-[#00b4d8]/60 hover:bg-[#00b4d8]/20 sm:left-4 sm:h-12 sm:w-12"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next images"
            className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#0f2035]/90 text-white backdrop-blur transition hover:border-[#00b4d8]/60 hover:bg-[#00b4d8]/20 sm:right-4 sm:h-12 sm:w-12"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Scroll track */}
          <div
            ref={scrollerRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: "auto" }}
          >
            {items.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i % total)}
                aria-label="View larger image"
                className="group relative aspect-[4/3] w-[260px] flex-none cursor-zoom-in overflow-hidden rounded-2xl border border-white/5 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] transition-all hover:border-[#00b4d8]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4d8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628] sm:w-[320px] lg:w-[360px]"
              >
                <Image
                  src={src}
                  alt="Houston Cool Pools recent work"
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                {/* Zoom-in indicator on hover */}
                <div className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#0a1628] opacity-0 shadow-md transition group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M15 3h6v6h-2V6.41l-4.29 4.3-1.42-1.42L17.59 5H15V3zM3 15h2v2.59l4.29-4.3 1.42 1.42L6.41 19H9v2H3v-6z" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-[#94a3b8]">
          These are real pools we&apos;ve built for Houston families. Yours
          could be next.
        </p>
      </div>

      {/* ────────────────────── Lightbox ────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null ? (
          <motion.div
            key="typ-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Larger view of recent pool"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lightboxPrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current sm:h-6 sm:w-6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lightboxNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current sm:h-6 sm:w-6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </>
            ) : null}

            <motion.div
              key={LP_TYP_GALLERY[lightboxIndex]}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
              className="relative mx-4 h-[75vh] w-full max-w-6xl sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={LP_TYP_GALLERY[lightboxIndex]}
                alt="Houston Cool Pools recent work"
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                {lightboxIndex + 1} / {total}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#fbbf24]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current"
        >
          <path d="M12 2l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 16.9l-5.9 3.1L7.4 13.4 2.4 8.8l6.7-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TypTestimonials() {
  const items = LP_TESTIMONIALS;
  return (
    <section className="bg-[#0f2035] py-14 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 xl:px-20">
        <h2 className="text-center font-display text-3xl font-extrabold text-white sm:text-4xl">
          Loved by{" "}
          <span className="text-[#00b4d8]">Houston Homeowners</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#112240] p-6"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-[#cbd5e1]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-white/5 pt-4 text-sm">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00b4d8]">
                  Verified Customer
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
