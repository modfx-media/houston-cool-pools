import { cmsMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildPageMetadata } from "../../../lib/business";
import { ContactHero } from "../components/contact/ContactHero";
import { ContactFormSection } from "../components/contact/ContactFormSection";
import { WhyChooseHighlights } from "../components/contact/WhyChooseHighlights";

const pageMetadata: Metadata = buildPageMetadata("/contact");


export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/contact", pageMetadata);
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <WhyChooseHighlights />
    </>
  );
}
