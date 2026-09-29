"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEO_ID = "y48ObILPIwo";
const VIDEO_POSTER = "/images/gallery/hd/estate-twilight.jpg";

/**
 * Video section on the pool-remodel page. Uses the same YouTube facade
 * pattern as the contact hero so the transformation clip is embedded once
 * a visitor clicks - keeping first-load light while still highlighting a
 * real Houston Cool Pools remodel.
 */
export function PoolRemodelVideo() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] px-6 py-20 text-white md:px-10 md:py-24">
      {/* Ambient glows */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[var(--color-pool)]/20 blur-[160px]"
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[var(--color-gold-light)]/15 blur-[160px]"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
        {/* ----- Left copy ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/30 bg-white/5 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
            Remodel Tour
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Watch a{" "}
            <span className="italic text-[var(--color-gold-light)]">
              Custom Pool Remodel
            </span>{" "}
            come to life.
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/75">
            Take a two-minute tour through one of our recent Houston-area
            transformations - new tile, coping, plaster, decking and lighting,
            all delivered on-budget and on-time.
          </p>
        </motion.div>

        {/* ----- Right video ----- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
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
          title="Houston Cool Pools - custom pool remodel"
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
          aria-label="Play Houston Cool Pools custom pool remodel video"
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Gradient overlays */}
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
            Watch tour
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
              See our work &middot; 2 min tour
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight text-white sm:text-xl md:text-2xl">
              Custom Pool Remodel
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
