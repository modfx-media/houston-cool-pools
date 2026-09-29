"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type Resource = {
  title: string;
  href: string;
  description: string;
  icon: string;
};

function ResourceIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    builder: (
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
    ),
    specs: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </>
    ),
    remodel: (
      <>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    faq: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 015 0c0 1.7-2.5 2-2.5 4M12 17h.01" />
      </>
    ),
    manual: (
      <path d="M4 5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM14 3v6h6" />
    ),
    school: (
      <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 2 6 2s6-1 6-2v-5" />
    ),
    pricing: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5a2.5 2 0 012.5-1.5c1.4 0 2.5.8 2.5 1.8s-1.1 1.7-2.5 1.7-2.5.8-2.5 1.8 1.1 1.8 2.5 1.8a2.5 2 0 002.5-1.5" />
      </>
    ),
    sequence: (
      <path d="M5 7h14M5 12h14M5 17h14M3 7h.01M3 12h.01M3 17h.01" />
    ),
    features: (
      <path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5L12 2z" />
    ),
    terms: (
      <>
        <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),
    financing: (
      <>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9v6M18 9v6" />
      </>
    ),
    glossary: (
      <>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </>
    ),
    home: (
      <path d="M3 11l9-7 9 7M5 10v10h14V10M9 20v-6h6v6" />
    ),
    reviews: (
      <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
    ),
    brochure: (
      <path d="M4 4h7a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2.5H4V4zM20 4h-2a3 3 0 00-3 3v13a2.5 2.5 0 012.5-2.5H20V4z" />
    ),
    weather: (
      <>
        <path d="M7 16a4 4 0 010-8 5 5 0 019.6 1.3A3.5 3.5 0 0117 16H7z" />
        <path d="M11 19l-1 3M15 19l-1 3M8 20l-.5 2" />
      </>
    ),
    articles: (
      <>
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
        <path d="M7 8h10M7 12h10M7 16h6" />
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
      {paths[icon] ?? paths.articles}
    </svg>
  );
}

export function PoolInfoGrid({ resources }: { resources: Resource[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-6 py-20 md:px-10 md:py-28">
      <span className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />
      <span className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Browse Topics
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Your Complete Pool Resource Center
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.href}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
            >
              <Link
                href={resource.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(0,55,73,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-pool)]/40 hover:shadow-[0_30px_70px_-30px_rgba(0,124,182,0.45)]"
              >
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-pool)]/0 blur-2xl transition-colors duration-500 group-hover:bg-[var(--color-pool)]/10" />

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)]/12 to-[var(--color-pool-deep)]/12 text-[var(--color-pool)] transition-all duration-300 group-hover:from-[var(--color-pool)] group-hover:to-[var(--color-pool-deep)] group-hover:text-white group-hover:shadow-[0_12px_30px_-8px_rgba(0,124,182,0.6)]">
                  <ResourceIcon icon={resource.icon} />
                </span>

                <h3 className="font-[family-name:var(--font-display)] relative mt-6 text-xl text-[var(--color-navy-deep)]">
                  {resource.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {resource.description}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
