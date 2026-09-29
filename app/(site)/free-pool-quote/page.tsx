import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { Hero } from "./_components/Hero";
import { ServicesMarquee } from "./_components/ServicesMarquee";
import { Offer } from "./_components/Offer";
import { Financing } from "./_components/Financing";
import { Gallery } from "./_components/Gallery";
import { PoolTypes } from "./_components/PoolTypes";
import { BeforeAfter } from "./_components/BeforeAfter";
import { WhyChoose } from "./_components/WhyChoose";
import { ProcessSteps } from "./_components/ProcessSteps";
import { Testimonials } from "./_components/Testimonials";
import { MeetOwner } from "./_components/MeetOwner";
import { AreasWeServe } from "./_components/AreasWeServe";
import { Faq } from "./_components/Faq";
import { QuoteForm } from "./_components/QuoteForm";
import { LpFooter } from "./_components/LpFooter";


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/free-pool-quote", {});
}

export default function FreePoolQuotePage() {
  return (
    <>
      <main>
        <Hero />
        <ServicesMarquee />
        <Offer />
        <Financing />
        <Gallery />
        <Testimonials />
        <PoolTypes />
        <MeetOwner />
        <BeforeAfter />
        <WhyChoose />
        <Faq />
        <QuoteForm />
        <ProcessSteps />
        <AreasWeServe />
      </main>
      <LpFooter />
    </>
  );
}
