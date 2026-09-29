"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { TeamMember } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * One member's bio rendered as an alternating two-column layout:
 *
 *   ┌───────────────┬─────────────────────────┐
 *   │  PORTRAIT     │  Eyebrow + Name         │
 *   │  card         │  Title · years          │
 *   │  + chip       │  Pull quote             │
 *   │               │  Bio paragraphs         │
 *   │               │  Fun fact / saying      │
 *   │               │  Dream pool callout     │
 *   └───────────────┴─────────────────────────┘
 *
 * `flipped` swaps left/right on alternating members for visual rhythm.
 * Animates in on scroll.
 */
export function TeamBioBlock({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const initials = member.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      id={member.id}
      className="scroll-mt-32 border-t border-[var(--color-navy-deep)]/8 first:border-t-0"
    >
      <div
        className={`mx-auto grid max-w-7xl items-start gap-10 px-6 py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:px-10 md:py-24 ${
          flipped ? "md:[&>:first-child]:order-2" : ""
        }`}
      >
        {/* ─── Portrait column ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-full max-w-sm md:max-w-md"
        >
          <div className="relative">
            {/* Glow halo */}
            <motion.div
              aria-hidden
              className={`absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-pool)]/25 via-transparent to-[var(--color-gold-light)]/15 blur-2xl ${
                flipped ? "md:from-[var(--color-gold-light)]/15 md:to-[var(--color-pool)]/25" : ""
              }`}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[var(--color-navy-deep)] shadow-[0_30px_60px_-25px_rgba(0,55,73,0.5)] ring-1 ring-black/10">
              {member.portraitPending || !member.portrait ? (
                <Placeholder initials={initials} name={member.name} />
              ) : (
                <Image
                  src={member.portrait}
                  alt={`${member.name}, ${member.title}`}
                  fill
                  sizes="(min-width: 768px) 35vw, 80vw"
                  className="object-cover object-top"
                />
              )}

              {/* Bottom gradient + name */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/10 to-transparent" />

              {/* Years badge - top-right */}
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-[8px] text-white">
                  ★
                </span>
                {member.yearsExperience}
              </span>

              {/* Bottom signature */}
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="font-[family-name:var(--font-display)] text-2xl leading-tight">
                  {member.name}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/75">
                  {member.title}
                </p>
              </div>
            </div>

            {/* Decorative ring */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] border border-[var(--color-pool)]/25"
              animate={{ rotate: [0, 0.6, -0.6, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* ─── Copy column ─── */}
        <motion.div
          initial={{ opacity: 0, x: flipped ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            {String(index + 1).padStart(2, "0")} - Meet
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-3 text-4xl leading-tight tracking-tight text-[var(--color-navy-deep)] md:text-5xl">
            {member.name}
          </h2>
          <p className="mt-2 text-base italic text-[var(--color-pool)] md:text-lg">
            {member.title}
          </p>

          {/* Pull quote */}
          <blockquote className="mt-6 border-l-2 border-[var(--color-pool)] pl-5 text-base italic leading-relaxed text-[var(--color-navy-deep)]/80 md:text-lg">
            “{member.quote}”
          </blockquote>

          {/* Bio paragraphs */}
          <div className="mt-7 space-y-5 text-[var(--color-navy-deep)]/75">
            {member.bio.map((b) => (
              <div key={b.heading}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)]/55">
                  {b.heading}
                </h3>
                <p className="mt-2 text-base leading-relaxed md:text-[1.05rem]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>

          {/* Quick-info grid: fun fact + saying + dream pool */}
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {member.funFact ? (
              <InfoTile
                eyebrow="Fun fact"
                body={member.funFact}
                accent="gold"
              />
            ) : null}
            {member.favoriteSaying ? (
              <InfoTile
                eyebrow="Favorite saying"
                body={`“${member.favoriteSaying}”`}
                accent="pool"
              />
            ) : null}
          </div>

          <div className="mt-3">
            <DreamPool dream={member.dreamPool} />
          </div>
        </motion.div>
      </div>
    </article>
  );
}

/* -------------------- placeholder -------------------- */

function Placeholder({ initials, name }: { initials: string; name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-navy-deep)] via-[var(--color-pool-deep)] to-[var(--color-pool)] text-white">
      <span className="font-[family-name:var(--font-display)] text-7xl font-light tracking-tight text-white/95">
        {initials}
      </span>
      <span className="mt-4 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/80 backdrop-blur">
        Photo coming soon
      </span>
      <span className="sr-only">{name}</span>
    </div>
  );
}

/* -------------------- info tile -------------------- */

function InfoTile({
  eyebrow,
  body,
  accent,
}: {
  eyebrow: string;
  body: string;
  accent: "pool" | "gold";
}) {
  const accentClass =
    accent === "gold"
      ? "text-[var(--color-gold-light)] bg-[var(--color-gold-light)]/10"
      : "text-[var(--color-pool)] bg-[var(--color-pool)]/10";

  return (
    <div className="rounded-2xl border border-[var(--color-navy-deep)]/10 bg-white p-4 transition-colors hover:border-[var(--color-pool)]/30">
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] ${accentClass}`}
      >
        {eyebrow}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-navy-deep)]/80">
        {body}
      </p>
    </div>
  );
}

/* -------------------- dream pool callout -------------------- */

function DreamPool({ dream }: { dream: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-navy-deep)] via-[var(--color-pool-deep)] to-[var(--color-pool)] p-5 text-white shadow-[0_20px_50px_-25px_rgba(0,124,182,0.55)]">
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{ width: "50%" }}
      />
      <div className="relative flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
            <path
              d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
            Dream pool must-have
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/90">{dream}</p>
        </div>
      </div>
    </div>
  );
}
