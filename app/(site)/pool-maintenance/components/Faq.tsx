"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How often should my pool actually be serviced?",
    answer:
      "Most Houston pools do best on a weekly visit, especially through the hot months when algae and evaporation move fast. Lower-use or shaded pools can often get by on bi-weekly; we'll tell you honestly which one fits after we see your pool.",
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer:
      "No. Service is month-to-month. Stay because it's working, not because you're locked in.",
  },
  {
    question: "I just need a one-time fix, not ongoing service, is that okay?",
    answer:
      "Yes. Green pool recovery, a single equipment repair, or a seasonal opening/closing are all one-time visits, no plan required.",
  },
  {
    question: "How fast can someone come out?",
    answer:
      "We reply within 1 business day to get a visit scheduled. If it's urgent (green pool, dead pump), say so on the form and we'll prioritize it.",
  },
  {
    question: "What areas do you service?",
    answer:
      "Houston and the surrounding area, including Cypress, Spring, Tomball, Katy, The Heights, Magnolia, The Woodlands, Hockley, Garden Oaks and Pinehurst.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[var(--color-pool-deep)]">
            Common Questions
          </p>
          <h2 className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-tight text-[var(--color-navy-deep)] md:text-4xl">
            Before you book, a few answers
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-navy-deep)] md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--color-pool)] transition-transform ${open ? "rotate-180" : ""}`}
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </button>
                {open && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600 md:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
