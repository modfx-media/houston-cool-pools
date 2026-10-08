import type { Metadata } from "next";

import { queryRoutedContentByPath } from "./queries";
import { withCMS } from "./safe";
import type { CmsRoutedDoc } from "./types";
import { getPublicSiteURL, normalizeCmsPath } from "./url";

function mediaUrl(image: unknown): string | undefined {
  if (!image || typeof image !== "object" || !("url" in image)) return undefined;
  const url = (image as { url?: string | null }).url;
  return typeof url === "string" && url.trim() ? url : undefined;
}

export function metadataFromDoc(doc: CmsRoutedDoc, fallback: Metadata): Metadata {
  const site = getPublicSiteURL();
  const title = doc.meta?.title || doc.title || undefined;
  const description = doc.meta?.description || doc.excerpt || undefined;
  const path = doc.path ? normalizeCmsPath(doc.path) : undefined;
  const canonical = doc.canonicalUrl || (path ? `${site}${path === "/" ? "/" : path}` : undefined);
  const image = mediaUrl(doc.meta?.image) || mediaUrl(doc.heroImage);

  return {
    ...fallback,
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: {
      index: !doc.noIndex,
      follow: !doc.noFollow,
    },
    openGraph: {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(image ? { images: [{ url: image, alt: title || "Houston Cool Pools" }] } : {}),
    },
    twitter: {
      ...fallback.twitter,
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}

export async function cmsMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  return withCMS(async () => {
    const routed = await queryRoutedContentByPath(normalizeCmsPath(path));
    if (!routed) return fallback;
    return metadataFromDoc(routed.doc, fallback);
  }, fallback);
}
