"use client";

import { motion } from "motion/react";
import { BUSINESS } from "../../../../lib/business";
import { LP_CONTACT } from "../_lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICE_AREAS = BUSINESS.areaServed;

const MAP_QUERY = encodeURIComponent(LP_CONTACT.address);
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export function MapSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1628] py-12 sm:py-20">
      {/* backdrop motion graphics */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [-40, 30, -40], y: [-20, 30, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-6%] top-[10%] h-[360px] w-[360px] rounded-full bg-[#00b4d8]/18 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [40, -30, 40], y: [20, 60, 20] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-6%] bottom-[5%] h-[380px] w-[380px] rounded-full bg-[#22d3ee]/12 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            {/* glow ring */}
            <div
              aria-hidden
              className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-[#00b4d8]/40 via-transparent to-[#0ea5e9]/30 blur-xl"
            />

            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0f2035] shadow-2xl shadow-black/40">
              {/* corner accents */}
              <span
                aria-hidden
                className="absolute left-3 top-3 z-10 h-3 w-3 border-l-2 border-t-2 border-[#00b4d8]"
              />
              <span
                aria-hidden
                className="absolute right-3 top-3 z-10 h-3 w-3 border-r-2 border-t-2 border-[#00b4d8]"
              />
              <span
                aria-hidden
                className="absolute bottom-3 left-3 z-10 h-3 w-3 border-b-2 border-l-2 border-[#00b4d8]"
              />
              <span
                aria-hidden
                className="absolute bottom-3 right-3 z-10 h-3 w-3 border-b-2 border-r-2 border-[#00b4d8]"
              />

              {/* the map (dark-tinted via CSS filter) */}
              <iframe
                title="Houston Cool Pools location map"
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[320px] w-full border-0 sm:h-[360px] lg:h-[400px]"
                style={{
                  filter:
                    "invert(0.9) hue-rotate(180deg) saturate(0.85) brightness(0.95) contrast(0.95)",
                }}
              />

              {/* animated pulse pin (decorative overlay, centered) */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 -m-2 rounded-full bg-[#00b4d8]"
                  />
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.7,
                    }}
                    className="absolute inset-0 -m-1 rounded-full bg-[#00b4d8]"
                  />
                  <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#00b4d8] shadow-lg shadow-[#00b4d8]/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00b4d8]/30 bg-[#00b4d8]/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00b4d8] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00b4d8]" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00b4d8]">
                Visit / Service Area
              </span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Proudly serving all of{" "}
              <span className="bg-gradient-to-r from-[#00b4d8] via-[#22d3ee] to-[#0ea5e9] bg-clip-text text-transparent">
                Greater Houston
              </span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
              Our showroom is in Northwest Houston. Stop by, or we&apos;ll
              come to your backyard for a free in-home quote.
            </p>

            {/* Address card */}
            <a
              href={MAP_LINK_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0f2035]/80 p-4 transition hover:border-[#00b4d8]/40 hover:bg-[#0f2035]"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#00b4d8]/15 text-[#00b4d8]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 7 12 7 12s1 0 1 0 7-6.75 7-12a8 8 0 0 0-7-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00b4d8]">
                  Showroom
                </div>
                <div className="mt-0.5 text-sm font-semibold text-white">
                  {LP_CONTACT.address}
                </div>
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#00b4d8] transition group-hover:translate-x-0.5">
                  Open in Google Maps &rarr;
                </div>
              </div>
            </a>

            {/* Phone + hours */}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <a
                href={LP_CONTACT.phoneHref}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f2035]/80 p-3 transition hover:border-[#00b4d8]/40"
              >
                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#00b4d8]/15 text-[#00b4d8]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden
                  >
                    <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                    Call
                  </div>
                  <div className="text-sm font-bold text-white">
                    {LP_CONTACT.phoneDisplay}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f2035]/80 p-3">
                <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#00b4d8]/15 text-[#00b4d8]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5 11h-6V6h2v5h4z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                    Hours
                  </div>
                  <div className="truncate text-xs font-semibold text-white">
                    Mon-Fri 9a-5p
                  </div>
                </div>
              </div>
            </div>

            {/* Service area pills */}
            <div className="mt-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                We build pools across
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {SERVICE_AREAS.map((a, i) => (
                  <motion.span
                    key={a}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-[#cbd5e1]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#00b4d8]" />
                    {a}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
