"use client";

import Image from "next/image";
import { LP_CONTACT } from "../_lib/data";

export function LpFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#06101e] py-10 text-sm text-[#94a3b8] sm:py-16">
      {/* subtle cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-[#00b4d8]/8 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center sm:px-10">
        {/* Logo */}
        <Image
          src="/images/hcp-logo-print.png"
          alt="Houston Cool Pools"
          width={2365}
          height={655}
          className="h-12 w-auto"
        />

        {/* Tagline */}
        <p className="mt-5 max-w-md text-[13px] leading-relaxed text-[#94a3b8]">
          Serving Greater Houston since 1996. Dream pools, built beautifully.
        </p>

        {/* Contact */}
        <div className="mt-7 flex flex-col items-center gap-2 text-[13px] leading-relaxed">
          <a
            href={LP_CONTACT.phoneHref}
            className="font-display text-base font-bold text-white transition hover:text-[#00b4d8]"
          >
            {LP_CONTACT.phoneDisplay}
          </a>
          <p className="max-w-xs text-[12.5px]">{LP_CONTACT.address}</p>
        </div>

        {/* Social */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <a
            href={LP_CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Houston Cool Pools on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#00b4d8] hover:bg-[#00b4d8] hover:text-[#0a1628]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        {/* Copyright */}
        <p className="mt-5 text-xs text-[#64748b]">
          &copy; {new Date().getFullYear()} Houston Cool Pools. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
