"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Before/after drag-comparison slider. Users drag the vertical handle
 * left/right to reveal how a Houston Cool Pools remodel transforms a
 * tired backyard into a resort-quality build.
 */
export function BeforeAfter() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f5f8fa] to-white py-14 sm:py-28">
      <Backdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
              Remodel Transformations
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-[#0a1628] sm:text-5xl lg:text-6xl"
          >
            Drag to see how we{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                transform backyards
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-[#00b4d8] to-transparent"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            From tired 90s pool to resort-style outdoor living. Slide the handle
            to reveal the same backyard, redesigned from the coping up.
          </motion.p>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          {/* soft glow */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#00b4d8]/25 via-transparent to-[#0ea5e9]/20 blur-2xl"
          />
          <ComparisonSlider
            before="/images/pool-remodel/before.png"
            after="/images/pool-remodel/after.png"
            beforeLabel="Before"
            afterLabel="After"
          />
        </motion.div>

        {/* Stats + CTA */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            { value: "10-14", label: "Week Turnaround" },
            { value: "100%", label: "On-Budget Guarantee" },
            { value: "30+", label: "Years Remodeling" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_18px_40px_-22px_rgba(15,32,53,0.15)]"
            >
              <div className="font-display text-3xl font-extrabold sm:text-4xl">
                <span className="bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] bg-clip-text text-transparent">
                  {s.value}
                </span>
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-10 text-center"
        >
          <a
            href="#quote-form"
            className="group inline-flex items-center gap-2 rounded-full bg-[#0a1628] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0a1628]/30 transition hover:bg-[#00b4d8] hover:text-[#0a1628]"
          >
            Get a Free Remodel Consult
            <span className="inline-block transition group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Comparison slider ---------- */

function ComparisonSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  // 0 = fully before, 1 = fully after. Start at 0.5.
  const pct = useMotionValue(0.5);
  // Reveal the "after" image from the right by clipping its left edge.
  const afterClip = useTransform(pct, (v) => `inset(0 0 0 ${v * 100}%)`);
  const handleLeft = useTransform(pct, (v) => `${v * 100}%`);
  // Labels only appear when their region has enough visible width to hold them.
  // BEFORE lives at left-4: needs handle at least ~14% from left for the label
  // to sit inside the visible before region. AFTER at right-4: needs handle
  // at most ~86% so the after region on the right still fits the label.
  const beforeOpacity = useTransform(pct, (v) => {
    if (v <= 0.05) return 0;
    if (v >= 0.14) return 1;
    return (v - 0.05) / (0.14 - 0.05);
  });
  const afterOpacity = useTransform(pct, (v) => {
    if (v <= 0.86) return 1;
    if (v >= 0.95) return 0;
    return 1 - (v - 0.86) / (0.95 - 0.86);
  });

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / rect.width),
      );
      pct.set(ratio);
    },
    [pct],
  );

  // Global listeners kick in only while dragging - avoids the common
  // pointer-capture-on-child-image bug that swallows subsequent pointermoves.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      // Prevent text selection while dragging.
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
      setDragging(false);
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, setFromClientX]);

  const onPointerDown = (e: React.PointerEvent) => {
    // Container handles capture so <img> children can't swallow events.
    e.preventDefault();
    draggingRef.current = true;
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.03;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      animate(pct, Math.max(0, pct.get() - step), { duration: 0.15 });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      animate(pct, Math.min(1, pct.get() + step), { duration: 0.15 });
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-900 shadow-[0_30px_60px_-20px_rgba(15,32,53,0.35)]"
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* BEFORE - full base layer (always visible under after) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={before}
          alt="Before remodel"
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          priority={false}
          draggable={false}
        />
      </div>

      {/* AFTER - full size, clipped from the left by pct */}
      <motion.div
        aria-hidden
        style={{ clipPath: afterClip, WebkitClipPath: afterClip }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={after}
          alt="After remodel by Houston Cool Pools"
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
          priority={false}
          draggable={false}
        />
      </motion.div>

      {/* Labels - fade out once their side becomes too narrow to hold them */}
      <motion.span
        style={{ opacity: beforeOpacity }}
        className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#0a1628]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur"
      >
        {beforeLabel}
      </motion.span>
      <motion.span
        style={{ opacity: afterOpacity }}
        className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#00b4d8]/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1628] shadow-lg backdrop-blur"
      >
        {afterLabel}
      </motion.span>

      {/* Handle line */}
      <motion.div
        aria-hidden
        style={{ left: handleLeft }}
        className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-white/95 shadow-[0_0_24px_rgba(0,180,216,0.7)]"
      />

      {/* Drag knob */}
      <motion.div
        aria-hidden
        style={{ left: handleLeft }}
        className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: dragging ? 1.08 : [1, 1.06, 1],
            boxShadow: dragging
              ? "0 12px 40px rgba(0,180,216,0.55)"
              : "0 8px 24px rgba(0,180,216,0.35)",
          }}
          transition={
            dragging
              ? { duration: 0.2, ease }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
          className="grid h-14 w-14 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-[#00b4d8] to-[#0ea5e9] text-white"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
            <path d="M8 5l-6 7 6 7 1.5-1.5L5 12l4.5-5.5zM16 5l-1.5 1.5L19 12l-4.5 5.5L16 19l6-7z" />
          </svg>
        </motion.div>
        {/* pulse ring */}
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#00b4d8]/50"
        />
      </motion.div>

      {/* Hint text (fades once dragged) */}
      {!dragging ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease }}
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0a1628]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur"
        >
          &larr; Drag to Compare &rarr;
        </motion.div>
      ) : null}
    </div>
  );
}

/* ---------- Backdrop ---------- */

function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,22,40,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-30, 20, -30], y: [-20, 30, -20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-6%] top-1/3 h-[380px] w-[380px] rounded-full bg-[#00b4d8]/12 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [30, -20, 30], y: [10, 50, 10] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-6%] bottom-1/4 h-[420px] w-[420px] rounded-full bg-[#22d3ee]/10 blur-3xl"
      />
    </>
  );
}
