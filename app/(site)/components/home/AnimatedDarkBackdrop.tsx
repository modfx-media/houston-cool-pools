"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

/**
 * Animated motion-graphics backdrop for dark navy sections.
 * Layers (back → front):
 *   1. Drifting blur orbs (cyan + pool-deep) that slowly travel
 *   2. Slow-rotating conic light spokes
 *   3. Faint dot grid that pulses
 *   4. Floating bubble particles drifting upward
 *   5. Smooth SVG wave drifting along the bottom edge
 *
 * Self-contained, pointer-events-none, sits absolutely inside a
 * `relative overflow-hidden` parent section.
 */
export function AnimatedDarkBackdrop({
  variant = "default",
}: {
  variant?: "default" | "soft";
}) {
  // Stable random positions for bubble particles (seeded by index)
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const seed = (i + 1) * 9301;
        const rand = (n: number) =>
          (((seed * (n + 1)) % 100) + 100) % 100; // 0–99
        return {
          left: rand(1),
          size: 6 + (rand(2) % 12),
          delay: (rand(3) % 60) / 10,
          duration: 12 + (rand(4) % 10),
          drift: (rand(5) % 40) - 20,
        };
      }),
    [],
  );

  const intensity = variant === "soft" ? 0.55 : 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* ── Layer 1: Drifting blur orbs ─────────────────────────────── */}
      <motion.span
        className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[var(--color-pool)]/22 blur-[170px]"
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -40, 30, 0],
          opacity: [0.55 * intensity, 0.9 * intensity, 0.55 * intensity],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -right-32 bottom-1/4 h-[480px] w-[480px] rounded-full bg-[var(--color-pool-deep)]/35 blur-[170px]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -20, 0],
          opacity: [0.7 * intensity, 0.45 * intensity, 0.7 * intensity],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-1/2 top-2/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[var(--color-gold-light)]/12 blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35 * intensity, 0.6 * intensity, 0.35 * intensity],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Layer 2: Slow conic light spokes ────────────────────────── */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--color-pool) 30deg, transparent 60deg, transparent 180deg, var(--color-gold-light) 210deg, transparent 240deg, transparent 360deg)",
          maskImage:
            "radial-gradient(circle at center, black 0%, black 35%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, black 35%, transparent 70%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Layer 3: Faint dot grid ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Layer 4: Floating bubbles ───────────────────────────────── */}
      <div className="absolute inset-0">
        {bubbles.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[var(--color-gold-light)]/30 ring-1 ring-[var(--color-gold-light)]/40"
            style={{
              left: `${b.left}%`,
              bottom: "-40px",
              width: b.size,
              height: b.size,
              boxShadow:
                "0 0 12px 2px rgba(79,195,224,0.35), inset 0 0 6px rgba(255,255,255,0.4)",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, b.drift, -b.drift / 2, 0],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Layer 5: Drifting wave at bottom ────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden opacity-[0.35]">
        <motion.svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-y-0 h-full w-[200%] text-[var(--color-pool)]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M0 90 C 180 40, 360 140, 540 90 S 900 40, 1080 90 1440 140 1620 90 1980 40 2160 90 2520 140 2700 90 2880 40 2880 90 L 2880 160 L 0 160 Z"
            fill="currentColor"
            opacity="0.55"
          />
        </motion.svg>
        <motion.svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-y-0 h-full w-[200%] text-[var(--color-pool-deep)]"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M0 110 C 200 60, 400 150, 600 110 S 1000 60, 1200 110 1600 150 1800 110 2200 60 2400 110 2800 150 2880 110 L 2880 160 L 0 160 Z"
            fill="currentColor"
            opacity="0.7"
          />
        </motion.svg>
      </div>
    </div>
  );
}
