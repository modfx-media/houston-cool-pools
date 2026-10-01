import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/business";
import { Hero } from "./components/home/Hero";
import { About } from "./components/home/About";
import { OwnerIntro } from "./components/home/OwnerIntro";
import { Services } from "./components/home/Services";
import { Financing } from "./components/home/Financing";
import { VideoShowcase } from "./components/home/VideoShowcase";
import { BlogPreview } from "./components/home/BlogPreview";
import { BookingForm } from "./components/home/BookingForm";
import { MapLocation } from "./components/home/MapLocation";
import { GoogleReviews } from "./components/GoogleReviews";
import { Testimonials } from "./components/home/Testimonials";

const pageMetadata: Metadata = {
  ...buildPageMetadata("/"),
  title: "Pool Builder in Houston, TX | Custom Gunite Pools",
  description:
    "Houston Cool Pools is a custom gunite pool builder in Houston, TX. Design, construction, and remodeling since 1996. Free in-home quote. Call (281) 938-4830.",
  openGraph: {
    ...buildPageMetadata("/").openGraph,
    title: "Pool Builder in Houston, TX | Custom Gunite Pools",
    description:
      "Custom gunite pool builder in Houston, TX. Design, construction, and remodeling since 1996.",
  },
};


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/", pageMetadata);
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Financing />
      <OwnerIntro />
      <GoogleReviews>
        {({ reviews, meta }) => (
          <Testimonials
            items={reviews.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={meta.rating}
            reviewCount={meta.reviewCount}
            reviewsUrl={meta.reviewsUrl}
          />
        )}
      </GoogleReviews>
      <VideoShowcase />
      <BlogPreview />
      <BookingForm />
      <MapLocation />
    </>
  );
}
