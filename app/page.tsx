import type { Metadata } from "next";
import { PageShell } from "@/app/components/PageShell";
import { Hero } from "@/app/_components/home/Hero";
import { Intro } from "@/app/_components/home/Intro";

export const metadata: Metadata = {
  title: { absolute: "Cornerstone Law Group" },
  description:
    "Cornerstone Law Group is a Dallas family-law firm representing clients through divorce, custody, and adoption with clarity and care.",
};

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <Hero />
        <Intro />
      </main>
    </PageShell>
  );
}
