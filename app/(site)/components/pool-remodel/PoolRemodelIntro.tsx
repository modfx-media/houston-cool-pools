"use client";

import { motion } from "motion/react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const ease = [0.22, 1, 0.36, 1] as const;

export type ReasonGroup = { heading: string; items: string[] };

const GROUP_ICONS: Record<string, React.ReactNode> = {
  "Why Choose Houston Cool Pools?": (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),
  "Peace of Mind": (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  "We Got You Covered!": (
    <>
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M8 7V5a4 4 0 018 0v2" />
    </>
  ),
};

/**
 * Redesigned intro. Three feature cards laid out as a horizontal row on
 * desktop (one per reason group) with a wide feature photo above. The old
 * sticky sidebar image + stacked cards layout is gone.
 */
export function PoolRemodelIntro({ reasonGroups }: { reasonGroups: ReasonGroup[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 px-6 py-20 md:px-10 md:py-24">
      {/* Soft decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--color-pool)]/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--color-gold-light)]/6 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ----- Section eyebrow + heading ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Reimagine your backyard
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            A pool renovation, done the{" "}
            <span className="italic text-[var(--color-pool)]">Houston Cool Pools</span> way.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Drag the slider to see what a full renovation can do. A simple
            re-plaster, face-lift, or complete remodel can save you time and money
            while adding to the beauty of your backyard.
          </p>
        </motion.div>

        {/* ----- Interactive before/after slider ----- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-10 max-w-3xl md:mt-12"
        >
          <BeforeAfterSlider
            beforeSrc="/images/pool-remodel/before.png"
            afterSrc="/images/pool-remodel/after.png"
            beforeAlt="Backyard pool before Houston Cool Pools renovation"
            afterAlt="Backyard pool after Houston Cool Pools renovation"
            initial={50}
          />
        </motion.div>

        {/* ----- Feature-card grid (one per reason group) ----- */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {reasonGroups.map((group) => (
            <motion.li
              key={group.heading}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,55,73,0.4)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/30 hover:shadow-[0_28px_60px_-28px_rgba(0,124,182,0.4)] md:p-7"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {GROUP_ICONS[group.heading] ?? (
                    <path d="M5 13l4 4L19 7" />
                  )}
                </svg>
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-extrabold leading-tight text-[var(--color-navy-deep)]">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-700">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 h-4 w-4 flex-none text-[var(--color-pool)]"
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
