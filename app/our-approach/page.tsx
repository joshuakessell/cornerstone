import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/app/components/PageShell";
import { heroIntro, testimonials } from "@/app/content/approach";
import { TestimonialCard } from "@/app/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "How Cornerstone Law Group walks alongside clients through divorce, custody, and family-law matters.",
};

export default function OurApproachPage() {
  return (
    <PageShell>
      <ApproachHero />
      <TestimonialsSection />
    </PageShell>
  );
}

function ApproachHeroCopy() {
  return (
    <div>
      <h1
        id="approach-hero-heading"
        className="text-4xl font-semibold tracking-tight text-brand-navy-900 md:text-5xl"
      >
        Our Approach
      </h1>
      <p className="prose-body mt-6 text-brand-navy-700">{heroIntro}</p>
    </div>
  );
}

function ApproachHero() {
  return (
    <section
      aria-labelledby="approach-hero-heading"
      data-testid="approach-hero"
      className="px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <ApproachHeroCopy />
        <Image
          src="/approach/hero-placeholder.jpg"
          alt="Cornerstone Law Group attorneys meeting with a client"
          width={1200}
          height={600}
          priority
          className="h-auto w-full rounded-2xl object-cover shadow-sm"
        />
      </div>
    </section>
  );
}

function TestimonialsList() {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {testimonials.map(t => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      data-testid="testimonials"
      className="bg-brand-navy-50 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="testimonials-heading"
          className="text-3xl font-semibold tracking-tight text-brand-navy-900 md:text-4xl"
        >
          What Clients Say
        </h2>
        <TestimonialsList />
      </div>
    </section>
  );
}
