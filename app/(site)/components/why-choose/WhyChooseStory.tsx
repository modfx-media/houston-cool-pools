"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { STORY } from "../../../../lib/why-choose";

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyChooseStory() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <span className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            Our Story
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy)] md:text-5xl">
            {STORY.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="group relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-[var(--color-navy-deep)] shadow-[0_40px_90px_-40px_rgba(0,55,73,0.6)]"
        >
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${STORY.youTubeId}?autoplay=1&rel=0`}
              title={STORY.heading}
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
                src={`https://i.ytimg.com/vi/${STORY.youTubeId}/maxresdefault.jpg`}
                alt={STORY.heading}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-[var(--color-navy-deep)]/30 transition-colors group-hover:bg-[var(--color-navy-deep)]/20" />
              <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                <motion.span
                  className="absolute inset-0 rounded-full bg-white/40"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <svg viewBox="0 0 24 24" fill="currentColor" className="relative ml-1 h-8 w-8 text-[var(--color-pool)]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
