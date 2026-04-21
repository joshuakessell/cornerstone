import type { Metadata } from "next";
import { PageShell } from "@/app/components/PageShell";
import { ServicesGrid } from "@/app/our-services/_components/ServicesGrid";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Family-law services offered by Cornerstone Law Group in Dallas: divorce, child custody, adoption, and mediation.",
};

export default function OurServicesPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-navy-900">
            Our Services
          </h1>
          <p className="prose-body mt-4 text-brand-navy-700">
            Cornerstone Law Group represents Dallas families across a range of matters, with a focus on clear guidance and practical outcomes.
          </p>
        </header>
        <ServicesGrid />
      </main>
    </PageShell>
  );
}
