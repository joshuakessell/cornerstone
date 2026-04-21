import Image from "next/image";
import { testimonials } from "@/app/content/approach";
import { TestimonialCard } from "@/app/components/TestimonialCard";

export function ClientAreaHero() {
  return (
    <section
      aria-labelledby="client-area-hero-heading"
      data-testid="client-area-hero"
      className="px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start">
        <ClientAreaHeroCopy />
        <ClientAreaHeroImage />
      </div>
    </section>
  );
}

function ClientAreaHeroCopy() {
  return (
    <div>
      <h1
        id="client-area-hero-heading"
        className="text-4xl font-semibold tracking-tight text-brand-navy-900 md:text-5xl"
      >
        Client Area
      </h1>
      <p className="prose-body mt-6 text-brand-navy-700">
        Welcome. Share a few details so we can tailor the intake to your needs.
      </p>
      <div className="mt-8">
        <TestimonialCard testimonial={testimonials[0]} />
      </div>
    </div>
  );
}

function ClientAreaHeroImage() {
  return (
    <Image
      src="/client-area/welcome.jpg"
      alt="Cornerstone Law Group attorney welcoming a new client"
      width={1200}
      height={800}
      priority
      className="h-auto w-full rounded-2xl object-cover shadow-sm"
    />
  );
}
