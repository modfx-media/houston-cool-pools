"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  EQUIPMENT_MANUAL_CATEGORIES,
  EQUIPMENT_MANUAL_PDF_BASE,
  FEATURED_PRODUCT_PDF,
  FREEZE_STEPS,
  HURRICANE_STEPS,
  POOL_SCHOOL_LESSONS,
  PRODUCT_GROUPS,
  type SevereWeatherStep,
} from "../../../../lib/pool-resources";
import { PHONE_DISPLAY, PHONE_HREF, QUOTE_HREF } from "../../../../lib/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

const SECTIONS: {
  id: string;
  label: string;
  short: string;
  count: string;
  icon: ReactNode;
}[] = [
  {
    id: "equipment-manuals",
    label: "Equipment Manuals",
    short: "Manuals",
    count: "42 PDFs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M14 3v5h5M9 13h6M9 17h6M9 9h1M6 21h12a2 2 0 0 0 2-2V8l-5-5H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "product-brochures",
    label: "Product Brochures",
    short: "Brochures",
    count: "20 specs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M4 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14M12 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14M4 19h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "pool-school",
    label: "Pool School",
    short: "Videos",
    count: "12 lessons",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M3 6.5A2.5 2.5 0 0 1 5.5 4h10A2.5 2.5 0 0 1 18 6.5v11A2.5 2.5 0 0 1 15.5 20h-10A2.5 2.5 0 0 1 3 17.5v-11ZM18 9l3-2v10l-3-2V9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "severe-weather",
    label: "Severe Weather",
    short: "Weather",
    count: "Storm & freeze",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
        <path
          d="M7 18a5 5 0 1 1 1.5-9.8A6 6 0 0 1 20 10a4 4 0 0 1-1 7.9M9 21l1-2M13 21l1-3M17 21l1-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function PoolResourcesClient() {
  const totalManuals = EQUIPMENT_MANUAL_CATEGORIES.reduce(
    (sum, c) => sum + c.manuals.length,
    0,
  );
  const totalProducts = PRODUCT_GROUPS.reduce(
    (sum, g) => sum + g.products.length,
    0,
  );

  const [manualQuery, setManualQuery] = useState("");
  const [activeLesson, setActiveLesson] = useState(POOL_SCHOOL_LESSONS[0]);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  // Scroll-spy: track which section is currently in view and light up the
  // matching sticky-nav pill so the user always knows where they are.
  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose top is closest to (but below) the sticky nav.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const filteredManuals = useMemo(() => {
    const q = manualQuery.trim().toLowerCase();
    if (!q) return EQUIPMENT_MANUAL_CATEGORIES;
    return EQUIPMENT_MANUAL_CATEGORIES.map((c) => ({
      ...c,
      manuals: c.manuals.filter((m) => m.name.toLowerCase().includes(q)),
    })).filter((c) => c.manuals.length > 0);
  }, [manualQuery]);

  const stats = [
    { value: totalManuals, label: "Equipment PDFs" },
    { value: totalProducts, label: "Product spec pages" },
    { value: POOL_SCHOOL_LESSONS.length, label: "Video lessons" },
    { value: HURRICANE_STEPS.length + FREEZE_STEPS.length, label: "Weather steps" },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] pt-36 pb-16 text-white md:pt-44 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,124,182,0.35),transparent_62%)]" />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--color-pool)]/20 blur-[140px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[var(--color-pool-deep)]/30 blur-[140px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Pool Owner Resources
          </p>
          <h1 className="font-[family-name:var(--font-display)] mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Everything you need to run your pool,{" "}
            <span className="italic text-[var(--color-gold-light)]">in one place</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
            A combined hub for the resources most Houston Cool Pools owners look
            for after their pool is finished. Owner&rsquo;s manuals, manufacturer
            brochures, on-demand video tutorials, and hurricane / freeze
            checklists - all organized by category.
          </p>

          {/* Quick stats */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Sticky section nav ===== */}
      <div className="sticky top-[80px] z-30 border-y border-slate-200/70 bg-white/85 shadow-[0_12px_36px_-24px_rgba(0,27,36,0.35)] backdrop-blur-2xl md:top-[92px]">
        {/* Accent line */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-pool)] to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4 py-3.5 md:px-8 md:py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-4">
            <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-pool)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-pool-deep)] md:inline-flex">
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden>
                <path
                  d="M12 4v13m0 0l-5-5m5 5l5-5M5 20h14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Jump to
            </span>

            <nav
              aria-label="Resource sections"
              className="flex flex-nowrap items-center justify-center gap-1 md:flex-wrap md:gap-2"
            >
              {SECTIONS.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`group inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] transition-all md:gap-1.5 md:px-4 md:py-2 md:text-[12px] md:tracking-[0.1em] ${
                      isActive
                        ? "bg-gradient-to-r from-[var(--color-pool)] to-[var(--color-pool-deep)] text-white shadow-[0_10px_22px_-10px_rgba(0,124,182,0.75)]"
                        : "border border-slate-200 bg-white text-[var(--color-navy-deep)] hover:-translate-y-0.5 hover:border-[var(--color-pool)] hover:bg-[var(--color-pool)]/5 hover:text-[var(--color-pool-deep)]"
                    }`}
                  >
                    <span
                      className={`transition-colors ${
                        isActive ? "text-white" : "text-[var(--color-pool-deep)]"
                      }`}
                    >
                      {s.icon}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{s.short}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <main className="bg-[#f7f6f2]">
        {/* ===== Section 1: Equipment Manuals ===== */}
        <section
          id="equipment-manuals"
          className="scroll-mt-32 border-b border-black/5 py-16 md:py-20"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Owner's Manuals"
              title="Pool Equipment Manuals"
              subtitle={`${totalManuals} downloadable PDFs for the equipment on your Houston Cool Pools build - cleaners, pumps, filters, heaters, lighting, sanitation, water features and more.`}
            />

            {/* Search */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Search manuals - IntelliFlo, MasterTemp, IntelliChlor…"
                  value={manualQuery}
                  onChange={(e) => setManualQuery(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-[14.5px] text-slate-700 shadow-[0_10px_40px_-24px_rgba(0,27,36,0.2)] placeholder:text-slate-400 focus:border-[var(--color-pool)] focus:outline-none focus:ring-4 focus:ring-[var(--color-pool)]/10"
                />
              </div>
            </div>

            <div className="mt-12 space-y-8">
              {filteredManuals.length === 0 ? (
                <p className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                  No manuals matched &ldquo;{manualQuery}&rdquo;. Try a different search.
                </p>
              ) : (
                filteredManuals.map((c, ci) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.55, delay: ci * 0.04, ease }}
                    className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-28px_rgba(0,27,36,0.2)] md:p-8"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-pool)]/10 text-[var(--color-pool)]">
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                          <path
                            d="M14 3v5h5M9 13h6M9 17h6M9 9h1M6 21h12a2 2 0 0 0 2-2V8l-5-5H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[var(--color-navy-deep)] sm:text-2xl">
                        {c.title}
                      </h3>
                      <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {c.manuals.length} PDF
                      </span>
                    </div>

                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {c.manuals.map((m, mi) => (
                        <a
                          key={`${m.name}-${mi}`}
                          href={`${EQUIPMENT_MANUAL_PDF_BASE}${m.file}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-[var(--color-pool)]/50 hover:shadow-[0_10px_30px_-20px_rgba(0,27,36,0.25)]"
                        >
                          <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500 group-hover:bg-[var(--color-pool)]/10 group-hover:text-[var(--color-pool)]">
                            PDF
                          </span>
                          <span className="flex-1 text-[14px] font-semibold text-[var(--color-navy-deep)] group-hover:text-[var(--color-pool)]">
                            {m.name}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4 flex-none text-slate-400 transition-all group-hover:translate-y-0.5 group-hover:text-[var(--color-pool)]"
                          >
                            <path d="M12 4v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ===== Section 2: Product Brochures ===== */}
        <section
          id="product-brochures"
          className="scroll-mt-32 border-b border-black/5 bg-white py-16 md:py-20"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Product Library"
              title="Product Brochures & Information"
              subtitle="Manufacturer spec sheets and product pages for the equipment we install in every Houston Cool Pools build. Click any item for full manufacturer details."
            />

            {/* Featured PDF */}
            <motion.a
              href={FEATURED_PRODUCT_PDF.href}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease }}
              className="group relative mt-10 flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-navy-deep)] to-[#022b3a] p-7 text-white shadow-[0_20px_60px_-30px_rgba(0,27,36,0.5)] sm:flex-row sm:items-center sm:justify-between md:p-8"
            >
              <span
                aria-hidden
                className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--color-pool)]/30 blur-3xl"
              />
              <span
                aria-hidden
                className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-[var(--color-gold-light)]/25 blur-3xl"
              />
              <div className="relative">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                  Free PDF download
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold sm:text-3xl">
                  {FEATURED_PRODUCT_PDF.label}
                </h3>
                <p className="mt-2 max-w-md text-[15px] text-white/75">
                  Our free guide walks you through every stage of designing and
                  building your pool.
                </p>
              </div>
              <span className="relative inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[var(--color-navy-deep)] transition group-hover:brightness-110">
                Download PDF
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M12 4v12m0 0l4-4m-4 4l-4-4M4 20h16"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>

            <p className="mt-10 text-center text-[13px] italic text-slate-500">
              (Click any item for more information.)
            </p>

            <div className="mt-6 space-y-10">
              {PRODUCT_GROUPS.map((g, gi) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: gi * 0.04, ease }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-slate-200" />
                    <h3 className="font-[family-name:var(--font-display)] text-[11.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                      {g.title}
                    </h3>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {g.products.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[var(--color-pool)]/50 hover:shadow-[0_10px_40px_-24px_rgba(0,27,36,0.25)]"
                      >
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            {p.brand}
                          </p>
                          <p className="mt-1 text-[15px] font-semibold text-[var(--color-navy-deep)] transition group-hover:text-[var(--color-pool)]">
                            {p.name}
                          </p>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="mt-1 h-4 w-4 flex-none text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-pool)]"
                        >
                          <path
                            d="M7 17L17 7M17 7H8M17 7v9"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 3: Pool School ===== */}
        <section
          id="pool-school"
          className="scroll-mt-32 border-b border-black/5 py-16 md:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Video Tutorials"
              title="Pool School"
              subtitle="Free on-demand video lessons taught by our service team - water testing, filter cleaning, storm shutdown and more."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <motion.div
                key={activeLesson.youtubeId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-[0_20px_60px_-30px_rgba(0,27,36,0.5)] ring-1 ring-black/5">
                  <iframe
                    key={activeLesson.youtubeId}
                    src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeId}?rel=0&modestbranding=1`}
                    title={activeLesson.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-6 md:p-7">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                    Now playing
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-[24px] font-extrabold leading-tight text-[var(--color-navy-deep)] sm:text-[28px]">
                    {activeLesson.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
                    {activeLesson.blurb}
                  </p>
                </div>
              </motion.div>

              <aside>
                <div className="lg:sticky lg:top-40">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                    Curriculum
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-[var(--color-navy-deep)]">
                    {POOL_SCHOOL_LESSONS.length} lessons
                  </h3>
                  <ol className="mt-5 space-y-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2">
                    {POOL_SCHOOL_LESSONS.map((l, i) => {
                      const isActive = l.youtubeId === activeLesson.youtubeId;
                      return (
                        <li key={l.youtubeId}>
                          <button
                            type="button"
                            onClick={() => setActiveLesson(l)}
                            className={`group flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition ${
                              isActive
                                ? "border-[var(--color-pool)] bg-[var(--color-pool)]/5 shadow-[0_10px_30px_-20px_rgba(0,124,182,0.4)]"
                                : "border-slate-200/80 bg-white hover:border-[var(--color-pool)]/40 hover:bg-slate-50"
                            }`}
                          >
                            <span
                              className={`grid h-9 w-9 flex-none place-items-center rounded-xl text-[12px] font-bold ${
                                isActive
                                  ? "bg-[var(--color-pool)] text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-[var(--color-pool)]/10 group-hover:text-[var(--color-pool)]"
                              }`}
                            >
                              {isActive ? (
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              ) : (
                                String(i + 1).padStart(2, "0")
                              )}
                            </span>
                            <span className="flex flex-col leading-tight">
                              <span
                                className={`text-[14px] font-semibold ${
                                  isActive ? "text-[var(--color-navy-deep)]" : "text-slate-700"
                                }`}
                              >
                                {l.title}
                              </span>
                              <span className="mt-0.5 text-[11.5px] uppercase tracking-[0.16em] text-slate-400">
                                Video &middot; Lesson {i + 1}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== Section 4: Severe Weather ===== */}
        <section
          id="severe-weather"
          className="scroll-mt-32 bg-white py-16 md:py-20"
        >
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Weather Guide"
              title="Severe Weather Pool Care"
              subtitle="Every Houston pool owner needs a plan for hurricane season and the occasional hard freeze. Follow these steps to protect your investment when the forecast turns."
            />

            {/* Hurricane */}
            <div className="mb-6 mt-10 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#a01d1d] to-[#f37121] text-white shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#a01d1d]">
                  Hurricane &amp; Tropical Storm
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-navy-deep)] sm:text-3xl">
                  Storm-prep checklist
                </h3>
              </div>
            </div>
            <Checklist steps={HURRICANE_STEPS} tone="warn" />

            {/* Freeze */}
            <div className="mb-6 mt-16 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-pool-deep)] to-[var(--color-pool)] text-white shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9M8 4l4 3 4-3M8 20l4-3 4 3M4 8l1 4-1 4M20 8l-1 4 1 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool-deep)]">
                  Hard Freeze
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-navy-deep)] sm:text-3xl">
                  Freezing-weather checklist
                </h3>
              </div>
            </div>
            <Checklist steps={FREEZE_STEPS} tone="cold" />
          </div>
        </section>
      </main>

      {/* ===== Closing CTA ===== */}
      <section className="relative overflow-hidden bg-[var(--color-navy-deep)] py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,124,182,0.3),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool)]">
            Need hands-on help?
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight md:text-4xl">
            Our service team is one call away
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Storm damage, equipment questions, or an issue you can&rsquo;t solve
            with a manual? Reach out and we&rsquo;ll take care of it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-navy-deep)] shadow-lg transition-all hover:-translate-y-0.5"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={QUOTE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/*  Sub-components                                                          */
/* ------------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-pool)]">
        <span className="h-px w-8 bg-[var(--color-pool)]/60" />
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-extrabold tracking-tight text-[var(--color-navy-deep)] md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600 md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function Checklist({
  steps,
  tone,
}: {
  steps: SevereWeatherStep[];
  tone: "warn" | "cold";
}) {
  const accent =
    tone === "warn"
      ? "from-[#a01d1d] to-[#f37121]"
      : "from-[var(--color-pool-deep)] to-[var(--color-pool)]";
  const chipBg = tone === "warn" ? "bg-[#a01d1d]" : "bg-[var(--color-pool-deep)]";

  return (
    <div className="grid gap-4">
      {steps.map((s, i) => (
        <motion.article
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-28px_rgba(0,27,36,0.2)] md:p-7"
        >
          <span aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
          <div className="flex items-start gap-4">
            <span
              className={`grid h-11 w-11 flex-none place-items-center rounded-2xl ${chipBg} font-[family-name:var(--font-display)] text-[15px] font-extrabold text-white shadow-md`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-[19px] font-extrabold text-[var(--color-navy-deep)] sm:text-xl">
                {s.title}
              </h4>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">
                {s.body}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
