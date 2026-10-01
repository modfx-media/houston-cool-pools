export type NavLink = { label: string; href: string };

export type NavGroup = {
  label: string;
  href: string;
  /** When set, renders as a mega dropdown. Items are scraped from the live pool-information.html page. */
  columns?: { heading?: string; links: NavLink[] }[];
  /** Optional prominent CTA rendered at the bottom of the dropdown menu (desktop & mobile). */
  cta?: NavLink;
};

const BOOK_APPOINTMENT: NavLink = {
  label: "Book a Call",
  href: "/contact",
};

export const PRIMARY_NAV: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    columns: [
      {
        heading: "Get To Know Us",
        links: [
          { label: "Meet The Team", href: "/about/team" },
          { label: "Why Choose HCP", href: "/whychoosehcp" },
          { label: "Reviews & Testimonials", href: "/customer-reviews-testimonials" },
          { label: "Blog", href: "/blogs" },
        ],
      },
    ],
    cta: BOOK_APPOINTMENT,
  },
  { label: "Pool Gallery", href: "/gallery",
    columns: [
      {
        heading: "Browse by Price",
        links: [
          { label: "All Pools", href: "/gallery?tier=all" },
          { label: "$65K – $90K", href: "/gallery?tier=65k-90k" },
          { label: "$90K – $115K", href: "/gallery?tier=90k-115k" },
          { label: "$115K – $150K", href: "/gallery?tier=115k-150k" },
          { label: "$150K+", href: "/gallery?tier=150k-plus" },
        ],
      },
      {
        heading: "Explore",
        links: [
          { label: "Pricing", href: "/pricing-65k-90k" },
          { label: "Pool Types & Styles", href: "/custom-pool-types" },
          { label: "Custom Pool Features", href: "/custom-pool-features-1" },
          { label: "Outdoor Structures", href: "/outdoor-structures-gallery-1" },
          { label: "Pool Remodel", href: "/pool-remodel" },
          { label: "Client Showroom", href: "/client-showroom" },
        ],
      },
    ],
    cta: BOOK_APPOINTMENT,
  },
  {
    label: "Pool Information",
    href: "/pool-information",
    columns: [
      {
        heading: "Plan Your Pool",
        links: [
          { label: "Pool Pricing & Packages", href: "/pricing-65k-90k" },
          { label: "Financing Options", href: "/poolfinancing" },
          { label: "Choose The Right Builder", href: "/how-to-choose-a-pool-builder" },
          { label: "Pool Specifications", href: "/pool-specifications" },
          { label: "Custom Home Builder", href: "/custom-home-toc" },
        ],
      },
      {
        heading: "Learn",
        links: [
          { label: "FAQs", href: "/faqs1" },
        ],
      },
      {
        heading: "Pool Owners",
        links: [
          { label: "Pool Maintenance", href: "/pool-service" },
          { label: "Severe Weather Guide", href: "/severe-weather" },
        ],
      },
    ],
    cta: BOOK_APPOINTMENT,
  },
];

export const PHONE_DISPLAY = "(281) 645-6631";
export const PHONE_HREF = "tel:+12816456631";
export const EMAIL_DISPLAY = "info@houstoncoolpools.com";
export const EMAIL_HREF = "mailto:info@houstoncoolpools.com";
export const SMS_HREF = "sms:+12816456631";
export const QUOTE_HREF = "/contact";
