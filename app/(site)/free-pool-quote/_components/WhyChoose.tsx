"use client";

import { motion } from "motion/react";
import { CountUp } from "./CountUp";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: ReadonlyArray<{
  value: number;
  suffix: string;
  label: string;
  display?: string;
}> = [
  { value: 30, suffix: "+", label: "Years in Business" },
  { value: 1600, suffix: "+", label: "Pools Built" },
  { value: 100, suffix: "%", label: "On-Budget" },
  { value: 0, suffix: "", label: "BBB Rating", display: "A+" },
];

const FEATURES: ReadonlyArray<{
  title: string;
  body: string;
  bullets: readonly string[];
  icon: React.ReactNode;
}> = [
  {
    title: "Price Transparency",
    body: "You'll never pay more than your quote, guaranteed in writing.",
    bullets: ["Fixed quote", "No change orders", "Itemized line items"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth={1.8}>
        <path d="M12 2v20M17 6H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Award-Winning Design",
    body: "Best of Houzz. Angie's List Super Service Award. SBA Emerging Leaders Award.",
    bullets: ["Best of Houzz", "Angie's List Super Service", "SBA Emerging Leaders Award"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth={1.7}>
        <path
          d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8 12 3z"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    body: "Custom gunite construction. Stronger and longer-lasting than fiberglass or vinyl.",
    bullets: ["Steel-reinforced gunite", "Premium tile & coping", "Lifetime structural"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth={1.7}>
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#e6eef6] via-[#eef4f9] to-[#dde7f0] py-14 sm:py-28">
      <BackdropGraphics />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl lg:text-6xl"
          >
            Houston homeowners choose us{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                over and over
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Three decades of award-winning custom pool builds, backed by a 100%
            on-budget guarantee and real numbers you can verify.
          </motion.p>
        </div>

        {/* Stat banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mt-14"
        >
          {/* glow underlay */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#00b4d8]/15 via-[#22d3ee]/10 to-[#00b4d8]/15 blur-2xl"
          />

          <div className="relative grid grid-cols-2 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,32,53,0.18)] sm:divide-x sm:divide-y-0 md:grid-cols-4">
            {STATS.map((s, i) => (
              <StatTile key={s.label} stat={s} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} item={f} index={i} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
        >
          {[
            "BBB A+ Rated",
            "Best of Houzz",
            "Angie's List Super Service Award",
            "SBA Emerging Leaders Award",
            "BBB Gold Star Award",
            "GHBA & NAHB Member",
            "100% On-Budget Guarantee",
          ].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#00b4d8]" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stat tile ---------- */

function StatTile({
  stat,
  index,
}: {
  stat: { value: number; suffix: string; label: string; display?: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.08 }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col items-center justify-center px-6 py-8 text-center sm:py-10"
    >
      {/* concentric rings behind the number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.2 + index * 0.08 }}
          className="h-24 w-24 rounded-full border border-[#00b4d8]/15"
        />
      </div>

      <div className="relative font-display text-4xl font-extrabold text-[#0a1628] sm:text-5xl">
        {stat.display ? (
          <span className="bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] bg-clip-text text-transparent">
            {stat.display}
          </span>
        ) : (
          <span className="bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] bg-clip-text text-transparent">
            <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
          </span>
        )}
      </div>

      <div className="relative mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
        {stat.label}
      </div>

      {/* hover underline */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-[#00b4d8] to-[#0ea5e9] transition-all duration-500 group-hover:w-16"
      />
    </motion.div>
  );
}

/* ---------- Feature card ---------- */

type Feature = (typeof FEATURES)[number];

function FeatureCard({ item, index }: { item: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_20px_40px_-22px_rgba(15,32,53,0.15)] transition hover:border-[#00b4d8]/40 hover:shadow-[0_30px_60px_-22px_rgba(0,180,216,0.35)]"
    >
      {/* corner gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#00b4d8]/15 to-transparent blur-2xl transition group-hover:from-[#00b4d8]/25"
      />

      <div className="relative flex items-center gap-4">
        {/* icon tile */}
        <div className="relative">
          <motion.div
            whileHover={{ rotate: 6 }}
            transition={{ duration: 0.4, ease }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] text-white shadow-lg shadow-[#00b4d8]/30"
          >
            {item.icon}
          </motion.div>
          {/* offset ring */}
          <span
            aria-hidden
            className="absolute -inset-1 -z-10 rounded-2xl border border-[#00b4d8]/30"
          />
        </div>

        <h3 className="font-display text-xl font-bold text-[#0a1628]">
          {item.title}
        </h3>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-slate-600">
        {item.body}
      </p>

      <ul className="relative mt-5 space-y-2 text-sm text-slate-700">
        {item.bullets.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.05 }}
            className="flex items-center gap-2.5"
          >
            <span
              aria-hidden
              className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]"
            >
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
            <span>{b}</span>
          </motion.li>
        ))}
      </ul>

      {/* bottom accent bar */}
      <div className="relative mt-6 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent transition-all duration-500 group-hover:w-24" />
    </motion.div>
  );
}

/* ---------- Backdrop motion graphics ---------- */

function BackdropGraphics() {
  return (
    <>
      {/* dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,22,40,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* floating cyan blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [-60, 30, -60], y: [-20, 40, -20] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#00b4d8]/18 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [40, -30, 40], y: [20, 70, 20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-8%] bottom-[5%] h-[460px] w-[460px] rounded-full bg-[#22d3ee]/15 blur-3xl"
      />

      {/* slim animated ring */}
      <motion.svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute left-[20%] top-[6%] h-40 w-40 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#00b4d8"
          strokeWidth="1"
          strokeDasharray="4 10"
        />
      </motion.svg>

      {/* edge accents */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent"
      />
    </>
  );
}
