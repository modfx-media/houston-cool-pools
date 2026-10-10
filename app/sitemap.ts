import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { SITE_URLS } from "../lib/site-urls";
import { getLiveCombos } from "../data/pseo/slugs";
import { SITE_URL } from "../lib/business";
import { getArticle } from "../lib/articles";
import { queryPublishedSeoDocs } from "../lib/cms/queries";
import { articleGoesLiveAt, isArticleLive } from "../lib/cms/schedule";
import { normalizeCmsPath } from "../lib/cms/url";
import type { CmsSeoDoc } from "../lib/cms/types";

function frequencyFor(priority: number): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (priority >= 0.9) return "weekly";
  if (priority >= 0.7) return "monthly";
  return "yearly";
}

function blogIsPublic(path: string, cmsPublishedAt: string | null | undefined): boolean {
  if (!path.startsWith("/blogs/")) return true;
  const article = getArticle(path.slice("/blogs/".length));
  const hardcodedLive = article ? isArticleLive(article.publishedAt) : false;
  if (cmsPublishedAt) return isArticleLive(cmsPublishedAt) || hardcodedLive;
  if (article) return hardcodedLive;
  return true;
}

function blogLastModified(path: string, doc: CmsSeoDoc | undefined, fallback: string | number | Date): Date {
  const article = path.startsWith("/blogs/") ? getArticle(path.slice("/blogs/".length)) : null;
  const cmsDate = doc?.publishedAt && isArticleLive(doc.publishedAt) ? doc.publishedAt : null;
  const hardcodedDate = article && isArticleLive(article.publishedAt) ? article.publishedAt : null;
  const chosen = cmsDate || hardcodedDate;
  if (chosen) {
    const liveAt = articleGoesLiveAt(chosen);
    if (liveAt != null) return new Date(liveAt);
  }
  if (doc?.publishedAt && isArticleLive(doc.publishedAt)) return new Date(doc.publishedAt);
  return new Date(doc?.sourceUpdatedAt || doc?.updatedAt || fallback);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const cmsDocs = await queryPublishedSeoDocs();
  const cmsByPath = new Map(cmsDocs.map((doc) => [normalizeCmsPath(doc.path), doc]));
  const skip = new Set(
    cmsDocs
      .filter((doc) => doc.noIndex || doc.excludeFromSitemap)
      .map((doc) => normalizeCmsPath(doc.path)),
  );
  const cmsDates = new Map(
    cmsDocs.map((doc) => [
      normalizeCmsPath(doc.path),
      doc.sourceUpdatedAt || doc.updatedAt || null,
    ]),
  );

  const legacy = SITE_URLS.filter(({ path }) => {
    const normalized = normalizeCmsPath(path);
    if (skip.has(normalized)) return false;
    return blogIsPublic(normalized, cmsByPath.get(normalized)?.publishedAt);
  }).map(({ path, priority, lastModified }) => {
    const normalized = normalizeCmsPath(path);
    const doc = cmsByPath.get(normalized);
    return {
      url: `${SITE_URL}${path}`,
      lastModified: normalized.startsWith("/blogs/")
        ? blogLastModified(normalized, doc, lastModified)
        : new Date(cmsDates.get(normalized) || lastModified),
      changeFrequency: frequencyFor(priority),
      priority,
    };
  });

  // Programmatic SEO combos (service × location) - live-only.
  const pseo = getLiveCombos()
    .filter((c) => !skip.has(normalizeCmsPath(`/${c.slug}`)))
    .map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      lastModified: new Date(cmsDates.get(normalizeCmsPath(`/${c.slug}`)) || Date.now()),
      changeFrequency: "monthly" as const,
      priority: c.location.tier === 1 ? 0.72 : 0.6,
    }));

  const areasPath = "/areas-we-serve";
  const areas = skip.has(areasPath)
    ? []
    : [
        {
          url: `${SITE_URL}${areasPath}`,
          lastModified: new Date(cmsDates.get(areasPath) || Date.now()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ];

  const listed = new Set([...legacy, ...areas, ...pseo].map((item) => item.url));
  const cmsOnly = cmsDocs
    .filter((doc) => {
      const path = normalizeCmsPath(doc.path);
      return !doc.noIndex && !doc.excludeFromSitemap && !listed.has(`${SITE_URL}${path}`) && blogIsPublic(path, doc.publishedAt);
    })
    .map((doc) => {
      const path = normalizeCmsPath(doc.path);
      return {
        url: `${SITE_URL}${path}`,
        lastModified: path.startsWith("/blogs/")
          ? blogLastModified(path, doc, doc.sourceUpdatedAt || doc.updatedAt || Date.now())
          : new Date(doc.sourceUpdatedAt || doc.updatedAt || Date.now()),
        changeFrequency: "monthly" as const,
        priority: path.startsWith("/blogs/") ? 0.8 : 0.64,
      };
    });

  return [...legacy, ...areas, ...pseo, ...cmsOnly];
}
