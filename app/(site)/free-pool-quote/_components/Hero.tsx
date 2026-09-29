"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { CountUp } from "./CountUp";
import { OfferCard } from "./OfferCard";
import { LP_CONTACT, LP_TRUST_BADGES } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

/* Bright, sunny backyard lifestyle photos - mirrors the homepage hero. */
const HERO_SLIDES = [
  { src: "/images/hero/slide-1-sunny.png", alt: "Family enjoying a sunny Houston backyard pool" },
  { src: "/images/hero/slide-2-sunny.png", alt: "Sunny poolside family moments in Houston" },
  { src: "/images/hero/slide-1c-family.png", alt: "Family relaxing in a custom Houston pool" },
] as const;

const SLIDE_INTERVAL_MS = 5500;

/* -------- Motion variants -------- */
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
};

/* -------- Decorative motion graphics -------- */

function BubbleField() {
  // Deterministic positions so SSR & client match.
  const bubbles = [
    { left: "6%", size: 14, delay: 0, dur: 9, drift: 18 },
    { left: "14%", size: 22, delay: 1.4, dur: 11, drift: -22 },
    { left: "23%", size: 10, delay: 3.2, dur: 8, drift: 14 },
    { left: "33%", size: 28, delay: 0.6, dur: 12, drift: -16 },
    { left: "42%", size: 12, delay: 2.1, dur: 9.5, drift: 12 },
    { left: "52%", size: 18, delay: 4.0, dur: 10, drift: -20 },
    { left: "61%", size: 24, delay: 1.0, dur: 12.5, drift: 22 },
    { left: "71%", size: 10, delay: 2.6, dur: 8.5, drift: -14 },
    { left: "80%", size: 30, delay: 0.4, dur: 13, drift: 18 },
    { left: "88%", size: 14, delay: 3.5, dur: 9, drift: -12 },
    { left: "96%", size: 18, delay: 1.7, dur: 11.5, drift: 16 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "110%", opacity: 0 }}
          animate={{
            y: ["110%", "-15%"],
            x: [0, b.drift, 0],
            opacity: [0, 0.55, 0],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ left: b.left, width: b.size, height: b.size }}
          className="absolute bottom-0 rounded-full border border-[#00b4d8]/40 bg-[#00b4d8]/10 shadow-[0_0_18px_rgba(0,180,216,0.35)] backdrop-blur-[1px]"
        />
      ))}
    </div>
  );
}

function GlowOrbs() {
  return (
    <>
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#00b4d8]/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-[#0ea5e9]/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.5, 0.95, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,180,216,0.18),transparent_60%)]"
      />
    </>
  );
}

function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }}
    />
  );
}

function AnimatedWave() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 sm:block sm:h-40"
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="waveFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0a1628" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a1628" stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,120 C240,180 480,40 720,100 C960,160 1200,60 1440,110 L1440,200 L0,200 Z"
          fill="url(#waveFill)"
          initial={{ x: 0 }}
          animate={{ x: [-30, 30, -30] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,140 C200,90 460,170 720,130 C980,90 1240,170 1440,130 L1440,200 L0,200 Z"
          fill="#0a1628"
          opacity={0.85}
          initial={{ x: 0 }}
          animate={{ x: [25, -25, 25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.a
      href="#quote-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#94a3b8] hover:text-[#00b4d8] sm:flex"
    >
      <span>Scroll</span>
      <motion.span
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="h-6 w-px bg-current"
      />
    </motion.a>
  );
}

/* -------- Hero slideshow (mirrors homepage) -------- */

function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
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

/* -------- Main Hero -------- */

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const headlineWords = ["FREE", "Pool", "Quote"];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex w-full flex-col justify-center overflow-hidden bg-[#0a1628] text-white sm:min-h-[100svh]"
    >
      {/* Parallax slideshow - matches homepage hero */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-20"
      >
        <HeroSlideshow />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/55 to-[#0a1628]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,180,216,0.22),transparent_60%)]" />

      {/* Motion graphics layer */}
      <GlowOrbs />
      <GridOverlay />
      <BubbleField />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-10 pb-8 sm:px-8 sm:pt-24 sm:pb-28 lg:px-16 xl:px-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Badge */}
          <motion.span
            variants={heroItem}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#00b4d8]/40 bg-[#0a1628]/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00b4d8] shadow-[0_0_30px_rgba(0,180,216,0.25)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00b4d8]" />
            </span>
            Now Accepting New Builds
            <svg
              viewBox="0 0 20 20"
              className="-mr-0.5 h-3 w-3 fill-current transition group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M10.59 5.59 12 7l3 3-3 3-1.41-1.41L12.17 11H5V9h7.17l-1.58-1.59z" />
            </svg>
          </motion.span>

          {/* Headline */}
          <motion.div variants={heroItem} className="mt-7">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#94a3b8] sm:text-sm">
              Get Your
            </div>
            <motion.div
              variants={wordContainer}
              className="mt-4 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:justify-start lg:text-[5.25rem]"
            >
              {headlineWords.map((w, i) => (
                <motion.span
                  key={w}
                  variants={wordItem}
                  className={`relative inline-block ${
                    i === 0
                      ? "bg-gradient-to-br from-[#22d3ee] via-[#00b4d8] to-[#0ea5e9] bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {w}
                  {i === 0 && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, delay: 1.2, ease }}
                      className="absolute -bottom-1 left-0 right-0 h-1 origin-left rounded-full bg-gradient-to-r from-[#22d3ee] via-[#00b4d8] to-transparent"
                    />
                  )}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Subhead */}
          <motion.p
            variants={heroItem}
            className="mt-7 max-w-2xl text-base leading-relaxed text-[#cbd5e1] sm:text-lg"
          >
            Houston&apos;s most trusted custom gunite pool builder since{" "}
            <span className="font-semibold text-white">1996</span>.{" "}
            <span className="font-semibold text-white">1,600+ pools built</span>
            , 100% on-budget guarantee.
          </motion.p>

          {/* Trust pills */}
          <motion.ul
            variants={heroContainer}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:justify-start"
          >
            {LP_TRUST_BADGES.map((b) => (
              <motion.li
                key={b}
                variants={heroItem}
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur transition hover:border-[#00b4d8]/50 hover:text-white sm:text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <motion.a
              href="#quote-form"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#00b4d8] px-7 py-3.5 text-sm font-semibold text-[#0a1628] shadow-lg shadow-[#00b4d8]/30 transition hover:bg-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Claim My Free Quote
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
              <motion.span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-100%", "120%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 2.6,
                  ease: "easeInOut",
                }}
              />
            </motion.a>
            <a
              href={LP_CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#00b4d8] hover:text-[#00b4d8]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
              </svg>
              {LP_CONTACT.phoneDisplay}
            </a>
          </motion.div>
        </motion.div>

        {/* Right: animated offer motion-graph card */}
        <div className="w-full">
          <OfferCard />
        </div>
        </div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease }}
          className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-14"
        >
          {/* glow border */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#00b4d8]/40 via-transparent to-[#00b4d8]/40"
          />
          <div className="relative grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-[#0a1628]/85 p-5 backdrop-blur-md sm:grid-cols-4 sm:gap-6 sm:p-7">
            <StatBlock value={1996} label="Established" type="year" />
            <StatBlock value={1600} suffix="+" label="Pools Built" />
            <StatBlock value={100} suffix="%" label="On-Budget" />
            <StatBlock display="A+" label="BBB Rating" />
          </div>
        </motion.div>
      </motion.div>

      <ScrollCue />
      <AnimatedWave />
    </section>
  );
}

function StatBlock({
  value,
  suffix,
  label,
  display,
  type,
}: {
  value?: number;
  suffix?: string;
  label: string;
  display?: string;
  type?: "year";
}) {
  return (
    <div className="group relative text-center">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3, ease }}
        className="font-display text-3xl font-extrabold tracking-tight text-[#00b4d8] sm:text-4xl lg:text-5xl"
      >
        {display ? (
          display
        ) : type === "year" ? (
          <CountUp
            to={value ?? 0}
            duration={2}
            format={(n) => Math.round(n).toString()}
          />
        ) : (
          <CountUp to={value ?? 0} suffix={suffix ?? ""} duration={1.8} />
        )}
      </motion.div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#94a3b8] sm:text-xs">
        {label}
      </div>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
        className="mx-auto mt-3 h-px w-12 origin-center bg-gradient-to-r from-transparent via-[#00b4d8]/60 to-transparent"
      />
    </div>
  );
}
