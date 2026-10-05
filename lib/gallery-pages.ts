// Gallery sub-page image data. NOTE: this used to hotlink live images from
// `houstoncoolpools.com/<folder>_files/vlb_images1/<name>` (the OLD pre-Next.js
// site's raw scraped file paths) via next/image `unoptimized`. That domain now
// serves THIS Next.js app, so those legacy file paths all 404 and every image
// on every gallery sub-page rendered blank. Fixed by using real, locally-hosted
// project photos from `public/images/gallery/hd/` (the same curated set used
// on /gallery, /custom-pool-types, /pool-information, etc.) instead.

export type GalleryImage = { src: string; alt: string };

type GalleryEntry = {
  /** Locally-hosted images for this gallery sub-page. */
  extras?: GalleryImage[];
};

const HD = "/images/gallery/hd";

const DATA: Record<string, GalleryEntry> = {
  // ===== Free Form Pools (curved / kidney / lagoon shapes only, all unique) =====
  "gallery-free-form-pools-1": {
    extras: [
      { src: `${HD}/family-4.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with tanning ledge and spillways" },
      { src: `${HD}/lanai-cove-spa.jpg`, alt: "Free form pool by Houston Cool Pools - screened kidney-shaped pool with raised spa" },
      { src: `${HD}/bushland-lagoon.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with rock waterfall" },
    ],
  },
  "gallery-free-form-pools-2": {
    extras: [
      { src: "/images/pricing-65k-90k/15.jpg", alt: "Free form pool by Houston Cool Pools - curved pool with rock waterfall" },
      { src: `${HD}/drew-lagoon.jpg`, alt: "Free form pool by Houston Cool Pools - organic lagoon-shaped pool with fireplace patio" },
      { src: `${HD}/stidham.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with round spa" },
    ],
  },
  "gallery-free-form-pools-3": {
    extras: [
      { src: `${HD}/colby-cove.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with bubblers and rock waterfall" },
      { src: `${HD}/hillside-waterfall.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with rock waterfall and raised spa" },
      { src: `${HD}/clark-cove.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with raised spa and bubblers" },
    ],
  },
  "gallery-free-form-pools-4": {
    extras: [
      { src: `${HD}/tropical-tiki-lagoon.jpg`, alt: "Free form pool by Houston Cool Pools - tropical lagoon pool with curved edges and spa" },
      { src: `${HD}/adams-grotto.jpg`, alt: "Free form pool by Houston Cool Pools - free-form pool with rock waterfall grotto" },
      { src: `${HD}/clark-estate.jpg`, alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with natural rock waterfall" },
    ],
  },
  "gallery-free-form-pools-5": {
    extras: [
      { src: "/images/pricing-65k-90k/02.jpg", alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with tanning ledge" },
      { src: "/images/pricing-65k-90k/04.jpg", alt: "Free form pool by Houston Cool Pools - curved pool with rock waterfall" },
      { src: "/images/pricing-65k-90k/06.jpg", alt: "Free form pool by Houston Cool Pools - kidney-shaped pool with raised spa" },
    ],
  },

  // ===== Geometric Pools (straight-line / rectangular shapes only, all unique) =====
  "geometric-pools-1": {
    extras: [
      { src: `${HD}/anderson-tarr-1.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with sun shelf" },
      { src: `${HD}/aerial-rect-spa.jpg`, alt: "Geometric pool by Houston Cool Pools - aerial view of a rectangular pool with raised spa" },
      { src: `${HD}/modern-geometric.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with straight architectural lines" },
    ],
  },
  "geometric-pools-2": {
    extras: [
      { src: "/images/pricing-65k-90k/17.jpg", alt: "Geometric pool by Houston Cool Pools - L-shaped pool with straight edges" },
      { src: `${HD}/breth-1.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with stone steps and tanning ledge" },
      { src: `${HD}/family-3.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with tanning ledge and waterfall wall" },
    ],
  },
  "geometric-pools-3": {
    extras: [
      { src: `${HD}/silverman-1.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with raised spa" },
      { src: `${HD}/estate-luxe.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with raised spa and spillways" },
      { src: `${HD}/resort-deck-firepit.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with square spa" },
    ],
  },
  "geometric-pools-4": {
    extras: [
      { src: `${HD}/teal-lap-pool.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular lap pool" },
      { src: `${HD}/dark-tanning-ledge.jpg`, alt: "Geometric pool by Houston Cool Pools - dark-finish rectangular pool with tanning ledge" },
      { src: `${HD}/corbeil-1.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with straight coping" },
    ],
  },
  "geometric-pools-5": {
    extras: [
      { src: `${HD}/puranik-1.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with raised spa by the lake" },
      { src: "/images/pricing-65k-90k/18.jpg", alt: "Geometric pool by Houston Cool Pools - rectangular pool with blue tile and straight coping" },
      { src: `${HD}/huckleberry-6.jpg`, alt: "Geometric pool by Houston Cool Pools - rectangular pool with straight edges" },
    ],
  },
  "geometric-pools-6": {
    extras: [
      { src: "/images/pricing-65k-90k/09.jpg", alt: "Geometric pool by Houston Cool Pools - rectangular pool with straight brick coping" },
      { src: "/images/pricing-65k-90k/03.jpg", alt: "Geometric pool by Houston Cool Pools - rectangular pool with straight flagstone coping" },
      { src: "/images/pricing-65k-90k/11.jpg", alt: "Geometric pool by Houston Cool Pools - rectangular pool with tanning ledge and sheer waterfall" },
    ],
  },

  // ===== Fireplace & Fire Pits (fireplaces / fire pits / fire bowls only, all unique) =====
  "fireplace-firepits-gallery-1": {
    extras: [
      { src: "/images/gallery/fireplaces/antisdel-fireplace-night.webp", alt: "Outdoor fireplace by Houston Cool Pools - lit stucco fireplace under a covered patio" },
      { src: "/images/gallery/fireplaces/antisdel-fireplace-day.jpg", alt: "Outdoor fireplace by Houston Cool Pools - fireplace beside an outdoor kitchen" },
      { src: "/images/gallery/fireplaces/huckleberry-fire-trough.jpeg", alt: "Fire pit by Houston Cool Pools - linear fire trough in front of a pool" },
    ],
  },
  "fireplace-firepits-gallery-2": {
    extras: [
      { src: "/images/gallery/fireplaces/merlin-fire-trough.jpeg", alt: "Fire pit by Houston Cool Pools - flames along a raised fire trough by the pool" },
      { src: "/images/gallery/fireplaces/fire-bowls.webp", alt: "Fire bowls by Houston Cool Pools - twin fire bowls on tiled columns" },
      { src: "/images/gallery/fireplaces/drew-pavilion-fireplace.jpg", alt: "Outdoor fireplace by Houston Cool Pools - stacked-stone fireplace in a timber pavilion" },
    ],
  },
  "fireplace-firepits-gallery-3": {
    extras: [
      { src: "/images/gallery/fireplaces/goel-glass-fire-pit.jpg", alt: "Fire pit by Houston Cool Pools - glass-enclosed fire pit on a pool deck" },
      { src: "/images/gallery/fireplaces/huckleberry-fire-side.jpeg", alt: "Fire pit by Houston Cool Pools - raised linear fire feature beside the pool" },
      { src: "/images/gallery/fireplaces/mccanless-linear-fire.webp", alt: "Fire pit by Houston Cool Pools - linear fire feature along the pool wall at dusk" },
    ],
  },

  // ===== Pool Decks =====
  "pool-deck-1": {
    extras: [
      { src: `${HD}/courtyard-pool.jpg`, alt: "Pool deck by Houston Cool Pools - courtyard setting" },
      { src: `${HD}/huckleberry-1.jpg`, alt: "Pool deck by Houston Cool Pools - resort backyard with decking" },
    ],
  },
  "pool-deck-2": {
    extras: [
      { src: `${HD}/family-1.jpg`, alt: "Pool deck by Houston Cool Pools - tanning ledge and deck" },
      { src: `${HD}/feature-pool-1.jpg`, alt: "Pool deck by Houston Cool Pools - sheer-descent water feature" },
    ],
  },
  "pool-deck-3": {
    extras: [
      { src: `${HD}/huckleberry-3.jpg`, alt: "Pool deck by Houston Cool Pools - resort pool retreat" },
      { src: `${HD}/feature-pool-2.jpg`, alt: "Pool deck by Houston Cool Pools - custom outdoor environment" },
    ],
  },
  "pool-deck-4": {
    extras: [
      { src: `${HD}/family-2.jpg`, alt: "Pool deck by Houston Cool Pools - backyard environment with seating" },
      { src: `${HD}/feature-pool-3.jpg`, alt: "Pool deck by Houston Cool Pools - stacked-stone spillway wall" },
    ],
  },

  // ===== Outdoor Structures =====
  "outdoor-structures-gallery-1": {
    extras: [
      { src: "/images/gallery/hd/antisdel-1.jpg", alt: "Outdoor structure by Houston Cool Pools - covered patio with outdoor kitchen" },
      { src: "/images/gallery/hd/antisdel-2.jpg", alt: "Outdoor structure by Houston Cool Pools - covered patio with wood ceiling and lounge seating" },
      { src: "/images/gallery/hd/antisdel-3.jpg", alt: "Outdoor structure by Houston Cool Pools - covered patio with columns overlooking pool" },
      { src: "/images/gallery/hd/poolside-1.jpg", alt: "Outdoor structure by Houston Cool Pools - lakeside wood pavilion with pool" },
    ],
  },
  "outdoor-structures-gallery-2": {
    extras: [
      { src: "/images/gallery/hd/antisdel-4.jpg", alt: "Outdoor structure by Houston Cool Pools - twilight LED color scenes" },
      { src: "/images/gallery/hd/antisdel-5.jpg", alt: "Outdoor structure by Houston Cool Pools - covered patio design" },
      { src: "/images/gallery/hd/antisdel-6.jpg", alt: "Outdoor structure by Houston Cool Pools - full design view" },
      { src: "/images/gallery/hd/antisdel-7.jpg", alt: "Outdoor structure by Houston Cool Pools - covered outdoor living space" },
      { src: "/images/gallery/hd/antisdel-8.jpg", alt: "Outdoor structure by Houston Cool Pools - mood lighting package" },
    ],
  },

  // ===== Commercial Projects =====
  "commercial-projects-gallery-1": {
    extras: [
      { src: "/images/gallery/hd/family-1.jpg", alt: "Commercial courtyard fountain by Houston Cool Pools" },
      { src: "/images/gallery/hd/portrait-1.jpg", alt: "Commercial courtyard fountain by Houston Cool Pools" },
    ],
  },

  // ===== Water Features =====
  "water-features-gallery-1": {
    extras: [
      { src: "/images/gallery/hd/feature-pool-3.jpg", alt: "Water feature by Houston Cool Pools - stacked-stone spillway wall" },
    ],
  },
};

/** Build the local image list for a gallery slug. `altPrefix` is unused now
 * that every entry ships its own descriptive `alt` text, but kept in the
 * signature to avoid touching every call site. */
export function getGalleryImages(slug: string, _altPrefix: string): GalleryImage[] {
  const entry = DATA[slug];
  if (!entry) return [];
  return entry.extras ?? [];
}

/** ImageGallery JSON-LD for a gallery sub-page. */
export function galleryJsonLd(name: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    url: `https://houstoncoolpools.com/${slug}`,
    author: { "@type": "LocalBusiness", name: "Houston Cool Pools" },
  };
}
