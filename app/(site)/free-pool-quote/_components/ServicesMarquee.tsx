"use client";

import Link from "next/link";
import { motion } from "motion/react";

/**
 * Infinite scrolling banner of every pool service Houston Cool Pools offers.
 * Rendered directly below the Google-Ads-LP hero so visitors immediately see
 * the breadth of services. Uses motion/react (project ships motion@12) - do
 * not swap for framer-motion.
 *
 * Marquee technique: list is rendered twice inside a flex row; the outer
 * track animates from x:0 to x:-50% linearly forever, so the second copy
 * seamlessly slides into place before the loop restarts. Pauses on hover.
 */

type Service = { label: string; icon: string };

const SERVICES: Service[] = [
  { label: "Custom Gunite Pool Construction", icon: "🏊" },
  { label: "Pool Remodels & Renovations", icon: "🛠" },
  { label: "Spas & Hot Tubs", icon: "♨️" },
  { label: "Waterfalls & Water Features", icon: "💧" },
  { label: "Fire Bowls & Fire Pits", icon: "🔥" },
  { label: "Outdoor Kitchens", icon: "🍳" },
  { label: "Pool Decking & Hardscape", icon: "🧱" },
  { label: "Pergolas & Outdoor Structures", icon: "⛱" },
  { label: "Sun Shelves & Beach Entries", icon: "🌊" },
  { label: "LED Lighting & Automation", icon: "💡" },
  { label: "Pool Cleaning & Service", icon: "🧽" },
  { label: "Pool Repair", icon: "🔧" },
  { label: "Fencing & Privacy Walls", icon: "🪵" },
  { label: "Pool Financing Available", icon: "💳" },
];

export function ServicesMarquee() {
  return (
    <section
      aria-label="Pool services offered by Houston Cool Pools"
      className="relative isolate overflow-hidden border-y border-[#00b4d8]/15 bg-gradient-to-r from-[#0a1628] via-[#0f2035] to-[#0a1628] py-4 sm:py-5"
    >
      {/* Soft cyan glow highlight running under the marquee */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,180,216,0.18),transparent_70%)]"
      />
      {/* Subtle top hairline accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent"
      />
      {/* Fade masks on left/right edges so items dissolve instead of clip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a1628] to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a1628] to-transparent sm:w-24"
      />

      {/* Marquee track - the parent hover state pauses the animation. */}
      <div className="group relative flex overflow-hidden">
        <motion.ul
          className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4 group-hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 55,
            ease: "linear",
            repeat: Infinity,
          }}
          aria-hidden={false}
        >
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <li key={`${s.label}-${i}`} className="flex-none">
              <Link
                href="#quote-form"
                data-quote-modal
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-all hover:border-[#00b4d8]/60 hover:bg-[#00b4d8]/12 hover:text-white sm:gap-3 sm:px-5 sm:py-2.5 sm:text-[13px]"
              >
                <span aria-hidden className="text-base sm:text-lg">
                  {s.icon}
                </span>
                <span className="whitespace-nowrap">{s.label}</span>
                <span
                  aria-hidden
                  className="hidden h-1 w-1 rounded-full bg-[#00b4d8] sm:inline-block"
                />
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
