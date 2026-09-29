"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PILLARS } from "../../../../lib/why-choose";
import { PillarCard } from "./PillarCard";

const ease = [0.22, 1, 0.36, 1] as const;

/** The final two pillars from the live page: Ease of Doing Business and
 *  Always in the Know. */
export function WhyChooseExtras() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white md:py-24">
      {/* Pool background (matches the Financing section styling) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/gallery/hd/estate-luxe.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/75 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,124,182,0.35),transparent_60%)]" />
      </div>

      <span className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/20 blur-[140px]" />
      <span className="pointer-events-none absolute -right-40 bottom-10 h-[380px] w-[380px] rounded-full bg-[var(--color-gold-light)]/12 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-pool)]">
            Simple &amp; Transparent
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-5xl">
            We make it{" "}
            <span className="italic text-[var(--color-gold-light)]">easy</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PILLARS.slice(3).map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
