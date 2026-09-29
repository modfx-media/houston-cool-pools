"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { POOL_TYPES, type PoolTypeCategory } from "../../../../lib/pool-types";

const ease = [0.22, 1, 0.36, 1] as const;

/** Bento masonry grid for a single pool-type category. */
export function PoolTypeSection({
  category,
  index,
}: {
  category: PoolTypeCategory;
  index: number;
}) {
  // Alternate header alignment so consecutive sections feel rhythmic.
  const flipped = index % 2 === 1;

  return (
    <section
      id={category.id}
      className="relative scroll-mt-32 border-b border-[var(--color-navy-deep)]/10 py-20 last:border-b-0 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* ----- Header ----- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className={`grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16 ${
            flipped ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-pool)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
                {category.tagline}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-[1] tracking-tight text-[var(--color-navy-deep)] md:text-5xl lg:text-[3.25rem]">
              {category.label}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-navy-deep)]/70 md:text-base">
              {category.description}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {category.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-sm text-[var(--color-navy-deep)]/80"
              >
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/10 text-[var(--color-pool)]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ----- Bento masonry grid ----- */}
        <BentoGrid photos={category.photos} />
      </div>
    </section>
  );
}

function BentoGrid({ photos }: { photos: PoolTypeCategory["photos"] }) {
  // Map up to 6 photos into a varied bento layout. Extra photos render in a
  // simple 3-col strip below.
  const main = photos.slice(0, 6);
  const overflow = photos.slice(6);

  // Each entry defines col-span / row-span on the 4×4 grid.
  const layout = [
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
  ];

  return (
    <>
      <div className="mt-12 grid auto-rows-[180px] grid-cols-4 gap-3 sm:auto-rows-[220px] sm:gap-4 md:auto-rows-[240px]">
        {main.map((photo, i) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease, delay: Math.min(i, 5) * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl bg-[var(--color-navy-deep)] shadow-[0_18px_45px_-25px_rgba(0,55,73,0.55)] ring-1 ring-black/5 ${
              layout[i] ?? "col-span-2 row-span-1"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-[var(--color-pool)]/50" />
          </motion.div>
        ))}
      </div>

      {overflow.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {overflow.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-navy-deep)] shadow-[0_18px_45px_-25px_rgba(0,55,73,0.55)] ring-1 ring-black/5"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      ) : null}
    </>
  );
}

/** Sticky chip nav that jumps between pool-type sections. */
export function PoolTypeNav() {
  return (
    <nav
      aria-label="Jump to pool type"
      className="sticky top-16 z-30 border-y border-[var(--color-navy-deep)]/10 bg-white/95 backdrop-blur-md md:top-20"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3 md:px-10">
        <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-navy-deep)]/40 md:inline">
          Browse by:
        </span>
        {POOL_TYPES.map((category) => (
          <Link
            key={category.id}
            href={`#${category.id}`}
            className="shrink-0 rounded-full border border-[var(--color-navy-deep)]/15 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:bg-[var(--color-pool)] hover:text-white"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
