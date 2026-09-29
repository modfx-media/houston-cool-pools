"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ARTICLES } from "../../../../lib/articles";

const ease = [0.22, 1, 0.36, 1] as const;

type Post = {
  title: string;
  excerpt: string;
  href: string;
  tag: string;
  readTime: string;
  img: string;
  date: string;
};

const POSTS: Post[] = ARTICLES.slice(0, 3).map((a) => ({
  title: a.title,
  excerpt: a.excerpt,
  href: `/blogs/${a.slug}`,
  tag: a.tag,
  readTime: a.readTime,
  date: a.date,
  img: a.card.src,
}));

export function BlogPreview() {
  return (
    <section className="relative overflow-hidden bg-[#fafbfc] py-20 md:py-28">
      {/* Soft ambient orbs */}
      <span className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/[0.05] blur-[150px]" />
      <span className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-[var(--color-pool-deep)]/[0.05] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* ----- Header ----- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease }}
          className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-pool)]/25 bg-[var(--color-pool)]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pool)]" />
              The Journal
            </p>
            <h2 className="font-[family-name:var(--font-display)] mt-5 text-[2.25rem] leading-[1] tracking-[-0.025em] text-[var(--color-navy-deep)] sm:text-[3rem] md:text-[3.75rem]">
              Insights from the{" "}
              <span className="italic text-[var(--color-pool)]">deep end</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-navy-deep)]/60">
              Field notes, design playbooks and care guides from three decades of building custom Houston pools.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex w-fit items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] underline decoration-[var(--color-pool)] decoration-2 underline-offset-[10px] transition-colors hover:text-[var(--color-pool)]"
          >
            View all articles
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* ----- Cards grid ----- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {POSTS.map((p, i) => (
            <ArticleCard key={p.href} post={p} index={i + 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Modern article card ---------- */
function ArticleCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
      className="group"
    >
      <Link
        href={post.href}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(0,55,73,0.3)] hover:ring-[var(--color-pool)]/20"
      >
        {/* Image */}
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
          <Image
            src={post.img}
            alt={post.title}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
          />
          {/* Gradient veil */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Index badge */}
          <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 font-[family-name:var(--font-display)] text-[13px] font-bold text-[var(--color-navy-deep)] shadow-sm backdrop-blur">
            0{index}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4 sm:pt-6">
          {/* Meta row */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--color-navy-deep)]/45">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-navy-deep)]/25" />
            <span>{post.readTime} read</span>
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-display)] mt-3 text-[1.35rem] leading-[1.18] tracking-[-0.01em] text-[var(--color-navy-deep)] transition-colors group-hover:text-[var(--color-pool)]">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-[var(--color-navy-deep)]/60">
            {post.excerpt}
          </p>

          {/* Read more */}
          <div className="mt-6 flex items-center justify-between border-t border-[var(--color-navy-deep)]/8 pt-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool)]">
              Read article
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-navy-deep)]/[0.04] text-[var(--color-navy-deep)] transition-all group-hover:bg-[var(--color-pool)] group-hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
