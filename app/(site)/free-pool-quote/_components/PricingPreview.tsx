"use client";

import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const TIERS = [
  {
    label: "Signature Starter",
    range: "$65K – $90K",
    image: "/images/pricing-65k-90k/hero.jpg",
    body:
      "Beautifully crafted gunite pools with premium plaster finish, LED lighting, and standard equipment package.",
    bullets: ["Gunite construction", "Premium plaster", "LED lighting", "Auto-fill"],
    accent: "from-[#0ea5e9] to-[#22d3ee]",
  },
  {
    label: "Designer Custom",
    range: "$90K – $115K",
    image: "/images/pricing-90k-115k/hero.jpg",
    body:
      "Custom shapes, integrated spa, and extensive water features. The sweet spot for a backyard centerpiece.",
    bullets: [
      "Integrated spa",
      "Sheer-descent features",
      "Travertine decking",
      "Variable-speed pump",
    ],
    accent: "from-[#00b4d8] to-[#0ea5e9]",
    highlight: true,
  },
  {
    label: "Premier Outdoor",
    range: "$115K – $150K",
    image: "/images/pricing-115k-150k/hero.jpg",
    body:
      "Full backyard transformations - pool, spa, outdoor kitchen, and fire features designed as one cohesive space.",
    bullets: [
      "Outdoor kitchen",
      "Fire features",
      "Glass-tile finish",
      "Premium coping",
    ],
    accent: "from-[#22d3ee] to-[#a855f7]",
  },
  {
    label: "Signature Estate",
    range: "$150K+",
    image: "/images/pricing-150k-plus/hero.jpg",
    body:
      "One-of-a-kind backyard estates. Vanishing edges, multi-level builds, and premium tile for discerning homeowners.",
    bullets: [
      "Vanishing edges",
      "Multi-level design",
      "Smart automation",
      "Full hardscape",
    ],
    accent: "from-[#8b5cf6] to-[#00b4d8]",
  },
] as const;

export function PricingPreview() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0d1a2f] to-[#0a1628] py-14 sm:py-28">
      <Backdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Four price tiers.{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                Zero surprises.
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
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94a3b8] sm:text-lg"
          >
            Every quote is line-itemed and locked in writing with our 100%
            on-budget guarantee. Here&apos;s where most Houston builds land.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <TierCard key={t.range} tier={t} index={i} />
          ))}
        </div>

        {/* Disclaimer + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="max-w-xl text-[13px] leading-relaxed text-[#94a3b8]">
            Ranges are typical for size, finishes, and features. Your final
            price is confirmed in your free in-home quote and{" "}
            <span className="font-semibold text-white">
              locked in writing.
            </span>
          </p>
          <a
            href="#quote-form"
            className="group inline-flex items-center gap-2 rounded-full bg-[#00b4d8] px-7 py-3.5 text-sm font-semibold text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:bg-white"
          >
            Get My Custom Quote
            <span className="inline-block transition group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

type Tier = (typeof TIERS)[number];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const isHighlight = "highlight" in tier && tier.highlight;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay: 0.08 + index * 0.09 }}
      whileHover={{ y: -8 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition ${
        isHighlight
          ? "border-[#00b4d8]/60 bg-gradient-to-b from-[#00b4d8]/[0.08] to-[#0f2035]/80 shadow-[0_25px_60px_-25px_rgba(0,180,216,0.4)]"
          : "border-white/10 bg-[#0f2035]/70 hover:border-[#00b4d8]/30"
      }`}
    >
      {/* MOST POPULAR ribbon */}
      {isHighlight ? (
        <div className="absolute right-3 top-3 z-20">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.09, type: "spring", stiffness: 260, damping: 16 }}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0ea5e9] px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#0a1628] shadow-lg shadow-[#00b4d8]/40"
          >
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current" aria-hidden>
              <path d="M12 2l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 16.9l-5.9 3.1L7.4 13.4 2.4 8.8l6.7-.7L12 2z" />
            </svg>
            Most Popular
          </motion.span>
        </div>
      ) : null}

      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease }}
          className="absolute inset-0"
        >
          <Image
            src={tier.image}
            alt={`${tier.label} tier pool example`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>
        {/* dark gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2035] via-[#0f2035]/40 to-transparent" />
        {/* accent bar */}
        <div
          className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${tier.accent}`}
        />
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Label + range */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00b4d8]">
            {tier.label}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {tier.range}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#94a3b8]">
          {tier.body}
        </p>

        <ul className="mt-5 space-y-2 text-[13px] text-[#cbd5e1]">
          {tier.bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease }}
              className="flex items-center gap-2"
            >
              <span
                aria-hidden
                className="inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]"
              >
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                  <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
              {b}
            </motion.li>
          ))}
        </ul>

        {/* Hover CTA */}
        <div className="mt-6 border-t border-white/5 pt-4">
          <a
            href="#quote-form"
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em] transition ${
              isHighlight
                ? "bg-[#00b4d8] text-[#0a1628] hover:bg-white"
                : "border border-white/15 text-white hover:border-[#00b4d8] hover:bg-[#00b4d8]/10 hover:text-[#00b4d8]"
            }`}
          >
            Quote This Tier
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
              <path d="M5 12h12.17l-3.59 3.59L15 17l6-6-6-6-1.41 1.41L17.17 11H5z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Backdrop ---------- */

function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-40, 30, -40], y: [-20, 30, -20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-6%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#00b4d8]/18 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [40, -30, 40], y: [20, 60, 20] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-6%] bottom-[5%] h-[460px] w-[460px] rounded-full bg-[#22d3ee]/15 blur-3xl"
      />
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
