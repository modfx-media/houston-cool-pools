"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { TeamMember } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic magazine-cover hero for the About page.
 *
 *   ┌─────────────────────────┬──────────────────┐
 *   │ eyebrow                  │                  │
 *   │ HUGE NAME HEADLINE       │   PORTRAIT CARD  │
 *   │ role · subtitle          │                  │
 *   │ short bio paragraph      │   floating chip  │
 *   │ stat strip               │                  │
 *   │ CTAs                     │                  │
 *   └─────────────────────────┴──────────────────┘
 *
 * Notes
 * - At md+ the grid uses underscore-separated arbitrary values so Tailwind
 *   actually emits `grid-template-columns: 1.1fr 1fr` (commas don't compile).
 * - Portrait gets parallax drift + scale on scroll and an animated frame.
 */
export function OwnerHero({ owner }: { owner: TeamMember }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48"
    >
      {/* ─── Background ambience ─── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(0,124,182,0.45),transparent_55%)]" />
        <motion.div
          className="absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full bg-[var(--color-pool)]/25 blur-[160px]"
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[var(--color-pool-deep)]/30 blur-[160px]"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      {/* ─── Foreground ─── */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-10 md:grid-cols-[1.1fr_1fr] md:gap-14 md:px-10 md:pb-28 md:pt-14 lg:gap-20">
        {/* ─── Copy column ─── */}
        <div className="order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
          >
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Get To Know Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-[family-name:var(--font-display)] mt-5 text-5xl leading-[0.98] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="block">Meet</span>
            <span className="block bg-gradient-to-r from-white via-[var(--color-gold-light)] to-[var(--color-pool)] bg-clip-text text-transparent">
              {owner.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-4 inline-flex items-center gap-3 text-base text-white/70 md:text-lg"
          >
            <span className="h-1 w-1 rounded-full bg-[var(--color-gold-light)]" />
            <span className="italic text-[var(--color-gold-light)]">{owner.title}</span>
            <span className="text-white/35">/</span>
            <span>Houston Cool Pools</span>
          </motion.p>

          {/* 5-star rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-[var(--color-gold-light)]/25 bg-white/[0.04] px-4 py-2 backdrop-blur-sm"
          >
            <span
              className="flex items-center gap-1"
              aria-label="5 out of 5 star rating from verified customers"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={i}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </motion.svg>
              ))}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85">
              5.0 &middot; Verified reviews
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
          >
            For more than 30 years, Mike has been designing and building the kind of
            backyards Houston families gather around. {owner.yearsExperience} in the
            pool industry, a relentless eye for craft, and a soft spot for lazy
            rivers and Texas summer nights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_14px_36px_-10px_rgba(0,124,182,0.65)] transition-all hover:-translate-y-0.5"
            >
              Work With Mike
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/about/team"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Meet The Team
            </Link>
          </motion.div>
        </div>

        {/* ─── Portrait column ─── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-md md:justify-self-end"
        >
          <div className="relative">
            {/* Decorative behind-card */}
            <motion.div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-pool)]/30 via-transparent to-[var(--color-gold-light)]/20 blur-2xl"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
              <motion.div
                style={{ y: portraitY, scale: portraitScale }}
                className="absolute inset-0"
              >
                <Image
                  src={owner.portrait}
                  alt={`${owner.name}, ${owner.title}`}
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover object-[50%_25%]"
                />
              </motion.div>

              {/* Bottom veil for caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/10 to-transparent" />

              {/* Top corner: animated owner badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease }}
                className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white">
                  ★
                </span>
                {owner.title}
              </motion.div>

              {/* Top-right: years circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.85, ease }}
                className="absolute right-5 top-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-center text-white shadow-xl ring-2 ring-white/20"
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl leading-none">
                    30+
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-white/85">
                    Years
                  </p>
                </div>
              </motion.div>

              {/* Bottom signature */}
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="font-[family-name:var(--font-display)] text-2xl leading-tight md:text-3xl">
                  {owner.name}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/70">
                  Pool builder · Houston, TX
                </p>
              </div>

              {/* Soft inner highlight */}
              <span className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5" />
            </div>

            {/* Decorative rotating ring */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.25rem] border border-[var(--color-pool)]/30"
              animate={{ rotate: [0, 0.8, -0.8, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
