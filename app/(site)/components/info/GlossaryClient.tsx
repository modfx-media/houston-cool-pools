"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";

const ease = [0.22, 1, 0.36, 1] as const;

const LETTER_PAGES: { slug: string; letters: string; label: string }[] = [
  { slug: "/glossary1", letters: "A", label: "A" },
  { slug: "/glossary2", letters: "B", label: "B" },
  { slug: "/glossary3", letters: "C", label: "C" },
  { slug: "/glossary4", letters: "D-E", label: "D–E" },
  { slug: "/glossary5", letters: "F-G", label: "F–G" },
  { slug: "/glossary6", letters: "H-I-J-K", label: "H–K" },
  { slug: "/glossary7", letters: "L-M-N-O", label: "L–O" },
  { slug: "/glossary8", letters: "P-Q-R", label: "P–R" },
  { slug: "/glossary9", letters: "S", label: "S" },
  { slug: "/glossary10", letters: "T-U-V-W-X-Y-Z", label: "T–Z" },
];

export type GlossaryTerm = { term: string; body: string };

export type GlossaryClientProps = {
  letter: string;
  letterLabel: string;
  pageIndex: number;
  terms: GlossaryTerm[];
};

export function GlossaryClient({ letter, letterLabel, pageIndex, terms }: GlossaryClientProps) {
  const prev = pageIndex > 0 ? LETTER_PAGES[pageIndex - 1] : null;
  const next = pageIndex < LETTER_PAGES.length - 1 ? LETTER_PAGES[pageIndex + 1] : null;

  return (
    <>
      <InfoHero
        eyebrow={`Glossary • Letter ${letterLabel}`}
        title={`Pool Glossary - ${letterLabel}`}
        subtitle="An A–Z reference of pool and spa industry terms - chemistry, equipment, construction, water features. Written in plain English by a real Houston pool builder."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: `Glossary - ${letterLabel}` },
        ]}
        backgroundImage="/images/gallery/hd/modern-geometric.jpg"
        backgroundAlt="Modern geometric custom pool design"
      />

      <section className="bg-white pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          {/* Letter tabs */}
          <div className="flex flex-wrap justify-center gap-2 rounded-3xl border border-slate-200/80 bg-white p-3 shadow-[0_10px_40px_-24px_rgba(0,27,36,0.15)]">
            {LETTER_PAGES.map((lp) => {
              const isActive = lp.slug === `/glossary${pageIndex + 1}`;
              return (
                <Link
                  key={lp.slug}
                  href={lp.slug}
                  className={`inline-flex min-w-[3rem] items-center justify-center rounded-2xl px-4 py-2 text-[13px] font-bold uppercase tracking-[0.14em] transition ${
                    isActive
                      ? "bg-[var(--color-navy-deep)] text-white shadow"
                      : "text-slate-500 hover:bg-slate-100 hover:text-[var(--color-navy-deep)]"
                  }`}
                >
                  {lp.label}
                </Link>
              );
            })}
          </div>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mt-10 grid gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-navy-deep)] to-[var(--color-pool-deep)] font-display text-2xl font-extrabold text-white shadow-md">
                {letter}
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-[var(--color-navy-deep)] sm:text-3xl">
                {terms.length} term{terms.length === 1 ? "" : "s"}
              </h2>
            </div>

            <div className="mt-2 grid gap-4">
              {terms.map((t, i) => (
                <motion.dl
                  key={t.term}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.03, ease }}
                  className="rounded-3xl border border-slate-200/80 bg-white p-5 transition hover:border-[var(--color-pool)]/40 hover:shadow-[0_10px_40px_-24px_rgba(0,27,36,0.2)] md:p-6"
                >
                  <dt className="font-display text-[19px] font-bold text-[var(--color-navy-deep)]">
                    {t.term}
                  </dt>
                  <dd className="mt-1.5 text-[15.5px] leading-relaxed text-slate-600">
                    {t.body}
                  </dd>
                </motion.dl>
              ))}
            </div>
          </motion.div>

          {/* Prev / Next */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <Link
                href={prev.slug}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:-translate-x-0.5">
                  <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {prev.label}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={next.slug}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-pool-deep)]"
              >
                {next.label}
                <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
