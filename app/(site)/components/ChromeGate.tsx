"use client";

import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/free-pool-quote", "/pool-maintenance"];

// Shared with other components (e.g. AnalyticsScripts) that need to know
// whether the current route is a standalone landing page.
export function isChromeHidden(pathname: string) {
  return HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (isChromeHidden(pathname)) return null;
  return <>{children}</>;
}
