"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CountUp } from "../why-choose/CountUp";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 390, suffix: "+", label: "Real Project Photos" },
  { value: 30, suffix: "+", label: "Years of Craftsmanship" },
  { value: 100, suffix: "%", label: "Custom Designed" },
  { value: 6, label: "Houston Areas Served" },
];

/** Rising-bubble decorations for the hero (water motion graph). */
const BUBBLES = [
  { left: "6%", size: 14, delay: 0, dur: 12 },
  { left: "18%", size: 8, delay: 1.6, dur: 14 },
  { left: "31%", size: 20, delay: 0.5, dur: 11 },
  { left: "47%", size: 10, delay: 2.4, dur: 15 },
  { left: "62%", size: 16, delay: 1, dur: 13 },
  { left: "76%", size: 9, delay: 2.9, dur: 10 },
  { left: "90%", size: 22, delay: 0.8, dur: 12 },
];

export function ClientShowroomHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/client-showroom/photo-0001.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/75 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,124,182,0.35),transparent_60%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[var(--color-pool)]/15 blur-[160px]"
          animate={{ x: [0, 60, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[160px]"
          animate={{ x: [0, -50, 0], opacity: [0.7, 0.4, 0.7] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {BUBBLES.map((b, i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full border border-white/20 bg-white/5"
            style={{ left: b.left, width: b.size, height: b.size }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -480, opacity: [0, 0.7, 0] }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-10 text-center md:px-10 md:pb-20 md:pt-14">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link href="/pool-information" className="transition-colors hover:text-white">
            Pool Information
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-[var(--color-gold-light)]">Client Showroom</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="mt-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
        >
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          Real Backyards. Real Results.
          <span className="h-px w-8 bg-[var(--color-pool)]/60" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease }}
          className="font-[family-name:var(--font-display)] mx-auto mt-5 max-w-3xl text-4xl leading-[1.04] tracking-tight md:text-6xl lg:text-7xl"
        >
          Client <span className="italic text-[var(--color-gold-light)]">Showroom</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26, ease }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          A living photo showroom of finished Houston-area pools, spas and outdoor living
          spaces we&apos;ve built - straight from the backyard, no filters needed.
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.li
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md md:p-6"
            >
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="font-[family-name:var(--font-display)] block text-3xl text-white md:text-5xl"
              />
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                {s.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_36px_-10px_rgba(0,124,182,0.65)] transition-all hover:-translate-y-0.5"
          >
            Book a Call
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Call {PHONE_DISPLAY}
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 leading-[0]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[60px] w-full md:h-[90px]" fill="none">
          <path
            d="M0 80L60 74.7C120 69 240 59 360 64C480 69 600 91 720 96C840 101 960 91 1080 77.3C1200 64 1320 48 1380 40L1440 32V120H0V80Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
