import Image from "next/image";
import { PHONE_DISPLAY, PHONE_HREF } from "../_lib/phone";

export function LpHeader() {
  return (
    <header className="relative z-10 border-b border-white/10 bg-[var(--color-navy-deep)] px-6 py-4 md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Image
          src="/images/hcp-logo-print.png"
          alt="Houston Cool Pools"
          width={2365}
          height={655}
          priority
          className="h-9 w-auto md:h-10"
        />
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={PHONE_HREF}
            className="hidden whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-[var(--color-gold-light)] sm:inline-block"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href="#booking"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-pool)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}
