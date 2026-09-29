"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type RenovationIdea = { label: string; icon: string; href?: string };

function IdeaIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    resurface: (
      <>
        <path d="M3 7c2 0 2 2 4.5 2S9 7 12 7s2 2 4.5 2S18 7 21 7" />
        <path d="M3 12c2 0 2 2 4.5 2S9 12 12 12s2 2 4.5 2S18 12 21 12" />
        <path d="M3 17c2 0 2 2 4.5 2S9 17 12 17s2 2 4.5 2S18 17 21 17" />
      </>
    ),
    tile: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </>
    ),
    coping: (
      <>
        <path d="M3 8h18v3H3z" />
        <path d="M5 11v8M19 11v8M3 19h18" />
      </>
    ),
    light: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 00-3 11c.6.4 1 1 1 1.7V17h4v-1.3c0-.7.4-1.3 1-1.7A6 6 0 0012 3z" />
      </>
    ),
    spa: (
      <>
        <path d="M3 13h18v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3z" />
        <path d="M8 9c0-1 1-1.5 1-3M12 9c0-1 1-1.5 1-3M16 9c0-1 1-1.5 1-3" />
      </>
    ),
    equipment: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
    decking: <path d="M4 4v16M9 4v16M14 4v16M19 4v16M2 8h20M2 16h20" />,
    salt: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    heat: (
      <path d="M12 2s4 4 4 8a4 4 0 01-8 0c0-1.5.5-2.5 1-3.5C9 8 12 6 12 2z" />
    ),
    waterfall: (
      <>
        <path d="M4 4h16v5H4z" />
        <path d="M7 9v7M12 9v9M17 9v7" />
      </>
    ),
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
      {paths[icon] ?? paths.resurface}
    </svg>
  );
}

export function RenovationIdeas({ ideas }: { ideas: RenovationIdea[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-24 text-white md:px-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.22),transparent_55%)]" />
        <motion.div
          aria-hidden
          className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-[var(--color-pool)]/10 blur-[140px]"
          animate={{ y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            What We Can Do
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-5xl">
            Pool Renovation Ideas
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {ideas.map((idea, i) => {
            const cardClass =
              "group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-md transition-colors hover:border-[var(--color-pool)]/40 hover:bg-white/[0.07]";
            const inner = (
              <>
                <span className="pointer-events-none absolute right-3 top-2 font-[family-name:var(--font-display)] text-4xl font-bold text-white/5 transition-colors group-hover:text-[var(--color-pool)]/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)]/25 to-[var(--color-pool-deep)]/20 text-[var(--color-pool)] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--color-gold-light)]">
                  <IdeaIcon icon={idea.icon} />
                </span>
                <span className="flex min-h-[2.75rem] items-center justify-center text-sm font-semibold leading-snug text-white/85">
                  {idea.label}
                </span>
                {idea.href ? (
                  <span className="mt-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)] transition-colors group-hover:text-[var(--color-gold-light)]">
                    View PDF
                    <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
                      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                ) : null}
              </>
            );

            return (
              <motion.li
                key={`${idea.label}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                {idea.href ? (
                  <a
                    href={idea.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${idea.label} - open PDF in new tab`}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
