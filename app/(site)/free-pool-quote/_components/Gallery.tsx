"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { LP_GALLERY } from "../_lib/data";

const FILTERS = [
  "All",
  "Geometric",
  "Free Form",
  "Pool & Spa",
  "Resort Style",
  "Estate",
] as const;
type Filter = (typeof FILTERS)[number];

const ease = [0.22, 1, 0.36, 1] as const;

export function Gallery() {
  const [active, setActive] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      active === "All"
        ? LP_GALLERY
        : LP_GALLERY.filter((g) => g.category === active),
    [active],
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % items.length,
      ),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  // Keyboard nav + body-scroll lock while lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, close, next, prev]);

  // If filter changes while lightbox is open, close it (indices are stale).
  useEffect(() => {
    setLightboxIndex(null);
  }, [active]);

  const current = lightboxIndex === null ? null : items[lightboxIndex];

  return (
    <section className="bg-[#eef3f7] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00b4d8]"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="mt-3 font-display text-3xl font-extrabold text-[#0a1628] sm:text-5xl"
          >
            1,600+ pools built across{" "}
            <span className="text-[#00b4d8]">Houston</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600"
          >
            Browse a sample of the custom gunite pools we&apos;ve designed and
            built for Houston families.
          </motion.p>
        </div>

        <LayoutGroup>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition sm:text-sm ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-[#0a1628]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="absolute inset-0 rounded-full bg-[#00b4d8]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((g, i) => (
              <motion.button
                key={g.src}
                type="button"
                layout
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease }}
                aria-label={`View larger: ${g.alt}`}
                className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4d8] focus-visible:ring-offset-2"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                {/* Soft hover overlay + zoom hint (labels removed per LP spec) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/0 opacity-0 transition group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0a1628] opacity-0 shadow-md transition group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M15 3h6v6h-2V6.41l-4.29 4.3-1.42-1.42L17.59 5H15V3zM3 15h2v2.59l4.29-4.3 1.42 1.42L6.41 19H9v2H3v-6z" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Real Houston builds · 4 price tiers · 100% on-budget guarantee
          </p>
          <a
            href="#quote-form"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#00b4d8] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#00b4d8]/30 transition hover:bg-[#0a1628]"
          >
            See More of Our Work → Get a Free Quote
          </a>
        </div>
      </div>

      {/* ────────────────────── Lightbox ────────────────────── */}
      <AnimatePresence>
        {current && lightboxIndex !== null ? (
          <motion.div
            key="lp-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Larger view: ${current.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={close}
          >
            {/* Close button (top-right) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Prev button */}
            {items.length > 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current sm:h-6 sm:w-6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            ) : null}

            {/* Next button */}
            {items.length > 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current sm:h-6 sm:w-6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            ) : null}

            {/* Image */}
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
              className="relative mx-4 h-[75vh] w-full max-w-6xl sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
              {/* Position indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                {lightboxIndex + 1} / {items.length}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
