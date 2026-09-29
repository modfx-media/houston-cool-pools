"use client";

import { motion } from "motion/react";
import { TESTIMONIALS } from "../../../../lib/testimonials";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "What customers say about Mike" - filters TESTIMONIALS for reviews that
 * mention Mike by name and renders them as a horizontal infinite marquee so
 * the section stays compact even with many quotes.
 */
export function OwnerReviews() {
  const reviews = TESTIMONIALS.filter((t) => /\bMike\b/.test(t.quote));
  if (reviews.length === 0) return null;

  // Duplicate the list so the -50% translation loops seamlessly.
  const track = [...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      {/* soft brand glows */}
      <span className="pointer-events-none absolute -left-40 top-10 h-[360px] w-[360px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />
      <span className="pointer-events-none absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--color-gold-light)]/10 blur-[140px]" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl px-6 text-center md:px-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            In their words
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            What customers are saying about{" "}
            <span className="italic text-[var(--color-pool)]">Mike</span>
          </h2>
        </motion.div>

        {/* Marquee track */}
        <div
          className="group relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <motion.ul
            aria-label="Customer reviews about Mike"
            className="flex w-max gap-4 md:gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 45,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {track.map((r, i) => (
              <li
                key={`${r.name}-${i}`}
                className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_-24px_rgba(0,55,73,0.4)] sm:w-[380px] md:p-6"
              >
                {/* Rating stars */}
                <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <svg key={s} viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[var(--color-gold)]">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mt-3 line-clamp-6 text-[13.5px] leading-relaxed text-slate-700">
                  <HighlightMike text={r.quote} />
                </blockquote>

                <figcaption className="mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-[11px] font-bold text-white">
                    {initials(r.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-[13.5px] font-extrabold leading-tight text-[var(--color-navy-deep)]">
                      {r.name}
                    </p>
                    <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Verified customer
                    </p>
                  </div>
                </figcaption>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/** Bolds any standalone occurrence of the word "Mike" in a review. */
function HighlightMike({ text }: { text: string }) {
  const parts = text.split(/(\bMike\b)/g);
  return (
    <>
      {parts.map((p, i) =>
        p === "Mike" ? (
          <strong key={i} className="font-bold text-[var(--color-navy-deep)]">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
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
