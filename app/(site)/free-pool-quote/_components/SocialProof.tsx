"use client";

import { motion } from "motion/react";

const ITEMS = [
  "BBB A+ RATED",
  "BEST OF HOUZZ",
  "ANGIE'S LIST SUPER SERVICE AWARD",
  "SBA EMERGING LEADERS AWARD",
  "BBB GOLD STAR AWARD",
  "GHBA & NAHB MEMBER",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function SocialProof() {
  return (
    <section className="border-y border-white/5 bg-[#0f2035] py-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 sm:px-8 lg:px-16 xl:px-20"
      >
        {ITEMS.map((label) => (
          <motion.span
            key={label}
            variants={itemVariants}
            className="text-[11px] font-semibold tracking-[0.22em] text-[#94a3b8] sm:text-xs"
          >
            ★ {label}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
