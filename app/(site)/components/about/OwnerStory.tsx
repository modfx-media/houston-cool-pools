"use client";

import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { motion } from "motion/react";
import type { TeamMember } from "../../../../lib/team";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Long-form bio rendered as a 2-column "story + photo" grid that
 * alternates direction every paragraph. Each block animates in on view.
 * Optionally accepts an `interlude` node that renders between chapters
 * (defaults to after the first chapter).
 */
export function OwnerStory({
  owner,
  interlude,
  interludeAfter = 0,
}: {
  owner: TeamMember;
  interlude?: ReactNode;
  interludeAfter?: number;
}) {
  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-pool)]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Mike&apos;s Story
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-tight text-[var(--color-navy-deep)] md:text-5xl">
            Designing fun. Building fun.{" "}
            <span className="italic text-[var(--color-pool)]">Having fun</span> while we do it.
          </h2>
        </motion.div>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
          {owner.bio.map((block, i) => {
            const photos = owner.photos ?? [];
            const photo = block.image ?? (photos.length ? photos[i % photos.length] : null);
            const flipped = i % 2 === 1;
            const isPortrait = photo?.orientation === "portrait";
            return (
              <Fragment key={block.heading}>
                <div
                  className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
                    flipped ? "md:[&>:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: flipped ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
                    {block.heading}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-[var(--color-navy-deep)]/75 md:text-lg">
                    {block.body}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease }}
                  className="relative mx-auto w-full max-w-md md:max-w-lg"
                >
                  {photo ? (
                    <div
                      className={`group relative ${
                        isPortrait ? "aspect-[4/5]" : "aspect-[4/3]"
                      } overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-25px_rgba(0,55,73,0.45)] ring-1 ring-black/5`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption ?? "Mike Lopez, owner of Houston Cool Pools"}
                        fill
                        sizes="(min-width: 1024px) 32rem, (min-width: 768px) 45vw, 90vw"
                        className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/60 via-transparent to-transparent" />
                      {photo.caption ? (
                        <div className="absolute inset-x-5 bottom-4 text-white">
                          <p className="text-xs uppercase tracking-[0.22em] text-white/85">
                            {photo.caption}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {/* Floating accent block */}
                  <div
                    className={`pointer-events-none absolute -z-10 h-32 w-32 rounded-3xl bg-gradient-to-br from-[var(--color-pool)]/20 to-[var(--color-pool-deep)]/30 blur-2xl ${
                      flipped ? "-right-6 -top-6" : "-left-6 -bottom-6"
                    }`}
                  />
                </motion.div>
                </div>
                {interlude && i === interludeAfter ? interlude : null}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
