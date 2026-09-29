"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { GALLERY_TIERS, type GalleryPool } from "../../../../lib/gallery";

const ease = [0.22, 1, 0.36, 1] as const;

type FlatPool = GalleryPool & {
  tierId: string;
  tierLabel: string;
};

const ALL = "all" as const;

/**
 * Filter-driven gallery: a single uniform grid with sticky filter chips and
 * a click-to-zoom lightbox. Replaces the previous busy multi-section layout.
 */
export function GalleryFilterGrid() {
  // Flatten every photo (featured + supporting) and tag with tier metadata.
  const allPools = useMemo<FlatPool[]>(() => {
    return GALLERY_TIERS.flatMap((tier) => [
      { ...tier.featured, tierId: tier.id, tierLabel: tier.label },
      ...tier.pools.map((p) => ({
        ...p,
        tierId: tier.id,
        tierLabel: tier.label,
      })),
    ]);
  }, []);

  const [active, setActive] = useState<string>(ALL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const validTierIds = useMemo(
    () => new Set<string>([ALL, ...GALLERY_TIERS.map((t) => t.id)]),
    [],
  );

  // Reactively read ?tier=... from the URL so nav-dropdown deep links work,
  // whether the user lands on /gallery fresh or navigates between tiers
  // client-side while already on the page.
  const searchParams = useSearchParams();
  const urlTier = searchParams.get("tier");
  const skipNextScrollRef = useRef(false);

  useEffect(() => {
    const next = urlTier && validTierIds.has(urlTier) ? urlTier : ALL;
    setActive(next);

    // No ?tier=... in the URL (e.g. direct visit to /gallery, brand click,
    // or the Pool Gallery nav parent link) - keep the hero at the top.
    if (!urlTier) return;

    // Chip clicks update the URL themselves; we don't want that to jump the
    // page back up to the filter bar every time.
    if (skipNextScrollRef.current) {
      skipNextScrollRef.current = false;
      return;
    }

    // Scroll past the hero to the filter bar, accounting for the fixed
    // header height (top-16 mobile / top-20 desktop → 64 / 80 px).
    requestAnimationFrame(() => {
      const el = document.getElementById("gallery-filter-bar");
      if (!el) return;
      const headerOffset =
        typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
          ? 80
          : 64;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "auto" });
    });
  }, [urlTier, validTierIds]);

  // Keep the URL in sync so users can share/deep-link the current filter.
  // We use replaceState (not push) and set the skip flag so the URL sync
  // doesn't scroll-jump the page.
  const applyFilter = useCallback((next: string) => {
    skipNextScrollRef.current = true;
    setActive(next);
    const url = new URL(window.location.href);
    if (next === ALL) url.searchParams.delete("tier");
    else url.searchParams.set("tier", next);
    window.history.replaceState({}, "", url.toString());
  }, []);

  const visible = useMemo(
    () => (active === ALL ? allPools : allPools.filter((p) => p.tierId === active)),
    [active, allPools],
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () =>
      setLightboxIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length],
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + visible.length) % visible.length,
      ),
    [visible.length],
  );

  // Keyboard nav while lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, next, prev]);

  return (
    <>
      {/* ─── Sticky filter bar ─── */}
      <div
        id="gallery-filter-bar"
        className="sticky top-16 z-30 border-y border-[var(--color-navy-deep)]/10 bg-white/90 backdrop-blur-xl md:top-20"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3 md:px-10">
          <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-navy-deep)]/45 md:inline">
            Filter:
          </span>
          <FilterChip
            label="All Pools"
            count={allPools.length}
            active={active === ALL}
            onClick={() => applyFilter(ALL)}
          />
          {GALLERY_TIERS.map((t) => (
            <FilterChip
              key={t.id}
              label={t.label}
              count={1 + t.pools.length}
              active={active === t.id}
              onClick={() => applyFilter(t.id)}
            />
          ))}
        </div>
      </div>

      {/* ─── Grid ─── */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <motion.div
          layout
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((pool, i) => (
              <motion.button
                key={pool.src}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                transition={{
                  duration: 0.45,
                  ease,
                  delay: Math.min(i, 12) * 0.025,
                  layout: { duration: 0.4, ease },
                }}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-navy-deep)] text-left shadow-[0_18px_40px_-22px_rgba(0,55,73,0.45)] ring-1 ring-black/5 transition-all hover:shadow-[0_24px_50px_-20px_rgba(0,55,73,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pool)] focus-visible:ring-offset-2"
              >
                <Image
                  src={pool.src}
                  alt={pool.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover ring */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--color-pool)]/0 transition-all duration-300 group-hover:ring-[var(--color-pool)]/50" />

                {/* Zoom icon - desktop only */}
                <span className="absolute right-3 bottom-3 hidden h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[var(--color-pool)]/95 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm10 16-4-4M11 8v6M8 11h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-[var(--color-navy-deep)]/50">
            No photos match this filter.
          </p>
        ) : null}
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && visible[lightboxIndex] ? (
          <Lightbox
            pool={visible[lightboxIndex]}
            index={lightboxIndex}
            total={visible.length}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* -------------------- chip -------------------- */

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
        active
          ? "border-transparent text-white"
          : "border-[var(--color-navy-deep)]/15 bg-white text-[var(--color-navy-deep)] hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
      }`}
    >
      {active ? (
        <motion.span
          layoutId="gallery-active-chip"
          transition={{ duration: 0.45, ease }}
          className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] shadow-[0_8px_24px_-8px_rgba(0,124,182,0.6)]"
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-2">
        {label}
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] tracking-normal ${
            active ? "bg-white/20" : "bg-[var(--color-navy-deep)]/8 text-[var(--color-navy-deep)]/60"
          }`}
        >
          {count}
        </span>
      </span>
    </button>
  );
}

/* -------------------- lightbox -------------------- */

function Lightbox({
  pool,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  pool: FlatPool;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-navy-deep)]/95 px-4 py-8 backdrop-blur-md md:px-10"
      role="dialog"
      aria-modal="true"
      aria-label={pool.title}
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 md:right-8 md:top-8"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 md:left-8"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 md:right-8"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Image card */}
      <motion.div
        key={pool.src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease }}
        className="relative z-10 flex w-full max-w-5xl flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          <Image
            src={pool.src}
            alt={pool.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3 text-white">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]">
              {pool.tierLabel}
            </p>
            <h3 className="font-[family-name:var(--font-display)] mt-1 text-2xl leading-tight md:text-3xl">
              {pool.title}
            </h3>
            {pool.caption ? (
              <p className="mt-2 text-sm text-white/75">{pool.caption}</p>
            ) : null}
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
            {index + 1} / {total}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
