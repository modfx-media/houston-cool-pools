import type { MetadataRoute } from "next";
import { SITE_URLS } from "../lib/site-urls";
import { getLiveCombos } from "../data/pseo/slugs";
import { SITE_URL } from "../lib/business";
import { queryPublishedSeoDocs } from "../lib/cms/queries";
import { normalizeCmsPath } from "../lib/cms/url";

function frequencyFor(priority: number): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (priority >= 0.9) return "weekly";
  if (priority >= 0.7) return "monthly";
  return "yearly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsDocs = await queryPublishedSeoDocs();
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

  const legacy = SITE_URLS.filter(({ path }) => !skip.has(normalizeCmsPath(path))).map(
    ({ path, priority, lastModified }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(cmsDates.get(normalizeCmsPath(path)) || lastModified),
      changeFrequency: frequencyFor(priority),
      priority,
    }),
  );

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
    .filter((doc) => !doc.noIndex && !doc.excludeFromSitemap)
    .map((doc) => {
      const path = normalizeCmsPath(doc.path);
      return {
        url: `${SITE_URL}${path}`,
        lastModified: new Date(doc.sourceUpdatedAt || doc.updatedAt || Date.now()),
        changeFrequency: "monthly" as const,
        priority: path.startsWith("/blogs/") ? 0.8 : 0.64,
      };
    })
    .filter((item) => !listed.has(item.url));

  return [...legacy, ...areas, ...pseo, ...cmsOnly];
}
