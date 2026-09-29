"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Autoplaying, muted YouTube embed placed right below the TYP hero.
 * Uses youtube-nocookie + rel=0 to keep viewers on-page (no related-channel
 * suggestions on pause; native controls are kept for accessibility).
 *
 * A custom poster image is shown over the iframe until the video begins
 * autoplaying (fades out shortly after the iframe loads).
 */
export function TypVideo() {
  const videoId = "jMgjSEhaS70";
  const start = 23;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    start: String(start),
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    controls: "1",
  });
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  const [posterVisible, setPosterVisible] = useState(true);

  const handleIframeLoad = () => {
    // Autoplay typically begins ~500-900ms after the iframe reports loaded.
    // Give it a moment, then fade the poster out.
    window.setTimeout(() => setPosterVisible(false), 900);
  };

  return (
    <section
      aria-label="Welcome video"
      className="relative w-full bg-[#0a1628] py-14 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,180,216,0.15),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00b4d8]">
            While you wait
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Your Price, Locked In.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#cbd5e1] sm:text-base">
            Watch how our on-budget promise keeps surprises off your final bill
            - from the first quote to the last splash.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] sm:mt-10"
        >
          <div className="relative aspect-video w-full">
            <iframe
              src={src}
              title="Houston Cool Pools"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={handleIframeLoad}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
                posterVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src="/images/free-pool-quote/typ-page-video-poster.png"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
