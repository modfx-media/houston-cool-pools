"use client";

import { motion } from "motion/react";
import { AnimatedDarkBackdrop } from "./AnimatedDarkBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

const VIDEOS = [
  {
    id: "CntmSdpO0QQ",
    title: "How Long Does It Take to Build a Swimming Pool?",
    tag: "Timeline",
  },
  {
    id: "Z6jU28FnpJg",
    title: "Your Pool Construction Is Almost Complete!",
    tag: "Almost Done",
  },
] as const;

/**
 * Homepage process section. Two YouTube videos side by side, embedded directly
 * (real YouTube thumbnails + titles + play button) with `modestbranding` so
 * the surrounding chrome stays clean.
 */
export function VideoShowcase() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
      <AnimatedDarkBackdrop />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* ----- Header ----- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            Know What to Expect
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-5 text-4xl leading-[1.05] tracking-tight md:text-5xl">
            See how your dream pool{" "}
            <span className="italic text-[var(--color-gold-light)]">comes to life.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            From your initial design consultation to the final walkthrough, these
            short videos answer the most common questions about the construction
            process so you&rsquo;ll know exactly what to expect every step of the
            way.
          </p>
        </motion.div>

        {/* ----- Two embedded videos side by side ----- */}
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {VIDEOS.map((v, i) => (
            <motion.figure
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-x-2 translate-y-2 rounded-[20px] bg-gradient-to-br from-[var(--color-pool)] via-[var(--color-pool-deep)] to-[var(--color-navy-deep)] opacity-60"
              />
              <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-gold)]"
                />
                <div className="relative aspect-video w-full">
                  <iframe
                    title={v.title}
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&iv_load_policy=3&color=white&playsinline=1`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <figcaption className="border-t border-white/5 bg-[var(--color-navy-deep)] px-5 py-4 md:px-6 md:py-5">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                    {v.tag}
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight text-white md:text-xl">
                    {v.title}
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
