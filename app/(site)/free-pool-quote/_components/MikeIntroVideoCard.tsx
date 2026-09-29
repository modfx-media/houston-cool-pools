"use client";

import { useState } from "react";
import { motion } from "motion/react";

/**
 * Lightweight "lite-YouTube" style intro-video card for the LP.
 * Shows a poster + play button on first paint (zero YouTube JS/network cost)
 * and mounts the real iframe only after the visitor clicks Play - keeps the
 * Google-Ads LP fast to first-interactive.
 */

const YOUTUBE_ID = "_R6HQT6DHGA";
const POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const POSTER_FALLBACK = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export function MikeIntroVideoCard() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="absolute inset-0 h-full w-full">
      {playing ? (
        <iframe
          src={EMBED_SRC}
          title="Meet Mike Lopez - Houston Cool Pools intro"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play intro video from Mike Lopez"
          className="group relative block h-full w-full cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4d8] focus-visible:ring-offset-2"
        >
          {/* Poster (plain <img> - YouTube i.ytimg.com not in next/image allowlist) */}
          <motion.img
            src={POSTER}
            alt="Meet Mike Lopez, owner of Houston Cool Pools"
            onError={(e) => {
              const el = e.currentTarget;
              if (!el.dataset.fallback) {
                el.dataset.fallback = "1";
                el.src = POSTER_FALLBACK;
              }
            }}
            loading="lazy"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark vignette so the play button pops */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

          {/* Center play button + pulse rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#00b4d8]"
              />
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6,
                }}
                className="absolute inset-0 rounded-full bg-[#00b4d8]"
              />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-[#0a1628] shadow-[0_20px_50px_-10px_rgba(0,180,216,0.65)] transition-transform group-hover:scale-105 sm:h-24 sm:w-24">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-9 w-9 fill-current sm:h-11 sm:w-11"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom caption strip */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00b4d8]">
                Watch a message from
              </div>
              <div className="font-[family-name:var(--font-display)] mt-0.5 text-lg font-extrabold leading-tight text-white sm:text-xl">
                Mike Lopez, Owner
              </div>
            </div>
            <span className="hidden shrink-0 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur sm:inline-block">
              1 min
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
