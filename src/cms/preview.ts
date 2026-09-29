function isPublicPath(path: string): boolean {
  if (!path.startsWith("/")) return false;
  if (path.includes("://") || path.includes("..")) return false;
  if (path.includes("?") || path.includes("#") || path.includes("//")) return false;
  const segments = path.split("/").filter((segment) => segment.length > 0);
  if (segments.some((segment) => segment === "null" || segment === "undefined")) {
    return false;
  }
  return true;
}

function normalize(path: string): string {
  const trimmed = path.trim();
  if (trimmed !== "/" && trimmed.endsWith("/")) return trimmed.slice(0, -1);
  return trimmed;
}

/**
 * Preview URL for a public pathname. Returns null when the path is missing,
 * contains a null segment, or PREVIEW_SECRET is unset.
 */
export function previewFromPath(
  path?: string | null,
  fallback?: string | null,
): string | null {
  const raw = (typeof path === "string" && path.trim()) || (typeof fallback === "string" && fallback.trim()) || "";
  if (!raw) return null;
  const normalized = normalize(raw);
  if (!isPublicPath(normalized)) return null;
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;
  const params = new URLSearchParams({
    path: normalized,
    previewSecret: secret,
  });
  return `/next/preview?${params.toString()}`;
}
