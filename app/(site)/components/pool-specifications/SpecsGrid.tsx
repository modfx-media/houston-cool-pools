"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type SpecCategory = { heading: string; icon: string; items: string[] };

function SpecIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    steel: <path d="M4 7h16M4 12h16M4 17h16M8 4v16M16 4v16" />,
    gunite: (
      <>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 12l9 4 9-4M3 17l9 4 9-4" />
      </>
    ),
    electrical: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    equipment: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
    finishes: (
      <>
        <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" />
      </>
    ),
    school: <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 2 6 2s6-1 6-2v-5" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      {paths[icon] ?? paths.equipment}
    </svg>
  );
}

export function SpecsGrid({ categories }: { categories: SpecCategory[] }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-10 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[var(--color-pool)]/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-[var(--color-gold-light)]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/50" />
            Built to Last
            <span className="h-px w-8 bg-[var(--color-pool)]/50" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            What&rsquo;s Included in Every Build
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 gap-6 md:columns-2 [&>*]:mb-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.heading}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-pool)]/40 hover:shadow-[0_28px_60px_-32px_rgba(0,124,182,0.5)]"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)]/15 to-[var(--color-pool-deep)]/10 text-[var(--color-pool)] ring-1 ring-[var(--color-pool)]/10 transition-transform duration-300 group-hover:scale-110">
                  <SpecIcon icon={category.icon} />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-navy-deep)]">
                  {category.heading}
                </h3>
              </div>

              <ul className="mt-5 space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/15 text-[var(--color-pool)]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
