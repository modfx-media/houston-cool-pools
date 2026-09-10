"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ARTICLES, type Article } from "../../../lib/articles";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORIES: ("All" | Article["category"])[] = [
  "All",
  "Custom Features",
  "Pool Remodel",
  "Pool Service",
];

const BUBBLES = [
  { left: "6%", size: 15, delay: 0, dur: 11 },
  { left: "22%", size: 9, delay: 1.4, dur: 13 },
  { left: "38%", size: 21, delay: 0.6, dur: 12 },
  { left: "54%", size: 11, delay: 2.2, dur: 14 },
  { left: "70%", size: 7, delay: 1, dur: 9 },
  { left: "86%", size: 18, delay: 2.8, dur: 12 },
];

export function ArticlesIndex() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === category),
    [category],
  );

  const featured = ARTICLES[0];
  const rest = filtered.filter((a) => a.slug !== featured.slug);

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-36 text-white md:pt-44 lg:pt-48"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.32),transparent_62%)]" />
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-[var(--color-pool)]/20 blur-[150px]"
        />
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[var(--color-pool-deep)]/25 blur-[150px]"
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {BUBBLES.map((b, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full border border-white/20 bg-white/5"
              style={{ left: b.left, width: b.size, height: b.size }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -460, opacity: [0, 0.7, 0] }}
              transition={{
                duration: b.dur,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36"
        >
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/pool-information" className="transition hover:text-white">
              Pool Information
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">Pool Articles</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-6 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-light)]"
          >
            Swimming Pool Articles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            Insights from the{" "}
            <span className="italic text-[var(--color-pool)]">deep end</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-6 max-w-2xl text-base text-white/75 sm:text-lg"
          >
            Field notes, design playbooks and maintenance guides from three
            decades of building and caring for custom Houston pools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-8 flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter articles by category"
          >
            {CATEGORIES.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c)}
                  className={
                    "rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition " +
                    (active
                      ? "border-[var(--color-gold-light)] bg-[var(--color-gold-light)]/15 text-[var(--color-gold-light)]"
                      : "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white")
                  }
                >
                  {c}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-white"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 40 C 240 80, 480 0, 720 40 C 960 80, 1200 0, 1440 40 L 1440 80 L 0 80 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      {/* ===== Featured article ===== */}
      {category === "All" && (
        <section className="bg-white pb-4 pt-14 md:pt-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]"
            >
              Featured Read
            </motion.p>
            <FeaturedCard article={featured} />
          </div>
        </section>
      )}

      {/* ===== Grid ===== */}
      <section className="bg-white pb-24 pt-6 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            key={category}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {(category === "All" ? rest : filtered).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-slate-500">
              No articles in this category yet - check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,124,182,0.35),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Ready to plan your custom pool?
          </h2>
          <p className="max-w-2xl text-white/75">
            We&apos;re happy to walk your backyard, talk through options and
            send you a written estimate the same week.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-navy-deep)] shadow-lg transition hover:brightness-110"
            >
              Request a Free Quote
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white/[0.12]"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Featured hero card ---------- */

function FeaturedCard({ article }: { article: Article }) {
  return (
    <motion.article
      key={article.slug}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="group mt-6 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)] lg:grid-cols-2"
    >
      <Link
        href={`/blogs/${article.slug}`}
        className="relative block aspect-[4/3] lg:aspect-auto"
      >
        <Image
          src={article.hero.src}
          alt={article.hero.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent lg:bg-gradient-to-r" />
      </Link>

      <div className="flex flex-col justify-center gap-5 p-8 md:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--color-pool)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-pool-deep)]">
            {article.category}
          </span>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>{article.date}</span>
            <span aria-hidden>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
        <h3 className="font-display text-2xl font-extrabold text-[var(--color-navy-deep)] sm:text-3xl md:text-4xl">
          <Link
            href={`/blogs/${article.slug}`}
            className="transition-colors hover:text-[var(--color-pool)]"
          >
            {article.title}
          </Link>
        </h3>
        <p className="text-base leading-relaxed text-slate-600">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--color-pool-deep)]"
          >
            Read article
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {article.author.name}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Compact article card ---------- */

function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
      className="group"
    >
      <Link
        href={`/blogs/${article.slug}`}
        className="block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-1 hover:border-[var(--color-pool)]/50 hover:shadow-[0_20px_40px_-20px_rgba(0,124,182,0.3)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={article.card.src}
            alt={article.card.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover transition duration-700 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex h-full flex-col gap-3 p-6">
          <span className="w-fit rounded-full bg-[var(--color-pool)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-pool-deep)]">
            {article.category}
          </span>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>{article.date}</span>
            <span aria-hidden>•</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="font-display text-lg font-bold leading-snug text-[var(--color-navy-deep)] transition-colors group-hover:text-[var(--color-pool)] sm:text-xl">
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {article.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-pool)]">
            Read more
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
