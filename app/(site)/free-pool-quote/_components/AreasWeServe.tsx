"use client";

import { motion } from "motion/react";
import { LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Houston-area service map. Uses a stylized SVG "constellation" - no real
 * map tiles required - with animated pin drops, connector paths, and
 * hover-lift chips for each neighborhood.
 *
 * Coordinates below are on a 100x60 viewBox, roughly arranged as they sit
 * on a Houston map (Tomball NW, Kingwood NE, Sugar Land SW, Pearland S).
 */
type Area = {
  name: string;
  x: number;
  y: number;
  zip?: string;
};

const AREAS: Area[] = [
  { name: "Tomball", x: 16, y: 14, zip: "77375" },
  { name: "Magnolia", x: 8, y: 22 },
  { name: "The Woodlands", x: 34, y: 8, zip: "77380" },
  { name: "Kingwood", x: 68, y: 12, zip: "77339" },
  { name: "Cypress", x: 18, y: 26, zip: "77433" },
  { name: "Spring", x: 40, y: 18, zip: "77373" },
  { name: "The Heights", x: 46, y: 34, zip: "77008" },
  { name: "Memorial", x: 36, y: 38 },
  { name: "Katy", x: 12, y: 40, zip: "77494" },
  { name: "Houston", x: 50, y: 42, zip: "77070" },
  { name: "Sugar Land", x: 34, y: 52 },
  { name: "Pearland", x: 58, y: 52 },
];

// Anchor "HQ" point (Northwest Houston / 21902 Highway 249)
const HQ = { x: 26, y: 22 };

export function AreasWeServe() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1628] py-14 sm:py-28">
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
              Where We Build
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Serving all of{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                Greater Houston
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
            From Tomball to Pearland, Katy to Kingwood - our design and build
            crews cover the entire metro. Our showroom is in Northwest Houston.
          </motion.p>
        </div>

        {/* Constellation map */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            {/* glow underlay */}
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#00b4d8]/25 via-transparent to-[#0ea5e9]/20 blur-2xl"
            />

            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f2035] via-[#0a1628] to-[#0f2035] shadow-2xl shadow-black/40">
              {/* subtle grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <svg
                viewBox="0 0 100 60"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#00b4d8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* HQ soft glow */}
                <circle
                  cx={HQ.x}
                  cy={HQ.y}
                  r={9}
                  fill="url(#hqGlow)"
                />

                {/* Connector paths (HQ to each area) - drawn on scroll */}
                {AREAS.map((a, i) => (
                  <motion.line
                    key={`line-${a.name}`}
                    x1={HQ.x}
                    y1={HQ.y}
                    x2={a.x}
                    y2={a.y}
                    stroke="#00b4d8"
                    strokeWidth={0.22}
                    strokeOpacity={0.35}
                    strokeDasharray="1 1.6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.35 + i * 0.06,
                      ease,
                    }}
                  />
                ))}

                {/* Area pins */}
                {AREAS.map((a, i) => (
                  <motion.g
                    key={`pin-${a.name}`}
                    initial={{ opacity: 0, y: -8, scale: 0.4 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 16,
                      delay: 0.5 + i * 0.06,
                    }}
                  >
                    {/* pulsing outer ring */}
                    <motion.circle
                      cx={a.x}
                      cy={a.y}
                      r={1.6}
                      fill="none"
                      stroke="#00b4d8"
                      strokeWidth={0.15}
                      animate={{ r: [1.6, 2.6, 1.6], opacity: [0.6, 0, 0.6] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.12,
                      }}
                    />
                    {/* dot */}
                    <circle
                      cx={a.x}
                      cy={a.y}
                      r={1.1}
                      fill="#22d3ee"
                    />
                    {/* label */}
                    <text
                      x={a.x + 2}
                      y={a.y + 0.8}
                      fill="#e5e7eb"
                      fontSize={2.1}
                      fontWeight={600}
                      className="select-none"
                    >
                      {a.name}
                    </text>
                  </motion.g>
                ))}

                {/* HQ marker on top */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
                >
                  <circle cx={HQ.x} cy={HQ.y} r={2.2} fill="#00b4d8" />
                  <circle cx={HQ.x} cy={HQ.y} r={1.1} fill="#0a1628" />
                  <text
                    x={HQ.x + 2.6}
                    y={HQ.y - 0.6}
                    fill="#00b4d8"
                    fontSize={1.8}
                    fontWeight={800}
                    letterSpacing={0.05}
                  >
                    SHOWROOM
                  </text>
                </motion.g>
              </svg>

              {/* Compass rose (corner accent) */}
              <div className="absolute right-3 top-3 rounded-md border border-white/10 bg-[#0a1628]/70 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#00b4d8] backdrop-blur">
                N &uarr;
              </div>

              {/* Corner accents */}
              <span
                aria-hidden
                className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[#00b4d8]"
              />
              <span
                aria-hidden
                className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#00b4d8]"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#00b4d8]"
              />
            </div>
          </motion.div>

          {/* Area chip list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              Cities we serve
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <motion.li
                  key={a.name}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease },
                    },
                  }}
                  whileHover={{ y: -3 }}
                  className="group"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition group-hover:border-[#00b4d8]/50 group-hover:bg-[#00b4d8]/10 group-hover:text-[#00b4d8]">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]"
                    />
                    {a.name}
                    {a.zip ? (
                      <span className="text-[10px] font-medium text-[#94a3b8] group-hover:text-[#00b4d8]/80">
                        {a.zip}
                      </span>
                    ) : null}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Address / CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f2035] via-[#112240] to-[#0f2035] p-6 shadow-[0_20px_50px_-25px_rgba(0,180,216,0.35)]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#00b4d8]/15 text-[#00b4d8]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 7 12 7 12s1 0 1 0 7-6.75 7-12a8 8 0 0 0-7-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00b4d8]">
                    Showroom & HQ
                  </div>
                  <p className="mt-1 font-display text-base font-bold leading-snug text-white">
                    {LP_CONTACT.address}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#94a3b8]">
                    {LP_CONTACT.hours}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href="#quote-form"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#00b4d8] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:bg-white"
                >
                  Book My Free Quote
                </a>
                <a
                  href={LP_CONTACT.phoneHref}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-[#00b4d8] hover:text-[#00b4d8]"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                    <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
                  </svg>
                  {LP_CONTACT.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
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
    </>
  );
}
