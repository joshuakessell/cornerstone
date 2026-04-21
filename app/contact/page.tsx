import type { Metadata } from "next";
import { PageShell } from "@/app/components/PageShell";
import { ContactHero } from "@/app/contact/_components/ContactHero";
import { ContactInfo } from "@/app/contact/_components/ContactInfo";
import { ContactTestimonials } from "@/app/contact/_components/ContactTestimonials";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Cornerstone Law Group — Dallas family-law attorneys. Phone, email, or visit our office.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactHero />
      <ContactInfo />
      <ContactTestimonials />
    </PageShell>
  );
}
