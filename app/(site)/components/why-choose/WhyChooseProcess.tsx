"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  PROCESS_BANNER,
  PROCESS_VIDEO,
  SHOWCASE_IMAGES,
} from "../../../../lib/why-choose";

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyChooseProcess() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-16 text-white md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.22),transparent_55%)]" />
      <motion.div
        aria-hidden
        className="absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-[var(--color-pool)]/12 blur-[140px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        {/* ----- Banner headline ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Our Process
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-xl leading-snug md:text-2xl">
            {PROCESS_BANNER}
          </h2>
        </motion.div>

        {/* ----- Layout: video + showcase cards ----- */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]"
          >
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${PROCESS_VIDEO.youTubeId}?autoplay=1&rel=0`}
                title="Houston Cool Pools process video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 h-full w-full"
                aria-label="Play video"
              >
                <img
                  src={`https://i.ytimg.com/vi/${PROCESS_VIDEO.youTubeId}/hqdefault.jpg`}
                  alt="Houston Cool Pools process video"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[var(--color-navy-deep)]/35 transition-colors group-hover:bg-[var(--color-navy-deep)]/25" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/40"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <svg viewBox="0 0 24 24" fill="currentColor" className="relative ml-0.5 h-7 w-7 text-[var(--color-pool)]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </motion.div>

          {/* Showcase cards - stacked, compact, clickable like the live "click here" links */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {SHOWCASE_IMAGES.map((img, i) => {
              const inner = (
                <div className="relative aspect-[899/449] w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              );
              const cardClass =
                "group relative block overflow-hidden rounded-2xl border border-white/10 shadow-lg";
              return (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.1 }}
                >
                  {img.external ? (
                    <a
                      href={img.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={img.href} className={cardClass}>
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
