"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PriceEstimator } from "../PriceEstimator";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const GALLERY = [
  { src: "/images/gallery/featured-spillover-deckjets.jpg", alt: "Backyard pool with deck jets, slide, and tanning ledge" },
  { src: "/images/gallery/_mg_0078.jpg", alt: "Modern pool with water features" },
  { src: "/images/gallery/img_1011.jpg", alt: "Backyard pool retreat at twilight" },
  { src: "/images/gallery/_mg_0611.jpg", alt: "Custom gunite pool with spa" },
  { src: "/images/gallery/img_2466.jpg", alt: "Custom pool and outdoor living space" },
  { src: "/images/gallery/img_8893.jpg", alt: "Resort-style pool design" },
] as const;

export function About() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <span className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/10 blur-3xl" />
      <span className="pointer-events-none absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--color-gold-light)]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        {/* ----- IMAGE BENTO MOSAIC ----- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="relative mb-14 sm:mb-0"
        >
          <div className="grid h-[420px] grid-cols-6 grid-rows-6 gap-2 sm:h-[560px] sm:gap-3 md:h-[680px]">
            <MosaicImage src={GALLERY[0].src} alt={GALLERY[0].alt} className="col-span-4 row-span-4" delay={0} priority objectPosition="left top" />
            <MosaicImage src={GALLERY[1].src} alt={GALLERY[1].alt} className="col-span-2 row-span-2" delay={0.1} />
            <MosaicImage src={GALLERY[2].src} alt={GALLERY[2].alt} className="col-span-2 row-span-2" delay={0.18} />
            <MosaicImage src={GALLERY[3].src} alt={GALLERY[3].alt} className="col-span-2 row-span-2" delay={0.26} />
            <MosaicImage src={GALLERY[4].src} alt={GALLERY[4].alt} className="col-span-2 row-span-2" delay={0.34} />
            <MosaicImage src={GALLERY[5].src} alt={GALLERY[5].alt} className="col-span-2 row-span-2" delay={0.42} />
          </div>

          {/* Floating experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
            className="absolute -bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-[var(--color-navy-deep)] p-2.5 pr-4 shadow-[0_20px_50px_-15px_rgba(0,55,73,0.55)] ring-1 ring-[var(--color-pool)]/30 sm:-bottom-8 sm:-left-8 sm:translate-x-0 sm:gap-3 sm:p-4 sm:pr-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white sm:h-12 sm:w-12">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="font-[family-name:var(--font-display)] text-xl text-white sm:text-2xl">
                30<span className="text-[var(--color-gold-light)]">+</span>
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-light)] sm:text-[10px] sm:tracking-[0.22em]">
                Years Experience
              </p>
            </div>
          </motion.div>

          {/* Floating pool count badge - top right */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.6, duration: 0.7, ease }}
            className="absolute -right-4 -top-5 z-10 hidden items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-[0_12px_30px_-10px_rgba(0,124,182,0.5)] ring-1 ring-[var(--color-pool)]/20 sm:flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white">
                <path d="M2 12c2-4 6-4 10 0s8 4 10 0M2 18c2-4 6-4 10 0s8 4 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-[var(--color-navy-deep)]">1,600+</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-pool)]">
                Pools Built
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ----- COPY ----- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ delay: 0.15 }}
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            <span className="h-px w-8 bg-[var(--color-pool)]" />
            About Houston Cool Pools
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--color-navy-deep)] md:text-5xl lg:text-[3.5rem]">
            Welcome to{" "}
            <span className="italic text-[var(--color-pool)]">Houston Cool Pools</span>
          </h2>
          <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-neutral-700">
            <p>
              Designing and building custom pools in Houston demands expertise and experience.
              Since 1996 we have been designing the most innovative and aesthetically pleasing
              pools in the industry.
            </p>
            <p>
              Houston Cool Pools is Texas&rsquo; premier builder and designer of custom gunite
              pools. Our industry-recognized custom gunite pools and spas create an environment
              that is an extension of your home. A Houston Cool Pool is a reflection of your
              lifestyle.
            </p>
            <p>
              We are much more than just a pool construction company. We are your outdoor
              environment experts. Our goal is to provide home owners with a professional pool
              design and a 100 percent commitment to quality construction.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <PriceEstimator
              label="Click to Customize Your Pool Package"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_10px_28px_-8px_rgba(0,124,182,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(79,195,224,0.7)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MosaicImage({
  src,
  alt,
  className,
  delay,
  priority,
  objectPosition,
}: {
  src: string;
  alt: string;
  className: string;
  delay: number;
  priority?: boolean;
  objectPosition?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.7, ease }}
      className={`group relative overflow-hidden rounded-2xl bg-[var(--color-navy-deep)] shadow-[0_10px_30px_-12px_rgba(0,55,73,0.35)] ring-1 ring-black/5 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 35vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        style={objectPosition ? { objectPosition } : undefined}
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-[var(--color-pool)]/50" />
    </motion.div>
  );
}
