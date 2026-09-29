"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SpecsShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] px-6 py-24 text-white md:px-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.22),transparent_55%)]" />
        <motion.div
          aria-hidden
          className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-[var(--color-pool)]/10 blur-[140px]"
          animate={{ y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
            See It For Yourself
            <span className="h-px w-8 bg-[var(--color-pool)]/60" />
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-5xl">
            Quality You Can Watch
          </h2>
        </motion.div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Wet Edge swimming pool water color video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.7)]"
          >
            <iframe
              src="https://www.youtube-nocookie.com/embed/5mntkenhJSE?rel=0"
              title="Swimming Pool Water Color"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </motion.div>

          {/* Showcase image cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            <motion.a
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              href="https://houstoncoolpools.com/pdfs/10-Steps-to-the-Perfect-Pool-hcp.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-3xl border border-white/10 shadow-lg"
            >
              <div className="relative aspect-[899/449] w-full">
                <Image
                  src="/images/pool-specifications/tensteps.png"
                  alt="Ten Steps to a Perfect Pool"
                  fill
                  sizes="(max-width: 1024px) 50vw, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-[var(--color-navy-deep)]/0 transition-colors group-hover:bg-[var(--color-navy-deep)]/15" />
              </div>
            </motion.a>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Link
                href="/pool-remodel"
                className="group relative block overflow-hidden rounded-3xl border border-white/10 shadow-lg"
              >
                <div className="relative aspect-[899/449] w-full">
                  <Image
                    src="/images/pool-specifications/poolreno.jpg"
                    alt="Houston Cool Pools pool renovation project"
                    fill
                    sizes="(max-width: 1024px) 50vw, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[var(--color-navy-deep)]/0 transition-colors group-hover:bg-[var(--color-navy-deep)]/15" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
