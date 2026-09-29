"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Article, ArticleBlock } from "../../../../lib/articles";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export type ArticlePostProps = {
  article: Article;
  related: Article[];
  canonical: string;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ArticlePost({ article, related, canonical }: ArticlePostProps) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.9], [1, 0]);

  const { scrollYProgress: pageProgress } = useScroll();

  // Build a table of contents from h2 blocks (memoized).
  const toc = useMemo(
    () =>
      article.body
        .map((b, idx) => ({ b, idx }))
        .filter((x): x is { b: Extract<ArticleBlock, { type: "h2" }>; idx: number } => x.b.type === "h2")
        .map(({ b, idx }) => ({ idx, id: `s-${slugify(b.text)}-${idx}`, text: b.text })),
    [article.body],
  );

  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
  useEffect(() => {
    if (toc.length === 0) return;
    const observers: IntersectionObserver[] = [];
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveId(id);
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [toc]);

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(canonical).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  const shareUrl = canonical;
  const shareText = encodeURIComponent(article.title);

  return (
    <>
      {/* ===== Reading progress bar ===== */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
        <motion.div
          style={{ scaleX: pageProgress, transformOrigin: "0% 50%" }}
          className="h-full w-full bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-pool)]"
        />
      </div>

      {/* ===== Hero ===== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden bg-[var(--color-navy-deep)] pt-32 text-white md:pt-40 lg:pt-44"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
          <Image
            src={article.hero.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/70 to-[var(--color-navy-deep)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.28),transparent_65%)]" />

        {/* Floating orbs */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[6%] top-[38%] h-24 w-24 rounded-full bg-[var(--color-pool)]/25 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[10%] top-[24%] h-32 w-32 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
        />

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative mx-auto max-w-4xl px-6 pb-40 md:px-10 md:pb-52 lg:pb-64"
        >
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
          >
            <Link href="/" className="transition hover:text-white">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/blogs" className="transition hover:text-white">Articles</Link>
            <span aria-hidden>/</span>
            <span className="text-white">{article.category}</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold-light)]/40 bg-[var(--color-gold-light)]/10 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
            {article.category}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease }}
            className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="mt-7 max-w-3xl text-[17px] leading-relaxed text-white/80 sm:text-[18px]"
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-white/70"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-[13px] font-bold text-white ring-2 ring-white/20">
                {getInitials(article.author.name)}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-white">{article.author.name}</span>
                <span className="text-[11px] uppercase tracking-[0.16em] text-white/55">{article.author.role}</span>
              </span>
            </span>
            <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:inline-block" />
            <span className="flex items-center gap-2 uppercase tracking-[0.16em]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {article.date}
            </span>
            <span aria-hidden className="hidden h-4 w-px bg-white/20 sm:inline-block" />
            <span className="flex items-center gap-2 uppercase tracking-[0.16em]">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {article.readTime} read
            </span>
          </motion.div>
        </motion.div>

        {/* Wave divider */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-[#f7f6f2]"
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

      {/* ===== Body ===== */}
      <section className="relative bg-[#f7f6f2] pb-24">
        {/* Subtle decorative gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.06),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          {/* Floating featured image card - overlaps the hero wave */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative z-10 mx-auto -mt-32 mb-16 aspect-[16/8] w-full max-w-5xl overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(0,27,36,0.45)] ring-1 ring-black/5 md:-mt-40 lg:-mt-48"
          >
            <Image
              src={article.hero.src}
              alt={article.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {article.hero.alt}
              </p>
            </div>
          </motion.figure>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            {/* ---------- Main article ---------- */}
            <article className="mx-auto w-full max-w-[720px] lg:mx-0">
              <BlockRenderer blocks={article.body} toc={toc} />

              {/* Tag / keyword row */}
              {article.keywords.length > 0 && (
                <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-8">
                  <span className="mr-2 text-[10.5px] font-bold uppercase tracking-[0.24em] text-slate-500">
                    Topics
                  </span>
                  {article.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11.5px] font-medium text-slate-600"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              )}

              {/* Author bio card */}
              <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-24px_rgba(0,27,36,0.25)] md:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-gradient-to-br from-[var(--color-pool)] to-[var(--color-pool-deep)] text-lg font-bold text-white ring-4 ring-[var(--color-pool)]/10">
                    {getInitials(article.author.name)}
                  </span>
                  <div className="flex-1">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                      Written by
                    </p>
                    <h4 className="mt-1 font-display text-xl font-bold text-[var(--color-navy-deep)]">
                      {article.author.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">{article.author.role}</p>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                      Every article on this site is written from the field - from real builds,
                      real remodels, and real service calls with Houston homeowners. If
                      you&apos;re thinking about a project, we&apos;d love to talk it through.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={QUOTE_HREF}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-5 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-pool-deep)]"
                      >
                        Request a Quote
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                      <a
                        href={PHONE_HREF}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                      >
                        Call {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* ---------- Desktop sidebar ---------- */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {/* Author + CTA card */}
                <div className="relative overflow-hidden rounded-3xl bg-[var(--color-navy-deep)] p-6 text-white shadow-[0_20px_50px_-24px_rgba(0,27,36,0.4)]">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[var(--color-pool)]/40 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-[var(--color-gold-light)]/25 blur-2xl" />
                  <div className="relative flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[13px] font-bold text-white ring-2 ring-white/20">
                      {getInitials(article.author.name)}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                        In this article
                      </span>
                      <span className="text-[12.5px] text-white/70">By {article.author.name}</span>
                    </div>
                  </div>
                  <h4 className="relative mt-5 font-display text-[17px] font-bold leading-snug text-white">
                    {article.title}
                  </h4>
                  <Link
                    href={QUOTE_HREF}
                    className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition hover:brightness-110"
                  >
                    Request a Quote
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* Table of contents */}
                {toc.length > 0 && (
                  <nav
                    aria-label="Table of contents"
                    className="rounded-3xl border border-slate-200/80 bg-white p-5"
                  >
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                      Contents
                    </p>
                    <ol className="mt-4 space-y-1.5">
                      {toc.map((t, i) => {
                        const isActive = t.id === activeId;
                        return (
                          <li key={t.id}>
                            <a
                              href={`#${t.id}`}
                              className={`group flex items-start gap-3 rounded-xl px-3 py-2 text-[13px] leading-snug transition ${
                                isActive
                                  ? "bg-[var(--color-pool)]/10 text-[var(--color-pool-deep)]"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-[var(--color-navy-deep)]"
                              }`}
                            >
                              <span
                                className={`mt-0.5 inline-grid h-5 w-5 flex-none place-items-center rounded-full text-[10px] font-bold ${
                                  isActive
                                    ? "bg-[var(--color-pool)] text-white"
                                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                }`}
                              >
                                {i + 1}
                              </span>
                              <span className="font-medium">{t.text}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                )}

                {/* Related pages */}
                {article.related.length > 0 && (
                  <div className="rounded-3xl border border-slate-200/80 bg-white p-5">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                      Related pages
                    </p>
                    <ul className="mt-4 divide-y divide-slate-100">
                      {article.related.map((r) => (
                        <li key={r.href}>
                          <Link
                            href={r.href}
                            className="group flex items-center justify-between gap-3 py-3 text-[13.5px] font-medium text-slate-700 transition hover:text-[var(--color-pool)]"
                          >
                            <span>{r.label}</span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-3 w-3 flex-none text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-pool)]"
                            >
                              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share */}
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                    Share this article
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Share on X"
                      className="grid h-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M18.244 2H21l-6.53 7.462L22 22h-6.828l-4.86-6.36L4.6 22H1.844l6.993-7.99L2 2h6.914l4.39 5.809L18.244 2Zm-1.196 18.153h1.517L7.02 3.76H5.397l11.651 16.393Z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Share on Facebook"
                      className="grid h-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label="Copy link"
                      className="relative grid h-11 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                    >
                      {copied ? (
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[var(--color-pool)]">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                          <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1 1M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== Mobile related pages ===== */}
      {article.related.length > 0 && (
        <section className="bg-white py-12 lg:hidden">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Related pages
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {article.related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[var(--color-navy-deep)] transition hover:border-[var(--color-pool)] hover:text-[var(--color-pool)]"
                  >
                    {r.label}
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== More articles ===== */}
      {related.length > 0 && (
        <section className="bg-[#f7f6f2] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]">
                  Keep reading
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[var(--color-navy-deep)] sm:text-4xl">
                  More from the journal
                </h2>
              </div>
              <Link
                href="/blogs"
                className="hidden text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] underline decoration-[var(--color-pool)] decoration-2 underline-offset-[8px] transition hover:text-[var(--color-pool)] sm:inline-block"
              >
                All articles →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((a, i) => (
                <motion.article
                  key={a.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease }}
                  className="group"
                >
                  <Link
                    href={`/blogs/${a.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--color-pool)]/50 hover:shadow-[0_20px_60px_-30px_rgba(0,27,36,0.35)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={a.card.src}
                        alt={a.card.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy-deep)] backdrop-blur">
                          {a.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="font-display text-xl font-bold leading-snug text-[var(--color-navy-deep)] transition group-hover:text-[var(--color-pool)]">
                        {a.title}
                      </h3>
                      <p className="line-clamp-2 text-[14.5px] leading-relaxed text-slate-600">
                        {a.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-3 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        <span>{a.date}</span>
                        <span className="text-[var(--color-pool)]">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,124,182,0.4),transparent_60%)]" />
        <motion.div
          aria-hidden
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-[var(--color-pool)]/30 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="pointer-events-none absolute right-[8%] bottom-[15%] h-48 w-48 rounded-full bg-[var(--color-gold-light)]/20 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-gold-light)]">
            Let&apos;s talk
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Ready to bring your pool to life?
          </h2>
          <p className="max-w-2xl text-[16px] leading-relaxed text-white/75">
            Whether you&apos;re dreaming about a custom build, planning a remodel, or trying to
            keep an existing pool sparkling - we&apos;re happy to walk you through it.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={QUOTE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-navy-deep)] shadow-[0_10px_30px_-10px_rgba(255,199,0,0.55)] transition hover:brightness-110"
            >
              Request a Free Quote
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur transition hover:bg-white/[0.12]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Block renderer ---------- */

type Toc = { idx: number; id: string; text: string }[];

function BlockRenderer({ blocks, toc }: { blocks: ArticleBlock[]; toc: Toc }) {
  const idForIdx = (idx: number) => toc.find((t) => t.idx === idx)?.id;
  const numberForIdx = (idx: number) => {
    const i = toc.findIndex((t) => t.idx === idx);
    return i >= 0 ? i + 1 : null;
  };

  let firstParagraphRendered = false;

  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2": {
            const id = idForIdx(i);
            const num = numberForIdx(i);
            return (
              <motion.h2
                key={i}
                id={id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease }}
                className="group mt-16 scroll-mt-28 font-display text-[26px] font-extrabold leading-tight tracking-tight text-[var(--color-navy-deep)] sm:text-[32px]"
              >
                <span className="mr-3 inline-flex items-baseline text-[var(--color-pool)]">
                  <span className="text-[14px] font-bold uppercase tracking-[0.22em]">
                    {num !== null ? String(num).padStart(2, "0") : ""}
                  </span>
                </span>
                <span className="relative inline-block">
                  {b.text}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[3px] w-16 rounded bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]"
                  />
                </span>
              </motion.h2>
            );
          }
          case "h3":
            return (
              <h3
                key={i}
                className="mt-10 font-display text-[19px] font-bold text-[var(--color-navy-deep)]"
              >
                {b.text}
              </h3>
            );
          case "p": {
            const isFirst = !firstParagraphRendered;
            if (isFirst) firstParagraphRendered = true;
            return (
              <p
                key={i}
                className={`mt-6 text-[17px] leading-[1.8] text-slate-700 ${
                  isFirst
                    ? "first-letter:mr-2 first-letter:float-left first-letter:font-display first-letter:text-[64px] first-letter:font-extrabold first-letter:leading-[0.9] first-letter:text-[var(--color-navy-deep)]"
                    : ""
                }`}
              >
                {b.text}
              </p>
            );
          }
          case "list":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {b.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[17px] leading-[1.75] text-slate-700"
                  >
                    <span className="mt-2.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-[var(--color-pool)]/10 text-[var(--color-pool)]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease }}
                className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-navy-deep)] to-[#022b3a] p-8 text-white md:p-10"
              >
                <span
                  aria-hidden
                  className="absolute -left-3 -top-6 font-display text-[130px] leading-none text-white/10"
                >
                  &ldquo;
                </span>
                <p className="relative font-display text-[22px] font-medium italic leading-snug text-white sm:text-[26px]">
                  {b.text}
                </p>
                {b.cite && (
                  <footer className="relative mt-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                    <span className="h-px w-8 bg-[var(--color-gold-light)]/60" />
                    {b.cite}
                  </footer>
                )}
              </motion.blockquote>
            );
          case "image":
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease }}
                className="mt-12"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-[0_20px_60px_-30px_rgba(0,27,36,0.4)] ring-1 ring-black/5">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-4 text-center text-[13.5px] italic text-slate-500">
                    {b.caption}
                  </figcaption>
                )}
              </motion.figure>
            );
          case "callout":
            return (
              <motion.aside
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease }}
                className="relative mt-12 overflow-hidden rounded-3xl border border-[var(--color-pool)]/25 bg-gradient-to-br from-[var(--color-pool)]/10 via-white to-[var(--color-gold-light)]/10 p-7 md:p-9"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-pool)]"
                />
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-[var(--color-navy-deep)] text-white shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M12 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L12 14.77l-4.77 2.51.91-5.32L4.27 7.62l5.34-.78L12 2Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                      {b.title}
                    </p>
                    <p className="mt-3 text-[16px] leading-[1.75] text-slate-700">{b.body}</p>
                    {b.href && (
                      <Link
                        href={b.href}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-5 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-pool-deep)]"
                      >
                        {b.cta ?? "Learn more"}
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.aside>
            );
        }
      })}
    </>
  );
}

