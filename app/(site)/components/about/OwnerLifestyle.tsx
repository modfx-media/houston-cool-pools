"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { TeamMember } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "Outside of work" section: clean editorial gallery split into a hero
 * row (one large landscape + the portrait photo standing tall beside it)
 * and a 3-up secondary row, paired with hobby chips and a dream-pool callout.
 */
export function OwnerLifestyle({ owner }: { owner: TeamMember }) {
  const photos = owner.photos ?? [];
  const hobbies = owner.hobbies ?? [];
  // Split landscape vs portrait so the layout never crops awkwardly.
  const landscapes = photos.filter((p) => p.orientation !== "portrait");
  const portrait = photos.find((p) => p.orientation === "portrait");

  // Hero row: first landscape + the portrait standing beside it.
  const heroLandscape = landscapes[0];
  // Secondary row: remaining 3 landscapes.
  const secondary = landscapes.slice(1, 4);

  return (
    <section className="relative bg-[#f5f9fb] py-20 md:py-28">
      {/* Soft top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-pool)]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Outside The Office
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight text-[var(--color-navy-deep)] md:text-5xl">
            Family. Friends.{" "}
            <span className="italic text-[var(--color-pool)]">The great outdoors.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-navy-deep)]/70 md:text-lg">
            When Mike isn&apos;t designing pools, you&apos;ll find him at one - grilling
            with the family, traveling to the next ballpark, or out on the bay.
          </p>
        </motion.div>

        {/* ---- Hero row: large landscape + portrait standing beside it ---- */}
        {heroLandscape && portrait && (
          <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
            <PhotoCard
              photo={heroLandscape}
              index={0}
              aspect="aspect-[4/3]"
              spanClass="md:col-span-8"
            />
            <PhotoCard
              photo={portrait}
              index={1}
              aspect="aspect-[3/4]"
              spanClass="md:col-span-4"
            />
          </div>
        )}

        {/* ---- Secondary 3-up landscape row ---- */}
        {secondary.length > 0 && (
          <div className="mt-4 grid gap-4 md:mt-5 md:grid-cols-3 md:gap-5">
            {secondary.map((p, i) => (
              <PhotoCard
                key={p.src}
                photo={p}
                index={i + 2}
                aspect="aspect-[4/3]"
                spanClass=""
              />
            ))}
          </div>
        )}

        {/* ---- Hobby chips + dream pool callout ---- */}
        <div className="mt-20 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
              How Mike Unwinds
            </p>
            <h3 className="font-[family-name:var(--font-display)] mt-3 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
              A short list of favorite things
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {hobbies.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  className="rounded-full border border-[var(--color-navy-deep)]/15 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                >
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-navy-deep)] via-[var(--color-pool-deep)] to-[var(--color-pool)] p-8 text-white shadow-[0_30px_70px_-25px_rgba(0,124,182,0.55)] md:p-10"
          >
            <motion.span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ width: "50%" }}
            />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/70">
                Mike&apos;s Dream Pool
              </p>
              <h3 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-4xl">
                {owner.dreamPool}
              </h3>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                    <path
                      d="M3 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm text-white/80">A lazy river it is.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- card -------------------- */

function PhotoCard({
  photo,
  index,
  aspect,
  spanClass,
}: {
  photo: { src: string; caption?: string; orientation?: "landscape" | "portrait" };
  index: number;
  aspect: string;
  spanClass: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease, delay: Math.min(index, 4) * 0.07 }}
      className={`group relative ${aspect} overflow-hidden rounded-2xl bg-[var(--color-navy-deep)] shadow-[0_20px_50px_-25px_rgba(0,55,73,0.55)] ring-1 ring-black/5 ${spanClass}`}
    >
      <Image
        src={photo.src}
        alt={photo.caption ?? "Mike Lopez, owner of Houston Cool Pools"}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/80 via-[var(--color-navy-deep)]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
      <span className="pointer-events-none absolute -top-1/2 -right-1/2 h-[200%] w-[200%] -translate-x-full bg-[linear-gradient(115deg,transparent_30%,rgba(79,195,224,0.18)_45%,transparent_60%)] transition-transform duration-[1200ms] ease-out group-hover:translate-x-0" />
      {photo.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-[family-name:var(--font-display)] text-base leading-tight md:text-lg">
            {photo.caption}
          </p>
        </figcaption>
      ) : null}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--color-pool)]/0 transition-all duration-500 group-hover:ring-[var(--color-pool)]/60" />
    </motion.figure>
  );
}

