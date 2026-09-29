/**
 * Centralized pool-pricing tier catalog. All tiers live in one array so the
 * pricing page can swap between them client-side without a route reload.
 * The pricing-... route folders still exist (each with its own SEO
 * metadata + JSON-LD) but they all render the same client component and just
 * pass the slug of the tier that should be active on first render.
 *
 * The hero photo + gallery images for each tier are derived from
 * `lib/gallery.ts` (`GALLERY_TIERS`) so the pricing pages always show the
 * exact same photos as the matching filter tab on `/gallery` - single source
 * of truth, no drift.
 */

import { GALLERY_TIERS, type GalleryPool, type GalleryTier } from "./gallery";

export type PricingImage = {
  src: string;
  alt: string;
};

export type PoolPricingTier = {
  /** URL slug (matches the folder under app/) */
  slug: string;
  /** href for the tier route (kept in sync with the URL when switching) */
  href: string;
  /** Short pill label */
  label: string;
  /** Long-form range string used in captions */
  range: string;
  /** "Pool Pricing $65k – $90k" style heading */
  heading: string;
  /** Section heading above the gallery */
  sectionHeading: string;
  /** Section intro paragraph */
  body: string;
  /** Hero background image */
  heroImage: string;
  /** Gallery images (flat list - no categorization). */
  images: PricingImage[];
};

/**
 * Per-tier copy for the pricing page, keyed by the matching gallery tier id.
 * Photos + hero come from `GALLERY_TIERS`; this table carries only the
 * pricing-page-specific text (slug, heading, body, etc.).
 */
type TierMeta = {
  slug: string;
  label: string;
  range: string;
  heading: string;
  sectionHeading: string;
  body: string;
};

const TIER_META: Record<string, TierMeta> = {
  "65k-90k": {
    slug: "pricing-65k-90k",
    label: "$65k–$90k",
    range: "$65k – $90k",
    heading: "Pool Pricing $65k – $90k",
    sectionHeading: "Pools in the $65k – $90k Range",
    body: "Projects in this range are usually smaller gunite pools: a straightforward shape, a standard interior finish, and a deck that does the job without resort features. Access, an attached spa, or an upgrade to pebble and travertine is what pushes a yard into the next range. These photos are finished Houston Cool Pools projects, not a package you can order by the dollar amount.",
  },
  "90k-115k": {
    slug: "pricing-90k-115k",
    label: "$90k–$115k",
    range: "$90k – $115k",
    heading: "Pool Pricing $90k – $115k",
    sectionHeading: "Pools in the $90k – $115k Range",
    body: "This is a common landing spot for a full family pool once the drawing includes more water, a better finish, or a spa. The dollar range is not a list of included features. Two yards with the same length can land in different ranges when one needs fence removal to get equipment in and the other does not.",
  },
  "115k-150k": {
    slug: "pricing-115k-150k",
    label: "$115k–$150k",
    range: "$115k – $150k",
    heading: "Pool Pricing $115k – $150k",
    sectionHeading: "Pools in the $115k – $150k Range",
    body: "Pools in this range usually carry a structural extra — a raised spa, a longer footprint, a more expensive deck — on top of a complete gunite shell. Compare the photos for scale and finish, then bring your own lot to the visit. The range describes work we have built, not a bid.",
  },
  "150k-plus": {
    slug: "pricing-150k-plus",
    label: "$150k+",
    range: "$150k+",
    heading: "Pool Pricing $150k+",
    sectionHeading: "Pools in the $150k+ Range",
    body: "Above $150k you are typically looking at size plus detail: glass tile, a vanishing edge that faces a real view, outdoor living built with the pool, or a difficult estate lot. None of that is automatic at the threshold. A compact pool with expensive materials can land here, and a large simple rectangle might not.",
  },
};

/** Build an alt string from a gallery photo's title + caption. */
function toAlt(p: GalleryPool): string {
  return p.caption ? `${p.title} - ${p.caption}` : p.title;
}

function buildTier(gallery: GalleryTier): PoolPricingTier {
  const meta = TIER_META[gallery.id];
  if (!meta) {
    throw new Error(`Missing pricing tier meta for gallery id "${gallery.id}"`);
  }
  return {
    slug: meta.slug,
    href: `/${meta.slug}`,
    label: meta.label,
    range: meta.range,
    heading: meta.heading,
    sectionHeading: meta.sectionHeading,
    body: meta.body,
    // Hero = the gallery tier's featured / cinematic photo.
    heroImage: gallery.featured.src,
    // Gallery images = the exact same set shown on `/gallery?tier=<id>`:
    // featured photo first, followed by every supporting photo in order.
    // The hero uses a heavy dark overlay so also surfacing the featured
    // photo as a card lets visitors see it clearly.
    images: [gallery.featured, ...gallery.pools].map((p) => ({
      src: p.src,
      alt: toAlt(p),
    })),
  };
}

/** Ordered list - matches the visual left-to-right order of the tier switcher. */
export const POOL_PRICING_TIERS: PoolPricingTier[] = GALLERY_TIERS.map(buildTier);

/** Look up a tier by its slug or href. Returns the first tier if not found. */
export function findTier(hrefOrSlug: string): PoolPricingTier {
  const clean = hrefOrSlug.replace(/^\//, "");
  return (
    POOL_PRICING_TIERS.find((t) => t.slug === clean || t.href === hrefOrSlug) ??
    POOL_PRICING_TIERS[0]
  );
}
