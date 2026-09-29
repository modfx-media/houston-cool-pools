"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type Particle = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
  size: number;
};

const COLORS = ["#00b4d8", "#0ea5e9", "#22d3ee", "#fbbf24", "#ffffff"];

// Deterministic pseudo-random so server and client render identical confetti.
function hash(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const PARTICLES: Particle[] = Array.from({ length: 36 }).map((_, i) => ({
  id: i,
  x: hash(i + 1) * 100,
  delay: hash(i + 7) * 0.6,
  duration: 3 + hash(i + 13) * 2.5,
  rotate: hash(i + 19) * 720 - 360,
  color: COLORS[i % COLORS.length],
  size: 6 + Math.round(hash(i + 23) * 6),
}));

export function TypHero() {
  // Confetti uses motion's inline style animations, which serialize
  // differently on the server vs. after client hydration (e.g. "6px" vs 6,
  // hex vs rgb()). Render it only after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-[#0a1628] px-4 py-14 text-center text-white sm:min-h-[80vh] sm:px-8 sm:py-28 lg:px-16 xl:px-20">
      {/* Pool background photo + dark navy gradient overlay for legibility */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/free-pool-quote/typ-hero-stidham.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/78 to-[#0a1628]"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,180,216,0.28),transparent_55%)]" />

      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {mounted &&
          PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              initial={{ y: -40, opacity: 0, rotate: 0 }}
              animate={{
                y: ["-10%", "110%"],
                opacity: [0, 1, 1, 0],
                rotate: p.rotate,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              className="absolute top-0 rounded-sm"
            />
          ))}
      </div>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="relative"
      >
        <svg
          viewBox="0 0 120 120"
          className="h-28 w-28 sm:h-32 sm:w-32"
          aria-hidden="true"
        >
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#00b4d8"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          />
          <motion.path
            d="M38 62l16 16 30-34"
            fill="none"
            stroke="#00b4d8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.9 }}
          />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease }}
        className="mt-8 font-display text-4xl font-extrabold leading-tight sm:text-6xl"
      >
        <span className="text-[#00b4d8]">We&apos;ll be in touch soon.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease }}
        className="mt-6 max-w-2xl text-base text-[#cbd5e1] sm:text-lg"
      >
        Thank you! A member of our team will reach out within one business day
        to schedule your free in-home pool quote. If you need to reach
        us sooner, give us a call directly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease }}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <a
          href={LP_CONTACT.phoneHref}
          className="inline-flex items-center justify-center rounded-full bg-[#00b4d8] px-7 py-3.5 text-sm font-semibold text-[#0a1628] transition hover:bg-white"
        >
          📞 Call {LP_CONTACT.phoneDisplay}
        </a>
      </motion.div>
    </section>
  );
}
