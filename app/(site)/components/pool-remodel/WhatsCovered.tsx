"use client";

import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type CoveredItem = {
  title: string;
  body: string;
  icon:
    | "showroom"
    | "hoa"
    | "utility"
    | "kitchen"
    | "shade"
    | "fire"
    | "landscape"
    | "warranty";
};

const ICON_PATHS: Record<CoveredItem["icon"], React.ReactNode> = {
  showroom: (
    <>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
    </>
  ),
  hoa: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  utility: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20V9l6-4 6 4v11" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  kitchen: (
    <>
      <rect x="3" y="9" width="18" height="10" rx="1.5" />
      <path d="M3 13h18" />
      <path d="M8 9V6a2 2 0 012-2h4a2 2 0 012 2v3" />
    </>
  ),
  shade: (
    <>
      <path d="M12 3v3" />
      <path d="M4 12h16" />
      <path d="M6 8l12 4H6z" />
      <path d="M12 12v9" />
    </>
  ),
  fire: (
    <path d="M12 3s5 5 5 10a5 5 0 01-10 0c0-2 1-3.5 2-4.5-1 3 1.5 4 2 3 .5-1-1.5-3 1-8.5z" />
  ),
  landscape: (
    <>
      <path d="M3 20l4-7 3 4 3-6 4 9" />
      <path d="M3 20h18" />
    </>
  ),
  warranty: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

const DEFAULT_COVERED: CoveredItem[] = [
  {
    title: "Full in-house showroom",
    body: "Touch and compare tile, coping, plaster finishes, decking samples, and light fixtures in person - not from a phone screen.",
    icon: "showroom",
  },
  {
    title: "HOA applications prepared",
    body: "We package renderings, elevations, and material spec sheets so your neighborhood approves the remodel the first time around.",
    icon: "hoa",
  },
  {
    title: "Utility reroutes coordinated",
    body: "Gas, electrical, and drainage adjustments are scheduled with the right subs so nothing stalls mid-project.",
    icon: "utility",
  },
  {
    title: "Outdoor kitchens",
    body: "Grill enclosures, prep counters, sinks, and appliances tied into your existing patio or added as part of the remodel.",
    icon: "kitchen",
  },
  {
    title: "Patios & pergolas",
    body: "Extend usable deck space and add shade - flagstone, travertine, or stamped concrete matched to your new coping.",
    icon: "shade",
  },
  {
    title: "Fire pits & fireplaces",
    body: "Gas fire bowls, in-ground fire pits, or full outdoor fireplaces sized to your seating layout and Houston winters.",
    icon: "fire",
  },
  {
    title: "Landscaping packages",
    body: "Beds, uplighting, sod, and screening plants completed the same trip so the yard doesn't sit half-finished.",
    icon: "landscape",
  },
  {
    title: "Permits & warranty",
    body: "Every structural repair is permitted through the correct jurisdiction and backed by our written renovation warranty.",
    icon: "warranty",
  },
];

export function WhatsCovered({
  items = DEFAULT_COVERED,
  imageSrc = "/images/pool-remodel/one-stop-shop.png",
  imageAlt = "Custom Houston Cool Pools remodel with waterfalls, fire feature, and outdoor living",
}: {
  items?: CoveredItem[];
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-x-clip bg-white px-6 py-20 md:px-10 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[var(--color-pool)]/6 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[var(--color-gold-light)]/6 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
        {/* ---------- Image column ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="relative lg:sticky lg:top-28"
        >
          <span
            aria-hidden
            className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[var(--color-pool)]/15 via-transparent to-[var(--color-gold-light)]/20 blur-md"
          />
          <div className="relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-slate-50 shadow-[0_30px_70px_-30px_rgba(0,55,73,0.55)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1600}
              height={2000}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </motion.div>

        {/* ---------- Copy + covered grid ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            We Got You Covered
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Every piece of your remodel,{" "}
            <span className="italic text-[var(--color-pool)]">handled under one roof.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 md:text-base">
            A pool remodel touches more than plaster and tile. We coordinate the
            paperwork, the trades, and the outdoor-living additions so your yard
            comes together as one finished project - not five separate ones you
            have to chase.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                className="group relative flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_14px_36px_-24px_rgba(0,55,73,0.35)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)]/30 hover:shadow-[0_22px_45px_-24px_rgba(0,124,182,0.4)]"
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-[var(--color-pool)]/12 to-[var(--color-pool-deep)]/10 text-[var(--color-pool-deep)] ring-1 ring-[var(--color-pool)]/15 transition-colors group-hover:from-[var(--color-pool)] group-hover:to-[var(--color-pool-deep)] group-hover:text-white group-hover:ring-transparent">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    {ICON_PATHS[item.icon]}
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-display)] text-[15px] font-extrabold leading-tight text-[var(--color-navy-deep)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-slate-600">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
