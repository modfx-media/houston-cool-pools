"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type BeforeAfterProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Initial position (0-100). Defaults to 50. */
  initial?: number;
  /** Optional wrapper class overrides. */
  className?: string;
};

/**
 * Drag-to-reveal before / after image comparison slider.
 * - Mouse + touch + keyboard (arrow keys) supported
 * - "Before" fills the container, "After" is clipped by inset-inline to the slider position
 * - Centered handle with a soft ring and grip dots
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  initial = 50,
  className = "",
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, raw));
    setPosition(clamped);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
      if (typeof clientX === "number") updateFromClientX(clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updateFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      setPosition(0);
    } else if (e.key === "End") {
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`Before and after pool remodel comparison: ${beforeAlt} vs ${afterAlt}`}
      onMouseDown={(e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        const t = e.touches[0];
        if (t) updateFromClientX(t.clientX);
      }}
      className={`group relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden rounded-[24px] border border-slate-200/70 bg-black shadow-[0_30px_70px_-30px_rgba(0,55,73,0.55)] select-none ${className}`}
    >
      {/* BEFORE layer (fills entire card) */}
      <div className="absolute inset-0">
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
          priority
          draggable={false}
        />
      </div>

      {/* AFTER layer (clipped to the slider position) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
        aria-hidden
      >
        {/* Inner wrapper is the full card size so the image doesn't squish */}
        <div className="relative h-full" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}>
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Corner labels - each fades out once the slider is fully past its side */}
      <span
        aria-hidden={position < 4}
        className={`pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/95 backdrop-blur-sm ring-1 ring-white/20 transition-opacity duration-200 ${
          position < 4 ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        After
      </span>
      <span
        aria-hidden={position > 96}
        className={`pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/95 backdrop-blur-sm ring-1 ring-white/20 transition-opacity duration-200 ${
          position > 96 ? "opacity-0" : "opacity-100"
        }`}
      >
        Before
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
      </span>

      {/* Slider vertical divider */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <span
          aria-hidden
          className="block h-full w-[3px] bg-white shadow-[0_0_18px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* Draggable handle */}
      <button
        type="button"
        role="slider"
        aria-label="Slide to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        onMouseDown={(e) => {
          e.stopPropagation();
          setDragging(true);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setDragging(true);
        }}
        className="absolute top-1/2 z-20 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full bg-white text-[var(--color-navy-deep)] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] ring-2 ring-white/70 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-pool)]/40 active:cursor-grabbing"
        style={{ left: `${position}%` }}
      >
        {/* Grip icon: two triangles pointing outward */}
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M9 6l-4 6 4 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 6l4 6-4 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Hint at the bottom */}
      <p className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-black/45 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm opacity-100 transition-opacity duration-500 group-hover:opacity-0">
        Drag to compare
      </p>
    </div>
  );
}
