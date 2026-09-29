export const LP_COLORS = {
  bg: "#0a1628",
  bgAlt: "#0f2035",
  card: "#112240",
  accent: "#00b4d8",
  white: "#ffffff",
  muted: "#94a3b8",
} as const;

export const LP_CONTACT = {
  phoneDisplay: "(281) 938-4830",
  phoneHref: "tel:+12819384830",
  smsHref: "sms:+12819384830",
  address: "21902 Highway 249, Houston, TX 77070",
  hours: "Mon-Fri 9AM-4:30PM · Sat-Sun Closed",
  facebook: "https://www.facebook.com/HoustonCoolPools/",
  privacyHref: "/privacynotice",
} as const;

export const LP_OFFER_CHECKLIST = [
  "Free in-home quote",
  "Custom pool design concepts",
  "Transparent pricing, no surprises",
  "100% on-budget guarantee",
  "Flexible financing options",
  "No obligation, no pressure",
] as const;

export const LP_TRUST_BADGES = [
  "★ BBB A+ Rated",
  "Best of Houzz",
  "Angie's List Super Service Award",
  "SBA Emerging Leaders Award",
  "BBB Gold Star Award",
  "GHBA & NAHB Member",
] as const;

export const LP_HERO_STATS = [
  { value: "1996", label: "Established", suffix: "" },
  { value: "1,600+", label: "Pools Built", suffix: "" },
  { value: "100%", label: "On-Budget", suffix: "" },
  { value: "A+", label: "BBB Rating", suffix: "" },
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Geometric" | "Free Form" | "Pool & Spa" | "Resort Style" | "Estate";
  badge: string;
};

export const LP_GALLERY: GalleryItem[] = [
  {
    src: "/images/gallery/hd/silverman-1.jpg",
    alt: "Silverman modern luxe glass-tile pool at dusk",
    category: "Estate",
    badge: "Silverman Estate",
  },
  {
    src: "/images/gallery/hd/huckleberry-4.jpg",
    alt: "Huckleberry backyard with fire pit at sunset",
    category: "Estate",
    badge: "Huckleberry Sunset",
  },
  {
    src: "/images/gallery/hd/modern-geometric.jpg",
    alt: "Modern geometric backyard pool with clean tile",
    category: "Geometric",
    badge: "Modern Geometric",
  },
  {
    src: "/images/gallery/hd/merlin-1.jpg",
    alt: "Merlin resort-style pool with custom rockwork",
    category: "Free Form",
    badge: "Merlin Freeform",
  },
  {
    src: "/images/gallery/hd/family-2.jpg",
    alt: "Stacked-stone waterfall wall with elevated spa",
    category: "Pool & Spa",
    badge: "Waterfall & Spa",
  },
  {
    src: "/images/gallery/hd/antisdel-1.jpg",
    alt: "Covered patio with outdoor kitchen and pool",
    category: "Resort Style",
    badge: "Full Outdoor Living",
  },
  {
    src: "/images/gallery/hd/clark-estate.jpg",
    alt: "Clark Estate negative-edge pool with view",
    category: "Estate",
    badge: "Clark Estate",
  },
  {
    src: "/images/gallery/hd/le-pool-1.jpg",
    alt: "Le Residence multi-level pool and spa",
    category: "Estate",
    badge: "Le Residence",
  },
  {
    src: "/images/gallery/hd/huckleberry-3.jpg",
    alt: "Custom raised spa with fire feature",
    category: "Pool & Spa",
    badge: "Fire Spa",
  },
  {
    src: "/images/gallery/hd/nc-resort.jpg",
    alt: "Resort-style custom shape pool with decking",
    category: "Resort Style",
    badge: "Resort Retreat",
  },
  {
    src: "/images/gallery/hd/newcastle-2.jpg",
    alt: "Newcastle modern remodel pool detail",
    category: "Geometric",
    badge: "Newcastle Remodel",
  },
  {
    src: "/images/gallery/hd/puranik-1.jpg",
    alt: "Puranik reflecting pool with custom tile",
    category: "Estate",
    badge: "Puranik Estate",
  },
  {
    src: "/images/gallery/hd/breth-1.jpg",
    alt: "Breth family-friendly pool layout",
    category: "Pool & Spa",
    badge: "Family Pool & Spa",
  },
  {
    src: "/images/gallery/hd/sunset-pool.jpg",
    alt: "Sunset retreat with fire features and lighting",
    category: "Free Form",
    badge: "Sunset Retreat",
  },
  {
    src: "/images/gallery/hd/corbeil-1.jpg",
    alt: "Corbeil premier custom estate pool",
    category: "Estate",
    badge: "Corbeil Estate",
  },
  {
    src: "/images/gallery/hd/family-4.jpg",
    alt: "Modern geometric pool with tanning ledge and bubblers",
    category: "Resort Style",
    badge: "Tanning Ledge",
  },
];

export const LP_POOL_TYPES = [
  {
    title: "Modern Geometric",
    image: "/images/gallery/hd/modern-geometric.jpg",
    copy:
      "Straight-edge, contemporary pools built to match modern Houston homes - glass-tile waterlines, minimalist sun shelves, and honed travertine coping.",
    bullets: [
      "Rectangular & geometric shapes",
      "Glass-tile waterlines",
      "Tanning ledges",
      "Travertine or porcelain decking",
    ],
  },
  {
    title: "Free Form & Naturalistic",
    image: "/images/gallery/hd/merlin-1.jpg",
    copy:
      "Curved, resort-inspired pools with custom rockwork, waterfalls, and lush integration - built to feel like the backyard has always been there.",
    bullets: [
      "Custom curved shapes",
      "Natural rock features",
      "Waterfalls & grottos",
      "Pebble & quartz finishes",
    ],
  },
  {
    title: "Pool & Spa Combos",
    image: "/images/gallery/hd/family-2.jpg",
    copy:
      "Raised spas as the architectural focal point, overflowing into the pool with sheer-descent spillways and matched tile detailing.",
    bullets: [
      "Raised spa with spillover",
      "Custom tile detailing",
      "Sheer-descent water features",
      "Color-matched coping",
    ],
  },
  {
    title: "Resort Style & Tanning Ledges",
    image: "/images/gallery/hd/nc-resort.jpg",
    copy:
      "Resort-inspired pools with shallow tanning ledges, beach entries, and umbrella sleeves - purpose-built for Houston summers.",
    bullets: [
      "Tanning ledges with umbrella sleeves",
      "Walk-in beach entries",
      "Bubblers & deck jets",
      "Built-in bench seating",
    ],
  },
  {
    title: "Complete Outdoor Environments",
    image: "/images/gallery/hd/antisdel-1.jpg",
    copy:
      "Full backyard transformations: pool, outdoor kitchen, fireplace, fire bowls, and custom hardscape designed as one cohesive space.",
    bullets: [
      "Outdoor kitchen integration",
      "Fire bowls & fireplaces",
      "Custom pergolas",
      "Cohesive hardscape design",
    ],
  },
  {
    title: "Estate & Vanishing Edge",
    image: "/images/gallery/hd/clark-estate.jpg",
    copy:
      "Signature estate-scale builds: vanishing edges, multi-level pools, and premium tile and stone for the most discerning Houston homeowners.",
    bullets: [
      "Vanishing & negative-edge designs",
      "Multi-level pool & spa",
      "Premium glass-mosaic tile",
      "Smart automation",
    ],
  },
] as const;

export const LP_TESTIMONIALS = [
  {
    quote:
      "HIGHLY RECOMMEND! We had a fantastic experience with Houston Cool Pools. Very transparent company - the quote we signed was the quote we paid.",
    name: "Craig B.",
    location: "Cypress, TX",
  },
  {
    quote:
      "Mike and his team were incredible from start to finish. Our pool came in exactly on budget and on time. Every question got a real answer.",
    name: "Henry N.",
    location: "Tomball, TX",
  },
  {
    quote:
      "We've had our pool for 3 years now and it's absolutely perfect. The whole process was smooth and stress-free. Would use them again in a heartbeat.",
    name: "Pamela C.",
    location: "Spring, TX",
  },
  {
    quote:
      "Best decision we ever made. Houston Cool Pools built us a stunning pool and outdoor living space that our whole family enjoys year-round.",
    name: "Sarah M.",
    location: "Katy, TX",
  },
  {
    quote:
      "Professional, responsive, and delivered exactly what they promised. A+ all the way - crew showed up when they said they would, every single time.",
    name: "James T.",
    location: "The Woodlands, TX",
  },
  {
    quote:
      "Our neighbors have stopped by just to compliment the pool. Mike walked us through every finish, every option. Couldn't be happier.",
    name: "Linda R.",
    location: "Kingwood, TX",
  },
] as const;

export const LP_TIMELINE = [
  {
    title: "We review your request",
    body: "Within 1 business day, our team reviews the details you submitted.",
  },
  {
    title: "We call you to schedule",
    body: "A Houston Cool Pools team member will call to set up your free in-home quote.",
  },
  {
    title: "Mike's team comes to you",
    body: "We visit your backyard, listen to your vision, and bring design ideas.",
  },
  {
    title: "You get a full quote",
    body: "Transparent pricing. No surprises. Our 100% on-budget guarantee starts here.",
  },
] as const;

export const LP_TYP_GALLERY = [
  "/images/gallery/hd/clark-estate.jpg",
  "/images/gallery/hd/silverman-1.jpg",
  "/images/gallery/hd/huckleberry-4.jpg",
  "/images/gallery/hd/merlin-1.jpg",
  "/images/gallery/hd/huckleberry-1.jpg",
  "/images/gallery/hd/silverman-2.jpg",
  "/images/gallery/hd/le-pool-1.jpg",
  "/images/gallery/hd/puranik-1.jpg",
  "/images/gallery/hd/family-2.jpg",
  "/images/gallery/hd/corbeil-1.jpg",
  "/images/gallery/hd/newcastle-1.jpg",
  "/images/gallery/hd/huckleberry-7.jpg",
  "/images/gallery/hd/estate-luxe.jpg",
  "/images/gallery/hd/heritage-estate.jpg",
  "/images/gallery/hd/modern-geometric.jpg",
  "/images/gallery/hd/antisdel-4.jpg",
] as const;

export const LP_FAQS = [
  {
    q: "How much does a custom pool cost in Houston?",
    a: "Most of our custom gunite builds land between $65K and $150K+ depending on size, finishes, spa, and outdoor features. Your free in-home quote comes with a transparent, line-itemed price and our 100% on-budget guarantee in writing.",
  },
  {
    q: "How long does it take to build a pool?",
    a: "From contract to swim, most projects take 10 to 14 weeks. Permitting, weather, and add-ons like outdoor kitchens or fire features can shift the timeline. We give you a realistic schedule up front and update you at every phase.",
  },
  {
    q: "What's included in the free in-home quote?",
    a: "A Houston Cool Pools designer comes to your backyard, listens to how you'll actually use the space, and walks you through pool styles, finishes, and add-ons. You leave with a custom design concept, transparent pricing, and zero pressure to decide on the spot.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. We work with several pool-financing partners offering competitive rates and flexible terms - including no-equity soft-credit-check options. We can connect you with a lender during your quote so you have real monthly numbers alongside your design.",
  },
  {
    q: "What is the 100% on-budget guarantee?",
    a: "Once your quote is signed, your price is locked. No surprise change orders, no inflated allowances. The number on your contract is the number you pay - in writing.",
  },
  {
    q: "What areas of Houston do you serve?",
    a: "All of Greater Houston, including Spring, Cypress, Tomball, The Woodlands, Katy, Sugar Land, Pearland, Kingwood, The Heights, and Memorial. Our showroom is in Northwest Houston on Highway 249.",
  },
  {
    q: "Can you build during fall and winter?",
    a: "Absolutely. Houston's mild winters are one of the best times to build - you'll be swimming the moment summer hits. We build year-round with the same craftsmanship and timeline.",
  },
] as const;
