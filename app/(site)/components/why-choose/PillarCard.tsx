"use client";

import { motion } from "motion/react";
import { type Pillar } from "../../../../lib/why-choose";
import { CountUp } from "./CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

/** One SVG icon per pillar, keyed by title. */
export function PillarIcon({ title }: { title: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
  };
  switch (title) {
    case "Stability":
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
        </svg>
      );
    case "Cutting Edge Technology":
      return (
        <svg {...common}>
          <path d="M12 2v3M12 19v3M4 12H1M23 12h-3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "Peace of Mind":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "Ease of Doing Business":
      return (
        <svg {...common}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      );
    case "Always in the Know":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
        </svg>
      );
    default:
      return null;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function PillarCard({
  pillar,
  index,
  featured,
}: {
  pillar: Pillar;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_24px_60px_-35px_rgba(0,55,73,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_32px_70px_-30px_rgba(0,124,182,0.45)] md:p-8"
    >
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-pool)]/8 blur-2xl" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-lg">
          <PillarIcon title={pillar.title} />
        </span>
        {pillar.stat && (
          <div className="text-right">
            <CountUp
              value={pillar.stat.value}
              prefix={pillar.stat.prefix}
              suffix={pillar.stat.suffix}
              className="font-[family-name:var(--font-display)] block text-3xl leading-none text-[var(--color-navy)]"
            />
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-pool)]">
              {pillar.stat.label}
            </p>
          </div>
        )}
      </div>

      <h3 className="font-[family-name:var(--font-display)] relative mt-6 text-2xl text-[var(--color-navy)]">
        {pillar.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{pillar.blurb}</p>

      <ul className="relative mt-6 flex flex-1 flex-col gap-3">
        {pillar.items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease, delay: 0.05 * Math.min(i, 6) }}
            className="flex items-start gap-3 text-sm text-slate-700"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-pool)]/12 text-[var(--color-pool)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-snug">{item}</span>
          </motion.li>
        ))}
      </ul>

      {featured && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] transition-transform duration-500 group-hover:scale-x-100" />
      )}
    </motion.article>
  );
}
