import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { PoolInfoHero } from "../components/pool-information/PoolInfoHero";
import { PoolInfoGrid, type Resource } from "../components/pool-information/PoolInfoGrid";
import { PoolInfoCta } from "../components/pool-information/PoolInfoCta";

const TITLE = "Premier Pool Building Services in Houston, TX";
const DESCRIPTION =
  "Immerse in the world of swimming pools with Houston Cool Pools. Understand the basics of pool construction, maintenance, & customization in Houston, TX.";
const CANONICAL = "https://houstoncoolpools.com/pool-information";

const pageMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Pool Builder, Pool Builder Tomball, Pool Company, Pool Company Tomball, Pool Construction, Pool Construction Tomball, Pool Contractor, Pool Contractor Tomball, Pool Designer, Pool Designer Tomball, Pool Installer, Pool Installer Tomball",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Houston Cool Pools",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://houstoncoolpools.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pool Information",
      item: "https://houstoncoolpools.com/pool-information",
    },
  ],
};

const RESOURCES: Resource[] = [
  {
    title: "Client Showroom",
    href: "/client-showroom",
    description: "Browse hundreds of real finished pool photos from our clients.",
    icon: "reviews",
  },
  {
    title: "Choose The Right Builder",
    href: "/how-to-choose-a-pool-builder",
    description: "Learn what separates great pool builders from the rest.",
    icon: "builder",
  },
  {
    title: "Pool Specifications",
    href: "/pool-specifications",
    description: "Detailed specs on steel, gunite, electrical and equipment.",
    icon: "specs",
  },
  {
    title: "Pool Remodel",
    href: "/pool-remodel",
    description: "Transform your existing pool with a renovation.",
    icon: "remodel",
  },
  {
    title: "FAQs",
    href: "/faqs1",
    description: "Answers to the most common pool construction questions.",
    icon: "faq",
  },
  {
    title: "Equipment Manuals",
    href: "/pool-equipment-manuals",
    description: "Download manuals for all Pentair and pool equipment.",
    icon: "manual",
  },
  {
    title: "Pool School",
    href: "/pool-school-1",
    description: "Learn how to operate and maintain your new pool.",
    icon: "school",
  },
  {
    title: "Pool Pricing",
    href: "/pricing-65k-90k",
    description: "Transparent pricing packages from $65K and up.",
    icon: "pricing",
  },
  {
    title: "Pool Construction Sequence",
    href: "/construction-sequence-1",
    description: "Step-by-step walkthrough of how we build your pool.",
    icon: "sequence",
  },
  {
    title: "Pool Features",
    href: "/custom-pool-features-1",
    description: "Sheer descents, spas, bubblers, slides and more.",
    icon: "features",
  },
  {
    title: "Pool Terms",
    href: "/pooldefinitions",
    description: "Plain-English definitions of common pool terminology.",
    icon: "terms",
  },
  {
    title: "Financing Available",
    href: "/poolfinancing",
    description: "Flexible financing options for every budget.",
    icon: "financing",
  },
  {
    title: "Pool Glossary",
    href: "/glossary1",
    description: "A–Z glossary of pool construction and chemistry terms.",
    icon: "glossary",
  },
  {
    title: "Custom Home Builder",
    href: "/custom-home-toc",
    description: "Building a custom home? We're your pool partner.",
    icon: "home",
  },
  {
    title: "Testimonials & Reviews",
    href: "/customer-reviews-testimonials",
    description: "Read reviews from real Houston homeowners.",
    icon: "reviews",
  },
  {
    title: "Product Brochures",
    href: "/product-brochures",
    description: "Download product brochures for all pool equipment.",
    icon: "brochure",
  },
  {
    title: "Your Pool and Severe Weather",
    href: "/severe-weather",
    description: "How to protect your pool during storms and freezes.",
    icon: "weather",
  },
  {
    title: "Pool Articles",
    href: "/blogs",
    description: "Tips, guides and insights from our pool experts.",
    icon: "articles",
  },
];


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/pool-information", pageMetadata);
}

export default function PoolInformationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PoolInfoHero />
      <PoolInfoGrid resources={RESOURCES} />
      <PoolInfoCta />
    </>
  );
}
