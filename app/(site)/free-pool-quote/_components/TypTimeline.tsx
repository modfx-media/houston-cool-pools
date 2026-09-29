"use client";

import { motion } from "motion/react";
import { LP_TIMELINE } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function TypTimeline() {
  return (
    <section className="bg-[#0f2035] py-14 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
            Here&apos;s what{" "}
            <span className="text-[#00b4d8]">happens next</span>
          </h2>
        </div>

        <ol className="relative mt-14 space-y-10 border-l border-white/10 pl-8">
          {LP_TIMELINE.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="relative"
            >
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border border-[#00b4d8]/40 bg-[#0a1628] text-xs font-bold text-[#00b4d8]">
                {i + 1}
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
