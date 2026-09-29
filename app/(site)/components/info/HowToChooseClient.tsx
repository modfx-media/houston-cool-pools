"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { InfoHero } from "./InfoHero";
import { ContactFormSection } from "../contact/ContactFormSection";

const ease = [0.22, 1, 0.36, 1] as const;

type QA = {
  q: string;
  paragraphs: string[];
};

const QUESTIONS: QA[] = [
  {
    q: "Where is your place of business? Do you have a showroom?",
    paragraphs: [
      "This industry is famous (or infamous) for what is known as the \u201cone-poler\u201d - a couple of guys working out of their pick-up truck, trying to build pools. Anybody who lives in an RV, motel, or apartment and works out of the back of a pick-up truck can leave town in the blink of an eye with all of your money. Check to see if the builder owns their own home, or is just renting. A pool builder with strong ties to the community isn\u2019t likely to leave town quickly.",
      "Look for a pool builder who has a showroom or long-term lease in a commercial building. A showroom lets you view the builder\u2019s products, see their operations, and meet some of their employees before you sign a contract. This shows that they\u2019re serious about their business, and not likely to disappear. This type of builder is also more likely to have the financial resources to take care of things if there is a problem with your pool.",
    ],
  },
  {
    q: "How many years have you and your company been in business under the PRESENT NAME and PRESENT OWNERS?",
    paragraphs: [
      "Shady pool builders don\u2019t like this question, because it\u2019s too easy to check out. It\u2019s sadly common in this industry for someone to build some pools, run into financial trouble, go bankrupt, and leave a bunch of unfinished pools in people\u2019s back yards. A few months later they open a NEW company with a new name, and start all over again.",
      "They may change towns in an attempt to put their bad reputation behind them. But sometimes they\u2019ll open that new business right next to the ashes of the last one, hoping most people won\u2019t notice that they abandoned their previous clients.",
      "By the way - when a pool builder goes out of business, your pool warranty disappears. So why risk your home and financial investment? The rule of thumb is that if a pool builder has been in business less than three years, forget them. Or, to be really safe, only deal with pool builders who have been in business for ten years or more.",
    ],
  },
  {
    q: "Have you, your partners, the owners, or the officers ever declared bankruptcy or gone out of business?",
    paragraphs: [
      "This should be an easy question to answer. Those who have not will respond with a resounding \u201cNo.\u201d Those who have are well aware that - thanks to the internet - their secrets are not safe. So they\u2019ll either have to admit it and give you a sad story about why it wasn\u2019t their fault, or you simply won\u2019t hear from them again.",
      "Note: \u201cWhose fault it was\u201d really doesn\u2019t amount to a hill of beans when you\u2019re stuck with an unfinished pool and no warranty.",
    ],
  },
];

export function HowToChooseClient() {
  return (
    <>
      <InfoHero
        eyebrow="Pool Buyer's Guide"
        title="How To Choose The Right Pool Builder"
        subtitle="Ask these 15 questions to protect yourself from an unpleasant pool-building experience - a builder-transparent guide to help you separate the competent and trustworthy from all the rest."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Pool Information", href: "/pool-information" },
          { label: "Choose The Right Builder" },
        ]}
        backgroundImage="/images/gallery/hd/heritage-estate.jpg"
        backgroundAlt="Heritage-style custom pool build"
      />

      <section className="bg-[#f7f6f2] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-24px_rgba(0,27,36,0.2)] md:p-8"
          >
            <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
              Why we wrote this
            </p>
            <p className="mt-4 text-[16px] leading-[1.8] text-slate-700">
              At Houston Cool Pools, we want you to know as much as you can about buying a pool
              before you sign any contracts. We want you to be delighted with your pool and your
              pool-buying experience - no matter who you buy it from. That&rsquo;s why we
              offer you this helpful guide.
            </p>
            <p className="mt-4 text-[16px] leading-[1.8] text-slate-700">
              We suggest you interview prospective builders in person, over the phone, and/or
              via email. Ask them a series of questions to determine their business stability,
              their technical competence, their credibility, and their commitment to customer
              satisfaction. Ultimately, you&rsquo;ll have to decide for yourself whether you can
              trust the builder you&rsquo;re speaking with. But these 15 questions should give
              you some terrific insight into the person and company you&rsquo;re about to do
              business with.
            </p>
          </motion.div>

          {/* Question cards */}
          <div className="mt-10 space-y-6">
            {QUESTIONS.map((qa, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-28px_rgba(0,27,36,0.25)] md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-pool)] via-[var(--color-gold-light)] to-[var(--color-pool)]"
                />
                <div className="flex items-start gap-5">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-[var(--color-navy-deep)] text-lg font-bold text-white shadow-md">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[20px] font-bold leading-snug text-[var(--color-navy-deep)] sm:text-[22px]">
                      &ldquo;{qa.q}&rdquo;
                    </h3>
                    {qa.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="mt-4 text-[16px] leading-[1.8] text-slate-700"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 sm:flex-row md:p-8">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-[var(--color-pool)]">
                Continue reading
              </p>
              <p className="mt-1 font-display text-lg font-bold text-[var(--color-navy-deep)]">
                Questions 4–8 &nbsp;→
              </p>
            </div>
            <Link
              href="/how-to-choose-a-pool-builder-2"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-deep)] px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-pool-deep)]"
            >
              Next Page
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  );
}
