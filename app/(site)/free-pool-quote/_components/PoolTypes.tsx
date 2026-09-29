"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { LP_POOL_TYPES } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export function PoolTypes() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1628] py-14 sm:py-28">
      <BackdropGraphics />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
              What We Build
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Find the pool style that{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#00b4d8] bg-clip-text text-transparent">
                fits your home
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
            Six signature styles, every one built to match your home,
            your lifestyle, and your budget.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {LP_POOL_TYPES.map((p, i) => (
            <PoolCard key={p.title} item={p} index={i + 1} />
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0a1628] via-[#112240] to-[#0a1628] p-6 sm:p-8"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(0,180,216,0.18),transparent_55%)]"
          />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00b4d8]">
                Not sure which fits?
              </p>
              <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                Let&apos;s design it together. Free quote, zero
                pressure.
              </p>
            </div>
            <a
              href="#quote-form"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#00b4d8] px-6 py-3 text-sm font-semibold text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:bg-white"
            >
              Start My Design
              <span className="inline-block transition group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

type PoolItem = (typeof LP_POOL_TYPES)[number];

function PoolCard({ item, index }: { item: PoolItem; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f2035]/80 backdrop-blur-sm"
    >
      {/* Outer glow on hover */}
      <motion.div
        aria-hidden
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00b4d8]/50 via-transparent to-[#00b4d8]/20 opacity-0 blur-md transition"
      />

      {/* Card body */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#0f2035]">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.8, ease }}
            className="h-full w-full"
          >
            <Image
              src={item.image}
              alt={`${item.title} pool example`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2035] via-[#0f2035]/30 to-transparent" />

          {/* Index badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0a1628]/70 font-display text-sm font-bold text-[#00b4d8] backdrop-blur-md">
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              / {String(LP_POOL_TYPES.length).padStart(2, "0")}
            </span>
          </div>

          {/* Corner accent */}
          <motion.span
            aria-hidden
            variants={{ hover: { width: 64, opacity: 1 } }}
            initial={{ width: 28, opacity: 0.7 }}
            transition={{ duration: 0.4, ease }}
            className="absolute right-4 top-4 h-[2px] rounded-full bg-[#00b4d8]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-bold text-white">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
            {item.copy}
          </p>

          <ul className="mt-5 space-y-2.5 text-sm text-[#cbd5e1]">
            {item.bullets.map((b, idx) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease }}
                className="flex items-start gap-2.5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[#00b4d8]/15 text-[#00b4d8]"
                >
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current">
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>

          {/* Hover CTA row */}
          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Build it for your home
            </span>
            <motion.a
              href="#quote-form"
              variants={{ hover: { x: 4 } }}
              transition={{ duration: 0.3, ease }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b4d8] transition hover:text-white"
            >
              Get a quote
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M5 12h12.17l-3.59 3.59L15 17l6-6-6-6-1.41 1.41L17.17 11H5z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Backdrop motion graphics ---------- */

function BackdropGraphics() {
  return (
    <>
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating cyan glow blobs */}
      <motion.div
        aria-hidden
        initial={{ x: -60, y: -20, opacity: 0.5 }}
        animate={{
          x: [-60, 30, -60],
          y: [-20, 40, -20],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#00b4d8]/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ x: 40, y: 20, opacity: 0.3 }}
        animate={{
          x: [40, -30, 40],
          y: [20, 80, 20],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        className="absolute right-[-8%] bottom-[5%] h-[480px] w-[480px] rounded-full bg-[#22d3ee]/15 blur-3xl"
      />

      {/* Edge gradient accents */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/50 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent"
      />
    </>
  );
}
