const HIDDEN_PREFIXES = ["/free-pool-quote", "/pool-maintenance"];

// Sales pages that bring their own header and keep only the footer: no
// tagline banner, sticky quote bar, chat widget or main office number.
const LEAN_PREFIXES = ["/the-pool-nerd"];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isChromeHidden(pathname: string) {
  return matchesPrefix(pathname, HIDDEN_PREFIXES);
}

export function isLeanChrome(pathname: string) {
  return matchesPrefix(pathname, LEAN_PREFIXES);
}
