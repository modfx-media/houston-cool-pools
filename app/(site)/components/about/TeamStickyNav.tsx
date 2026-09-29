"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TEAM } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Sticky chip-row that scroll-spies the visible team bio block and
 * lets visitors jump straight to a member.
 */
export function TeamStickyNav() {
  const [activeId, setActiveId] = useState<string>(TEAM[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = TEAM.map((m) => document.getElementById(m.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Jump to team member"
      className="sticky top-16 z-30 border-y border-[var(--color-navy-deep)]/10 bg-white/90 backdrop-blur-xl md:top-20"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3 md:px-10">
        <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-navy-deep)]/45 md:inline">
          Jump to:
        </span>
        {TEAM.map((m) => {
          const active = activeId === m.id;
          const firstName = m.name.split(" ")[0];
          return (
            <a
              key={m.id}
              href={`#${m.id}`}
              aria-current={active ? "true" : undefined}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                active
                  ? "border-transparent text-white"
                  : "border-[var(--color-navy-deep)]/15 bg-white text-[var(--color-navy-deep)] hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="team-active-pill"
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] shadow-[0_8px_24px_-8px_rgba(0,124,182,0.6)]"
                />
              ) : null}
              <span className="relative z-10">{firstName}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
