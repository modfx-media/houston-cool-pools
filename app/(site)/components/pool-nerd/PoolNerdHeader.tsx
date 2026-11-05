"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PoolNerdHeader({
  phone,
  phoneHref,
  email,
}: {
  phone: string;
  phoneHref: string;
  email: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-[var(--color-navy-deep)] transition-all duration-300 ${
        scrolled
          ? "border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]"
          : "border-white/5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-300 md:px-10 ${
          scrolled ? "h-16" : "h-20 md:h-24"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-4" aria-label="Houston Cool Pools - Home">
          <Image
            src="/images/hcp-logo-print.png"
            alt="Houston Cool Pools"
            width={2365}
            height={655}
            priority
            sizes="180px"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-8 sm:h-9" : "h-8 sm:h-10 md:h-12"}`}
          />
          <span className="hidden h-8 w-px bg-white/15 lg:block" aria-hidden />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 lg:block">
            Mike Chatelain
          </span>
        </Link>

        <nav aria-label="Contact Mike" className="flex items-center gap-2 sm:gap-3">
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${email}`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10 sm:px-4"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-current" strokeWidth={1.8} aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
            </svg>
            <span className="hidden md:inline">{email}</span>
          </a>
          <a
            href={phoneHref}
            aria-label={`Call or text ${phone}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-pool)] px-3.5 text-[13px] font-semibold sm:text-sm text-white shadow-[0_10px_24px_-10px_rgba(0,124,182,0.9)] transition hover:bg-[var(--color-pool-deep)] sm:px-5"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden>
              <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.4-.6-3.6 0-.6-.5-1-1-1H4c-.6 0-1 .5-1 1 0 9.4 7.6 17 17 17 .6 0 1-.5 1-1V16.5c0-.6-.5-1-1-1z" />
            </svg>
            {phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
