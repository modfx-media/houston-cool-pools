"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { PHONE_DISPLAY, PHONE_HREF } from "../../../../lib/navigation";
import { BUSINESS } from "../../../../lib/business";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_ID = "jMgjSEhaS70";
const VIDEO_POSTER = "/images/gallery/hd/estate-twilight.jpg";

/**
 * Redesigned hero for the contact page - a modern reimagining of the live
 * houstoncoolpools.com/contact.html header. Bright backyard backdrop, a tight
 * "Free Home Quote" headline, the at-a-glance contact rail, and a soft
 * scroll cue down into the form.
 */
export function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gallery/hd/silverman-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/72 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(0,124,182,0.4),transparent_60%)]" />

        <motion.div
          aria-hidden
          className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[var(--color-pool)]/15 blur-[160px]"
          animate={{ x: [0, 60, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-10 md:px-10 md:pb-24 md:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        {/* ---------- Left copy column ---------- */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]"
          >
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Get In Touch
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-[family-name:var(--font-display)] mx-auto mt-5 max-w-3xl text-4xl leading-[1.02] tracking-tight md:text-5xl lg:mx-0 lg:text-6xl"
          >
            Contact us for a{" "}
            <span className="italic text-[var(--color-gold-light)]">free Pool Quote</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg lg:mx-0"
          >
            Houston&apos;s premier pool builder since {BUSINESS.foundingDate}. Tell us about
            your backyard and we&apos;ll bring the design ideas, transparent pricing, and our
            100% on-budget guarantee.
          </motion.p>

          {/* Quick contact rail */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <HeroChip
              href={PHONE_HREF}
              label={PHONE_DISPLAY}
              icon={
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
              }
            />
            <HeroChip
              label={`${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion}`}
              icon={
                <>
                  <path d="M12 22s-7-7.58-7-13a7 7 0 1114 0c0 5.42-7 13-7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </>
              }
            />
          </motion.div>
        </div>

        {/* ---------- Right video column ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          {/* Offset gradient plate */}
          <span
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] bg-gradient-to-br from-[var(--color-gold)] via-[var(--color-gold-light)]/60 to-[var(--color-pool)] opacity-60"
          />
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-black/40 p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1 rounded-t-[28px] bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
            />
            <VideoFacade videoId={VIDEO_ID} poster={VIDEO_POSTER} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VideoFacade({ videoId, poster }: { videoId: string; poster: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[22px] bg-black">
      {playing ? (
        <iframe
          title="Houston Cool Pools - our 100% on-budget pool guarantee"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&color=white&playsinline=1&cc_load_policy=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play Houston Cool Pools video: our 100% on-budget pool guarantee"
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Poster image */}
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Gradient overlays for depth + text legibility */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/45"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_25%,rgba(0,0,0,0.55)_100%)]"
          />

          {/* Top-left brand chip */}
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/95 backdrop-blur-sm ring-1 ring-white/15">
            <motion.span
              aria-hidden
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]"
            />
            Houston Cool Pools
          </span>

          {/* Top-right runtime chip */}
          <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm ring-1 ring-white/15">
            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Our promise
          </span>

          {/* Center play button */}
          <span className="absolute inset-0 z-10 grid place-items-center">
            <span className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[var(--color-gold-light)]/45"
              />
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                className="absolute inset-0 rounded-full bg-[var(--color-pool)]/40"
              />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-[var(--color-gold-light)] via-[var(--color-gold)] to-[var(--color-pool)] text-[var(--color-navy-deep)] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8 sm:h-9 sm:w-9">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </span>

          {/* Bottom-left title block */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-5 text-left sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
              In writing &middot; Every quote
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight text-white sm:text-xl md:text-2xl">
              Our 100% On-Budget Pool Guarantee
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

function HeroChip({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
}) {
  const inner = (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-pool)]/20 text-[var(--color-pool)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          {icon}
        </svg>
      </span>
      {label}
    </span>
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
    >
      {href ? <a href={href}>{inner}</a> : inner}
    </motion.div>
  );
}
