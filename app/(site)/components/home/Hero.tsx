"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

/* Bright, sunny backyard lifestyle photos that auto-rotate behind the hero. */
const HERO_SLIDES = [
  { src: "/images/hero/slide-1-sunny.png", alt: "Family enjoying a sunny Houston backyard pool" },
  { src: "/images/hero/slide-2-sunny.png", alt: "Sunny poolside family moments in Houston" },
  { src: "/images/hero/slide-1c-family.png", alt: "Family relaxing in a custom Houston pool" },
] as const;

const SLIDE_INTERVAL_MS = 5500;

/* -------------------- HERO -------------------- */

export function Hero() {
  return (
    <>
      <HeroVisual />
      <StatsBand />
    </>
  );
}

function HeroVisual() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--color-navy-deep)] text-white sm:min-h-[720px] lg:min-h-[760px]">
      {/* Bright sunny backyard lifestyle slideshow - constrained on mobile so
          landscape photos aren't cropped to a narrow vertical slice; full-bleed
          from sm+ where the section aspect ratio comfortably fits the images. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46vh] min-h-[320px] max-h-[440px] overflow-hidden sm:inset-0 sm:h-auto sm:min-h-0 sm:max-h-none">
        <HeroSlideshow />
      </div>

      {/* Color & vignette overlays - tuned lighter so the sunny photos read through */}
      <div className="absolute inset-x-0 top-0 h-[46vh] min-h-[320px] max-h-[440px] bg-gradient-to-b from-[var(--color-navy-deep)]/55 via-[var(--color-navy-deep)]/25 to-[var(--color-navy-deep)] sm:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/35 to-[var(--color-navy-deep)]/5 sm:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-[var(--color-navy-deep)] via-transparent to-transparent sm:block" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_25%_55%,transparent_0%,rgba(0,27,36,0.45)_92%)] sm:block" />

      {/* Pulsing cyan glows */}
      <motion.div
        animate={{ opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[var(--color-pool)]/25 blur-[170px]"
      />
      <motion.div
        animate={{ opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-10 h-[480px] w-[480px] rounded-full bg-[var(--color-pool-deep)]/35 blur-[170px]"
      />

      {/* Floating bubble particles */}
      <Bubbles />

      {/* Ripple rings - bottom left decorative */}
      <RippleRings className="absolute -bottom-24 -left-24 h-[420px] w-[420px] opacity-40" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pt-40 pb-32 sm:px-10 sm:pt-36 sm:pb-36 md:pt-40 lg:px-16 lg:pt-48 lg:pb-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.36em] text-white/80 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-pool)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-pool)]" />
            </span>
            Now Accepting New Builds
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.14, delayChildren: 0.35 },
              },
            }}
            className="font-[family-name:var(--font-display)] mt-6 text-[clamp(2.75rem,9vw,5rem)] font-bold leading-[1] tracking-[-0.035em] sm:mt-7"
          >
            <motion.span variants={lineReveal} className="block">
              Pool builder
            </motion.span>
            <motion.span variants={lineReveal} className="block">
              in{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[var(--color-gold-light)] via-[var(--color-pool)] to-[var(--color-gold-light)] bg-clip-text text-transparent">
                  Houston
                </span>
                <motion.svg
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-2 w-full text-[var(--color-pool)]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 1.1, ease }}
                >
                  <motion.path
                    d="M2 8 C 60 2, 140 12, 220 4 S 296 8, 298 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              .
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-8 sm:text-base md:text-lg"
          >
            Dream pools, built beautifully. Houston Cool Pools is a custom
            gunite pool builder in Houston, TX — designing and building
            backyard pools since 1996.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7, ease }}
            className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
          >
            <Link
              href={QUOTE_HREF}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[var(--color-pool)] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.26em] text-white shadow-[0_12px_40px_-12px_rgba(0,124,182,0.85)] transition-all hover:shadow-[0_18px_55px_-12px_rgba(79,195,224,1)]"
            >
              <span className="relative z-10">Book a Call</span>
              <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </motion.div>

          {/* Mobile collage - shown beneath the hero copy on small screens */}
          <div className="relative mx-auto mt-14 h-[300px] w-full max-w-[360px] sm:mt-16 sm:h-[340px] sm:max-w-[420px] lg:hidden">
            <PoolCollage compact />
          </div>
        </div>
      </div>

      {/* Floating pool gallery collage - anchored to the right edge of the content container */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="relative mx-auto h-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <PoolCollage />
        </div>
      </div>

      {/* Bottom decorative wave that flows into stats band */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-none">
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="block h-24 w-full text-[var(--color-navy-deep)] md:h-28"
          aria-hidden
        >
          <motion.path
            initial={false}
            animate={{
              d: [
                "M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,140 L0,140 Z",
                "M0,80 C240,20 480,140 720,80 C960,20 1200,140 1440,80 L1440,140 L0,140 Z",
                "M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,140 L0,140 Z",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            fill="currentColor"
          />
        </svg>
      </div>

    </section>
  );
}

const lineReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
} as const;

/* -------------------- HERO SLIDESHOW -------------------- */

function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease }, scale: { duration: 7, ease: "easeOut" } }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_SLIDES[index].src}
            alt={HERO_SLIDES[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[center_35%] sm:object-center"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------- POOL COLLAGE -------------------- */

const COLLAGE_IMAGES = [
  {
    src: "/images/gallery/_mg_0210.jpg",
    alt: "Luxury custom pool with spa",
    badge: "Custom Build",
    href: "/gallery",
  },
  {
    src: "/images/hero/family-retreat.png",
    alt: "Family enjoying their Houston backyard pool",
    badge: "Family Retreat",
    href: "/gallery",
  },
  {
    src: "/images/gallery/featured-spillover-deckjets.jpg",
    alt: "Pool with arcing deck jets and spa spillover",
    badge: "Deck Jets & Spillovers",
    href: "/features-2",
  },
] as const;

function PoolCollage({ compact = false }: { compact?: boolean } = {}) {
  // Circular carousel: one image sits front-and-center while the other two
  // orbit behind it. Every few seconds the active image rotates back and the
  // next one comes forward, creating a continuous circular motion.
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % COLLAGE_IMAGES.length),
      3800,
    );
    return () => clearInterval(id);
  }, []);

  // Slot 0 = front, Slot 1 = back-right, Slot 2 = back-left.
  const offsetX = compact ? 70 : 120;
  const offsetY = compact ? -28 : -40;
  const slots = [
    { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 30, opacity: 1, filter: "brightness(1)" },
    { x: offsetX, y: offsetY, rotate: 9, scale: 0.82, zIndex: 20, opacity: 0.85, filter: "brightness(0.7)" },
    { x: -offsetX, y: offsetY, rotate: -9, scale: 0.82, zIndex: 10, opacity: 0.85, filter: "brightness(0.7)" },
  ];

  // Card dimensions
  const cardW = compact ? 200 : 280;
  const cardH = compact ? 260 : 360;

  return (
    <>
      {/* Soft glowing aura behind the collage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 1.2, ease }}
        className={
          compact
            ? "pointer-events-none absolute inset-0"
            : "pointer-events-none absolute right-12 top-44 h-[560px] w-[560px]"
        }
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full bg-[var(--color-pool)]/30 blur-3xl" />
        <span className={compact ? "absolute inset-8 rounded-full bg-[var(--color-gold-light)]/20 blur-3xl" : "absolute inset-16 rounded-full bg-[var(--color-gold-light)]/20 blur-3xl"} />
      </motion.div>

      {/* Carousel stage */}
      <div
        className={
          compact
            ? "absolute inset-0"
            : "absolute right-[10%] top-[28%] h-[420px] w-[340px]"
        }
      >
        {COLLAGE_IMAGES.map((img, i) => {
          const slot = slots[(i - active + COLLAGE_IMAGES.length) % COLLAGE_IMAGES.length];
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                width: cardW,
                height: cardH,
                marginLeft: -cardW / 2,
                marginTop: -cardH / 2,
                zIndex: slot.zIndex,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                x: slot.x,
                y: slot.y,
                rotate: slot.rotate,
                scale: slot.scale,
                opacity: slot.opacity,
                filter: slot.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                mass: 1,
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="group relative h-full w-full"
              >
                {/* Gradient border wrapper */}
                <Link
                  href={img.href}
                  aria-label={img.alt}
                  className="pointer-events-auto relative block h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-pool)] via-[var(--color-gold-light)]/50 to-[var(--color-pool-deep)] p-[2px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[var(--color-navy-deep)]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                      priority={i === 0}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/10 to-transparent" />
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

                    {/* Badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-3 py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.45)] ring-1 ring-[var(--color-gold-light)]/40">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold-light)] shadow-[0_0_8px_rgba(79,195,224,0.9)]" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                        {img.badge}
                      </span>
                    </div>

                    {/* Bottom-right arrow */}
                    <div className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] shadow-lg ring-1 ring-white/20">
                      <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Slot indicator dots - under the stage */}
        <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {COLLAGE_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show pool ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active
                  ? "w-8 bg-[var(--color-gold-light)]"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/* -------------------- BUBBLES -------------------- */

function Bubbles() {
  // Deterministic positions so SSR/CSR match
  const bubbles = [
    { left: "8%", size: 10, delay: 0, duration: 14 },
    { left: "18%", size: 6, delay: 3, duration: 18 },
    { left: "32%", size: 14, delay: 1.5, duration: 16 },
    { left: "44%", size: 8, delay: 5, duration: 20 },
    { left: "58%", size: 12, delay: 2, duration: 17 },
    { left: "68%", size: 6, delay: 4, duration: 15 },
    { left: "78%", size: 16, delay: 0.8, duration: 19 },
    { left: "88%", size: 9, delay: 3.5, duration: 16 },
    { left: "94%", size: 5, delay: 6, duration: 22 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-20%", opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
          }}
          className="absolute bottom-0 rounded-full border border-[var(--color-pool)]/40 bg-[var(--color-pool)]/15 shadow-[0_0_18px_rgba(0,124,182,0.5)]"
        />
      ))}
    </div>
  );
}

/* -------------------- RIPPLE RINGS -------------------- */

function RippleRings({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.4, opacity: 0.6 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 5,
            delay: i * 1.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 rounded-full border border-[var(--color-pool)]/40"
        />
      ))}
    </div>
  );
}

/* -------------------- STATS BAND -------------------- */

type Stat = {
  label: string;
  value: number | string;
  suffix: string;
  caption: string;
  icon: React.ReactNode;
  plain?: boolean;
};

const STATS: Stat[] = [
  {
    label: "Established",
    value: 1996,
    suffix: "",
    caption: "Three decades of craft",
    plain: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Pools Built",
    value: 1600,
    suffix: "+",
    caption: "Across greater Houston",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M2 14c2-3 6-3 10 0s8 3 10 0M2 19c2-3 6-3 10 0s8 3 10 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 14V6a2 2 0 012-2h2M18 14V6a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Commitment to Quality",
    value: 100,
    suffix: "%",
    caption: "Quality construction, every build",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "BBB Rating",
    value: "A+",
    suffix: "",
    caption: "Accredited since 1999",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-deep)] text-white">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-deep)] via-[var(--color-navy)] to-[var(--color-navy-deep)]" />
      <div className="absolute -left-32 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[var(--color-pool)]/15 blur-[120px]" />
      <div className="absolute -right-32 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[var(--color-pool-deep)]/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-10 md:py-14 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease }}
          className="mb-7 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between md:gap-6"
        >
          <div className="flex items-baseline gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-pool)]">
              By the Numbers
            </p>
            <span className="h-px w-10 bg-[var(--color-pool)]/50" />
            <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white md:text-2xl">
              Built on <span className="italic text-[var(--color-gold-light)]">three decades</span> of craft
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-xs text-white/55 md:text-right">
              Award-winning custom pools - on time, on budget, built to last.
            </p>
            <ul className="flex flex-wrap items-center gap-2">
              {["BBB A+ Rated", "Best of Houzz", "Angie's List Super Service Award", "SBA Emerging Leaders Award", "BBB Gold Star Award"].map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-gold-light)]/30 bg-[var(--color-gold-light)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold-light)]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {a}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-white/40 md:text-right">
              Also members of the GHBA and NAHB.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="group relative flex items-center gap-3 bg-[var(--color-navy-deep)]/70 p-3.5 transition-colors hover:bg-[var(--color-navy-deep)]/40 sm:gap-4 sm:p-5"
    >
      {/* Top accent line on hover */}
      <span className="pointer-events-none absolute inset-x-5 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-pool)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--color-pool)]/30 bg-[var(--color-pool)]/10 text-[var(--color-pool)] transition-colors group-hover:bg-[var(--color-pool)] group-hover:text-white sm:h-11 sm:w-11">
        {stat.icon}
      </span>

      {/* Number + label */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-0.5">
          <span className="font-[family-name:var(--font-display)] text-2xl leading-none text-white sm:text-3xl md:text-4xl">
            {typeof stat.value === "number" && inView ? (
              <Counter to={stat.value} plain={stat.plain} />
            ) : (
              stat.value
            )}
          </span>
          {stat.suffix && (
            <span className="font-[family-name:var(--font-display)] text-lg text-[var(--color-pool)] sm:text-xl md:text-2xl">
              {stat.suffix}
            </span>
          )}
        </div>
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[10px] sm:tracking-[0.22em]">
          {stat.label}
        </p>
        {/* Hairline underline grows in */}
        <div className="mt-2 h-px w-full bg-white/10">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: index * 0.08 + 0.2, ease }}
            className="block h-full origin-left bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-gold-light)]"
          />
        </div>
      </div>

      {/* Index */}
      <span className="absolute right-3 top-3 text-[9px] font-semibold tracking-[0.24em] text-white/30">
        0{index + 1}
      </span>
    </motion.div>
  );
}

function Counter({ to, plain }: { to: number; plain?: boolean }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    plain ? String(Math.round(v)) : Math.round(v).toLocaleString("en-US")
  );
  const [text, setText] = useState("0");

  useEffect(() => {
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, rounded, to]);

  return <>{text}</>;
}
