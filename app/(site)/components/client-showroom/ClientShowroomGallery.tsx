"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CLIENT_SHOWROOM_IMAGES } from "../../../../lib/client-showroom-images";

const ease = [0.22, 1, 0.36, 1] as const;
const PAGE_SIZE = 24;

export function ClientShowroomGallery() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = CLIENT_SHOWROOM_IMAGES.length;
  const visible = CLIENT_SHOWROOM_IMAGES.slice(0, visibleCount);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + total) % total)),
    [total]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % total)),
    [total]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const active = activeIndex !== null ? CLIENT_SHOWROOM_IMAGES[activeIndex] : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 py-20 md:px-10 md:py-28">
      <span className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />
      <span className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            The Showroom
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Every Photo, A Finished Backyard
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Tap any photo to view it full-size. This gallery grows with every pool we finish.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((img, index) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100 shadow-[0_14px_40px_-24px_rgba(0,55,73,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_-24px_rgba(0,124,182,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)]"
            >
              <Image
                src={img.src}
                alt={`Houston Cool Pools project photo ${index + 1}`}
                fill
                loading={index < 8 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {visibleCount < total ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, total))}
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-pool)]/40 bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-pool-deep)] shadow-[0_14px_36px_-20px_rgba(0,124,182,0.5)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-pool)] hover:text-white"
            >
              Load More Photos
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-white/80">
                {visibleCount} of {total}
              </span>
            </button>
          </div>
        ) : (
          <p className="mt-12 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            You&apos;ve reached the end - {total} photos
          </p>
        )}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm md:p-10"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Project photo viewer"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-3"
            >
              <div className="relative h-[75vh] w-[90vw] max-w-5xl overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={active.src}
                  alt={`Houston Cool Pools project photo ${(activeIndex ?? 0) + 1}`}
                  fill
                  sizes="92vw"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {(activeIndex ?? 0) + 1} / {total}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
