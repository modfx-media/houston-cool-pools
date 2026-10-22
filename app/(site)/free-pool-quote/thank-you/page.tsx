import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { TypHero } from "../_components/TypHero";
import { TypVideo } from "../_components/TypVideo";
import { TypTimeline } from "../_components/TypTimeline";
import { TypGallery } from "../_components/TypExtras";
import { Financing } from "../_components/Financing";
import { Testimonials } from "../_components/Testimonials";
import { LpFooter } from "../_components/LpFooter";

const pageMetadata: Metadata = {
  title: "Thank You. We'll Be In Touch | Houston Cool Pools",
  description:
    "Thanks for requesting your free pool quote. A Houston Cool Pools team member will reach out within one business day to schedule your free in-home quote.",
  alternates: { canonical: "/free-pool-quote/thank-you" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Thank You | Houston Cool Pools",
    description:
      "Your free pool quote request has been received. We'll be in touch within one business day.",
    url: "https://houstoncoolpools.com/free-pool-quote/thank-you",
    siteName: "Houston Cool Pools",
    type: "website",
    images: [
      {
        url: "/images/gallery/hd/silverman-1.jpg",
        width: 1200,
        height: 630,
        alt: "Houston Cool Pools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You | Houston Cool Pools",
    description: "Your free pool quote request has been received.",
    images: ["/images/gallery/hd/silverman-1.jpg"],
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/free-pool-quote/thank-you", pageMetadata);
}

export default function ThankYouPage() {
  return (
    <>
      <main>
        <TypHero />
        <TypVideo />
        <TypTimeline />
        <Financing />
        <TypGallery />
        <Testimonials />
      </main>
      <LpFooter />
    </>
  );
}
