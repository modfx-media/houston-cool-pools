"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type TestimonialItem = {
  name: string;
  quote: string;
  when?: string;
};

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="var(--color-pool)"
          stroke="var(--color-pool)"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
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

export function Testimonials({
  items,
  rating,
  reviewCount,
  reviewsUrl,
}: {
  items: TestimonialItem[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  // Every card passed in has already been verified as a real 5-star Google
  // review with text and a name - an empty list means we render nothing.
  if (items.length === 0) return null;

  const t = items[index];

  // sliver preview cards (prev / next)
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return (
    <section
      className="relative overflow-hidden bg-white py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* subtle backdrop accents */}
      <span className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-[160px]" />
      <span className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--color-pool)]/6 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* ----- Header ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            What Our Clients Say
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.05] tracking-tight text-[var(--color-navy-deep)] md:text-5xl lg:text-[3.5rem]">
            Five-Star{" "}
            <span className="italic text-[var(--color-pool)]">Reviews</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-navy-deep)]/65">
            Real words from real Houston homeowners who trusted us to build their backyard escape.
          </p>

          {/* Google rating summary */}
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-sm transition hover:shadow-md"
          >
            <GoogleG className="h-5 w-5" />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy-deep)]">
              {rating.toFixed(1)}
            </span>
            <Stars />
            <span className="text-xs font-semibold text-[var(--color-navy-deep)]/60">
              {reviewCount.toLocaleString("en-US")} Google reviews
            </span>
          </a>
        </motion.div>

        {/* ----- Carousel ----- */}
        <div className="relative mt-16">
          {/* Side preview chips (desktop) */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
                aria-label="Previous review"
                className="group absolute left-0 top-1/2 hidden -translate-y-1/2 lg:flex"
              >
                <div className="flex items-center gap-3 rounded-full bg-white px-3 py-3 shadow-lg ring-1 ring-black/5 transition-all hover:-translate-x-1 hover:shadow-xl">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-pool)]/10 text-[var(--color-pool)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % items.length)}
                aria-label="Next review"
                className="group absolute right-0 top-1/2 hidden -translate-y-1/2 lg:flex"
              >
                <div className="flex items-center gap-3 rounded-full bg-white px-3 py-3 shadow-lg ring-1 ring-black/5 transition-all hover:translate-x-1 hover:shadow-xl">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-pool)]/10 text-[var(--color-pool)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </button>
            </>
          )}

          {/* Featured card */}
          <div className="relative mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name + index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease }}
                className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_30px_70px_-30px_rgba(0,55,73,0.25)] ring-1 ring-black/5 sm:p-10 md:p-14"
              >
                {/* Decorative quote glyph */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 right-4 font-[family-name:var(--font-display)] text-[6rem] leading-none text-[var(--color-pool)]/8 sm:-top-4 sm:right-6 sm:text-[10rem] md:text-[14rem]"
                >
                  &ldquo;
                </span>

                <div className="relative">
                  <Stars />

                  <blockquote className="mt-6 text-base leading-[1.7] text-[var(--color-navy-deep)]/85 md:text-[17px]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4 border-t border-black/5 pt-6">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-sm font-bold tracking-wide text-white shadow-md">
                      {initials(t.name)}
                    </span>
                    <div className="leading-tight">
                      <span className="block text-sm font-semibold text-[var(--color-navy-deep)]">
                        {t.name}
                      </span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
                        {t.when ?? "Posted on Google"}
                      </span>
                    </div>

                    {/* Google badge */}
                    <a
                      href={reviewsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto hidden items-center gap-2 rounded-full bg-[var(--color-pool)]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-pool)] transition hover:bg-[var(--color-pool)]/15 sm:inline-flex"
                    >
                      <GoogleG className="h-3 w-3" />
                      {rating.toFixed(1)} Rating
                    </a>
                  </figcaption>
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Prev / next sliver labels (desktop only) */}
          {items.length > 1 && (
            <div className="pointer-events-none mx-auto mt-6 hidden max-w-3xl items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-navy-deep)]/40 lg:flex">
              <span>← {prev.name}</span>
              <span>{next.name} →</span>
            </div>
          )}
        </div>

        {/* ----- Bottom controls ----- */}
        <div className="mt-10 flex flex-col items-center gap-6">
          {items.length > 1 && (
            <div className="flex items-center gap-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show review ${i + 1}`}
                  className="group flex h-10 w-8 items-center justify-center"
                >
                  <span
                    aria-hidden
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-10 bg-[var(--color-pool)]"
                        : "w-1.5 bg-[var(--color-navy-deep)]/15 group-hover:bg-[var(--color-navy-deep)]/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-navy-deep)]/50">
            {String(index + 1).padStart(2, "0")}{" "}
            <span className="mx-2 text-[var(--color-navy-deep)]/20">/</span>{" "}
            {String(items.length).padStart(2, "0")} Reviews
          </p>

          <a
            href={reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-pool)] transition hover:text-[var(--color-pool-deep)]"
          >
            View all Google reviews
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
