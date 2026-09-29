"use client";

import { motion } from "motion/react";
import { LP_OFFER_CHECKLIST } from "../_lib/data";
import { MikeIntroVideoCard } from "./MikeIntroVideoCard";

const ease = [0.22, 1, 0.36, 1] as const;

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const TRUST_TAGS = [
  "100% Free",
  "No obligation",
  "1 business day response",
] as const;

export function Offer() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#f5f8fa] via-white to-[#eef3f7] py-14 sm:py-24">
      <BackdropGraphics />

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-4 sm:gap-14 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-16 xl:px-20">
        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="relative"
        >
          {/* outer glow halo */}
          <motion.div
            aria-hidden
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.04, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#00b4d8]/35 via-transparent to-[#0ea5e9]/25 blur-2xl"
          />

          {/* slow-rotating dashed ring */}
          <motion.svg
            aria-hidden
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#00b4d8"
              strokeWidth="1"
              strokeDasharray="3 12"
            />
          </motion.svg>

          {/* Video card (replaces the previous still photo) */}
          <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-white/40 bg-black shadow-[0_30px_70px_-20px_rgba(15,32,53,0.35)]">
            <MikeIntroVideoCard />

            {/* corner accents */}
            <span
              aria-hidden
              className="absolute left-4 top-4 h-3 w-3 border-l-2 border-t-2 border-[#00b4d8]/70"
            />
            <span
              aria-hidden
              className="absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-[#00b4d8]/70"
            />
            <span
              aria-hidden
              className="absolute bottom-4 left-4 h-3 w-3 border-b-2 border-l-2 border-[#00b4d8]/70"
            />
            <span
              aria-hidden
              className="absolute bottom-4 right-4 h-3 w-3 border-b-2 border-r-2 border-[#00b4d8]/70"
            />
          </div>

          {/* Mike's promise pull-quote sits directly below the video card */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="relative mt-8 overflow-hidden rounded-2xl border border-[#00b4d8]/25 bg-gradient-to-br from-white via-[#f0fbff] to-white p-6 shadow-[0_18px_48px_-24px_rgba(0,180,216,0.35)] sm:p-7"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#00b4d8]/12 blur-2xl"
            />
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-current text-[#00b4d8]"
            >
              <path d="M7.17 6C4.87 6 3 7.87 3 10.17V18h7.17V10.17H6.5C6.5 8.7 7.7 7.5 9.17 7.5V6h-2zm10 0c-2.3 0-4.17 1.87-4.17 4.17V18h7.17V10.17H16.5c0-1.47 1.2-2.67 2.67-2.67V6h-2z" />
            </svg>
            <blockquote className="mt-4 font-display text-xl font-semibold leading-snug text-[#0a1628] sm:text-2xl">
              &ldquo;Every quote I hand a homeowner is the quote they sign,
              and it&apos;s the price they pay - in writing, with a 100%
              on-budget guarantee.&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 text-sm">
              <div>
                <div className="font-bold text-[#0a1628]">Mike Lopez</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
                  Owner · 30+ Years
                </div>
              </div>
            </figcaption>
          </motion.figure>

          {/* Proof stat row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-6 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              { value: "30+", label: "Years" },
              { value: "1,600+", label: "Pools Built" },
              { value: "A+", label: "BBB Rated" },
            ].map((s) => (
              <div
                key={s.label}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm backdrop-blur"
              >
                <div className="font-display text-2xl font-extrabold leading-none text-[#0a1628] sm:text-3xl">
                  <span className="bg-gradient-to-r from-[#00b4d8] to-[#0ea5e9] bg-clip-text text-transparent">
                    {s.value}
                  </span>
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200/70 pt-5 text-sm text-slate-600"
          >
            <span className="font-semibold text-[#0a1628]">Ready when you are.</span>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-1.5 font-bold text-[#00b4d8] underline-offset-4 hover:underline"
            >
              Start with a free quote
              <span aria-hidden>&rarr;</span>
            </a>
          </motion.div>
        </motion.div>

        {/* CONTENT SIDE */}
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              The Free Quote Includes
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl lg:text-6xl"
          >
            Everything you need to say{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                YES
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent"
              />
            </span>{" "}
            before you spend a dime.
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Real numbers, real designs, real timelines. Zero pressure. We
            send you home with everything you need to decide on your own terms.
          </motion.p>

          {/* Checklist as 2-col card grid */}
          <motion.ul
            variants={list}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {LP_OFFER_CHECKLIST.map((c) => (
              <motion.li
                key={c}
                variants={item}
                whileHover={{ y: -2 }}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white/70 p-3.5 backdrop-blur transition hover:border-[#00b4d8]/40 hover:bg-white"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] text-white shadow-sm">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden
                  >
                    <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 8.9a1 1 0 0 1 1.4-1.4l4 4 6.6-6.6a1 1 0 0 1 1.4.4Z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-[#0a1628]">{c}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA + trust tags */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#quote-form"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0ea5e9] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#00b4d8]/30 transition hover:shadow-xl hover:shadow-[#00b4d8]/40"
            >
              Get My Free Quote
              <span className="inline-block transition group-hover:translate-x-1">
                &rarr;
              </span>
            </a>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {TRUST_TAGS.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#00b4d8]" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Backdrop motion graphics ---------- */

function BackdropGraphics() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,22,40,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-40, 30, -40], y: [-20, 30, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-8%] top-[6%] h-[400px] w-[400px] rounded-full bg-[#00b4d8]/18 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [40, -30, 40], y: [20, 70, 20] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-8%] bottom-[5%] h-[440px] w-[440px] rounded-full bg-[#22d3ee]/14 blur-3xl"
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
