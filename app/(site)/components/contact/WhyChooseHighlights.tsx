"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "30+", label: "Years Building Pools" },
  { value: "1,600+", label: "Pools Delivered" },
  { value: "100%", label: "On-Budget Guarantee" },
  { value: "$2M", label: "GL Insurance" },
] as const;

type Icon = "shield" | "spark" | "phone" | "warranty" | "clipboard" | "gift";

type Highlight = {
  title: string;
  body: string;
  icon: Icon;
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "100% On-Budget Guarantee",
    body: "Your final price matches your signed proposal. No last-minute surprises, no change-order games.",
    icon: "shield",
  },
  {
    title: "Modern Equipment, Standard",
    body: "Variable-speed pumps, LED pool & spa lighting, and Cyclone pre-filtration on every build.",
    icon: "spark",
  },
  {
    title: "Smart-Home Control",
    body: "Run your pool, spa, lights, and features from your phone. Endless Pools swim-system option available.",
    icon: "phone",
  },
  {
    title: "Comprehensive Warranties",
    body: "3-yr Pentair equipment, 2-yr A&A, 1-yr workmanship, and 10-15 yr Quartz Pebble plaster.",
    icon: "warranty",
  },
  {
    title: "We Handle the Paperwork",
    body: "HOA application, utility reroutes, permits, and inspections - all coordinated by our team.",
    icon: "clipboard",
  },
  {
    title: "Start-Up Included",
    body: "One month of free pool service plus three months of chemicals so you enjoy the pool from day one.",
    icon: "gift",
  },
];

const BADGES = [
  "A+ BBB Rated",
  "Best of Houzz",
  "Angie's List Super Service Award",
  "SBA Emerging Leaders Award",
  "BBB Gold Star Award",
] as const;

/**
 * Contact-page trust section. Redesigned from a dense 5-pillar bullet grid
 * into a scannable stats band + curated highlight tiles + accreditations rail.
 * Full detail lives on the /whychoosehcp page (linked at the bottom).
 */
export function WhyChooseHighlights() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* soft brand glows */}
      <span className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-[140px]" />
      <span className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--color-gold-light)]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            Why Choose HCP
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy)] md:text-4xl">
            Everything included when you build with{" "}
            <span className="italic text-[var(--color-pool)]">Houston Cool Pools</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            The reasons Houston homeowners keep choosing us since 1996 - and what
            makes every one of our builds different.
          </p>
        </motion.div>

        {/* Stats band */}
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-12 grid grid-cols-2 gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-[0_18px_50px_-30px_rgba(0,55,73,0.35)] sm:grid-cols-4 sm:gap-4 md:p-8"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="flex flex-col items-center rounded-2xl bg-white px-4 py-5 text-center shadow-[0_10px_30px_-18px_rgba(0,55,73,0.4)]"
            >
              <dd className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-[var(--color-navy-deep)] md:text-4xl">
                {s.value}
              </dd>
              <dt className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
                {s.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>

        {/* Highlight tiles */}
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <motion.article
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.05, ease }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_-24px_rgba(0,55,73,0.4)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/30 hover:shadow-[0_22px_50px_-24px_rgba(0,124,182,0.35)] md:p-6"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-[var(--color-pool)]/12 to-[var(--color-pool)]/6 text-[var(--color-pool-deep)] ring-1 ring-[var(--color-pool)]/15">
                  <TileIcon icon={h.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-display)] text-[17px] font-extrabold leading-tight text-[var(--color-navy-deep)]">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                    {h.body}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Accreditations rail */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5 md:mt-12"
        >
          {BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11.5px] font-semibold text-slate-600 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[var(--color-gold)]">
                <path
                  d="M12 2l2.39 6.94H22l-6.32 4.59L18.07 22 12 17.77 5.93 22l2.39-8.47L2 8.94h7.61L12 2z"
                  fill="currentColor"
                />
              </svg>
              {b}
            </span>
          ))}
        </motion.div>

        {/* Bottom link to full detail page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/whychoosehcp"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
          >
            See the full HCP difference
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TileIcon({ icon }: { icon: Icon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
  switch (icon) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v3M12 18v3M4.5 4.5l2 2M17.5 17.5l2 2M3 12h3M18 12h3M4.5 19.5l2-2M17.5 6.5l2-2" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      );
    case "warranty":
      return (
        <svg {...common}>
          <path d="M12 2l3 3 4-1 1 4 3 3-3 3-1 4-4-1-3 3-3-3-4 1-1-4-3-3 3-3 1-4 4 1 3-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M3 12h18M12 8v12" />
          <path d="M8 8a3 3 0 010-6c2 0 4 3 4 6-3 0-6-2-6-2M16 8a3 3 0 000-6c-2 0-4 3-4 6 3 0 6-2 6-2" />
        </svg>
      );
  }
}
