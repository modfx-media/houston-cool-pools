"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export type InfoHeroCrumb = { label: string; href?: string };

export type InfoHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumbs?: InfoHeroCrumb[];
  /** Optional full-bleed background photo behind the hero copy. */
  backgroundImage?: string;
  /** Optional alt text for the background image (defaults to empty for decorative). */
  backgroundAlt?: string;
  /** Brighten the background photo by reducing image dimming and dark overlay. */
  brightenBackground?: boolean;
};

export function InfoHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  backgroundImage,
  backgroundAlt = "",
  brightenBackground = false,
}: InfoHeroProps) {
  const imageOpacityClass = brightenBackground ? "opacity-80" : "opacity-40";
  const overlayGradientClass = brightenBackground
    ? "bg-gradient-to-b from-[var(--color-navy-deep)]/40 via-[var(--color-navy-deep)]/25 to-[var(--color-navy-deep)]/75"
    : "bg-gradient-to-b from-[var(--color-navy-deep)]/80 via-[var(--color-navy-deep)]/70 to-[var(--color-navy-deep)]";
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-32 text-white md:pt-40 lg:pt-44">
      {backgroundImage ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center ${imageOpacityClass}`}
          />
          <div className={`absolute inset-0 ${overlayGradientClass}`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,124,182,0.32),transparent_60%)]" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.28),transparent_65%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[var(--color-navy-deep)]/70 to-[var(--color-navy-deep)]" />
        </>
      )}

      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[6%] top-[38%] h-24 w-24 rounded-full bg-[var(--color-pool)]/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 12, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[10%] top-[24%] h-32 w-32 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-24 md:px-10 md:pb-32">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
          >
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden>/</span>}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/40 bg-[var(--color-gold-light)]/10 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)] backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease }}
          className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-6 max-w-3xl text-[17px] leading-relaxed text-white/80 sm:text-[18px]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 40 C 240 80, 480 0, 720 40 C 960 80, 1200 0, 1440 40 L 1440 80 L 0 80 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
