"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";

const ease = [0.22, 1, 0.36, 1] as const;

type Definition = { term: string; body: string };

const DEFINITIONS: Definition[] = [
  {
    term: "Beam",
    body: "The upper section of the vertical wall of a gunite pool or spa. A \u201craised beam\u201d is one that extends above ground level.",
  },
  {
    term: "Blower",
    body: "An electrical unit that generates air pressure to provide the spa jets with bubbles.",
  },
  {
    term: "Cantilever Edge",
    body: "A pool deck of a poured or sprayed material that extends slightly beyond the edge of the pool, negating the need for traditional coping.",
  },
  {
    term: "Cartridge Filter",
    body: "A filtration system that uses a fine mesh material to remove suspended contaminants from the water. Requires a 30-minute cleaning with a garden hose six to ten times per year.",
  },
  {
    term: "Chlorinator",
    body: "A unit that holds chlorine tablets and automatically treats the water.",
  },
  {
    term: "Coping",
    body: "Material that covers the first nine to twelve inches of horizontal surface at the pool\u2019s edge. It can be brick, flagstone, concrete, or one of many natural or man-made materials.",
  },
  {
    term: "Deck",
    body: "Patio that is attached to the pool itself. Typical materials and finishes include brushed concrete, spray concrete, cool deck, sundeck, flagstone, and pea gravel. The deck often accounts for 20\u201330% of a pool budget.",
  },
  {
    term: "DE Filter",
    body: "Filtration system that uses a layer of fine powder (diatomaceous earth) to remove contaminants from the water. Requires a ten-minute backwashing process about once a month, accomplished by adjusting the valves. The DE powder is relatively inexpensive but must be replaced after each back-washing.",
  },
];

export function PoolDefinitionsClient() {
  return (
    <>
      <InfoHero
        eyebrow="Pool Terminology"
        title="Pool Definitions"
        subtitle="A quick-reference glossary of the pool construction and equipment terms you\u2019ll hear from your builder. Looking for the full A\u2013Z? See the Pool Glossary."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Pool Terms" },
        ]}        backgroundImage="/images/gallery/hd/estate-twilight.jpg"
        backgroundAlt="Twilight custom pool estate build by Houston Cool Pools"      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="grid gap-4 sm:gap-5">
            {DEFINITIONS.map((d, i) => (
              <motion.dl
                key={d.term}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.03, ease }}
                className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 rounded-3xl border border-slate-200/80 bg-white p-5 transition hover:border-[var(--color-pool)]/40 hover:shadow-[0_10px_40px_-24px_rgba(0,27,36,0.25)] md:p-6"
              >
                <dt className="flex items-baseline gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-pool)]/10 text-[13px] font-bold text-[var(--color-pool)]">
                    {d.term[0]}
                  </span>
                </dt>
                <div>
                  <p className="font-display text-lg font-bold text-[var(--color-navy-deep)]">
                    {d.term}
                  </p>
                  <dd className="mt-1.5 text-[15.5px] leading-relaxed text-slate-600">
                    {d.body}
                  </dd>
                </div>
              </motion.dl>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[var(--color-pool)]/5 via-white to-[var(--color-gold-light)]/5 p-6 text-center md:p-8">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Need the full A–Z?
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[var(--color-navy-deep)]">
              Explore the full Pool Glossary
            </h3>
            <p className="mt-2 text-[15px] text-slate-600">
              Over 100 pool and spa terms with plain-English explanations.
            </p>
            <Link
              href="/glossary1"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-pool-deep)]"
            >
              Open Pool Glossary
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
