"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STEPS = [
  {
    number: "01",
    title: "Book your call",
    body: "Fill out the short form below, it takes about 2 minutes. Tell us what's going on with your pool.",
  },
  {
    number: "02",
    title: "We assess your pool",
    body: "A technician reviews your issue and reaches out within 1 business day to schedule a visit.",
  },
  {
    number: "03",
    title: "Treatment starts",
    body: "We diagnose the problem on-site and get to work: cleaning, repair, or a maintenance plan, whatever it needs.",
  },
];

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-[#f2f8fa] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool-deep)]">
            How It Works
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            From &ldquo;this looks bad&rdquo; to booked in three steps
          </h2>
        </div>

        <div ref={trackRef} className="relative mt-14">
          <div
            aria-hidden
            className="absolute bottom-8 left-[27px] top-8 w-px bg-slate-200 md:left-[35px]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute bottom-8 left-[27px] top-8 w-px origin-top bg-[var(--color-pool)] md:left-[35px]"
          />
          <div className="space-y-10">
            {STEPS.map((step) => (
              <div key={step.number} className="relative flex items-start gap-6 md:gap-8">
                <span className="font-[family-name:var(--font-display)] relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-xl font-extrabold text-[var(--color-pool)] shadow-sm md:h-[70px] md:w-[70px] md:text-2xl">
                  {step.number}
                </span>
                <div className="pt-2 md:pt-4">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-navy-deep)] md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

