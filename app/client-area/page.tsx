import type { Metadata } from "next";
import { PageShell } from "@/app/components/PageShell";
import { ClientAreaHero } from "@/app/client-area/_components/ClientAreaHero";
import { ClientAreaIntakeFlow } from "@/app/client-area/_components/ClientAreaIntakeFlow";

export const metadata: Metadata = {
  title: "Client Area",
  description:
    "Cornerstone Law Group client area — share a few details and continue to our Clio intake form.",
};

export default function ClientAreaPage() {
  return (
    <PageShell>
      <ClientAreaHero />
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <ClientAreaIntakeFlow />
        </div>
      </section>
    </PageShell>
  );
}
