import { testimonials } from "@/app/content/approach";
import { TestimonialCard } from "@/app/components/TestimonialCard";

export function ContactTestimonials() {
  const picks = testimonials.slice(0, 2);
  return (
    <section
      aria-labelledby="contact-testimonials-heading"
      data-testid="contact-testimonials"
      className="px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="contact-testimonials-heading"
          className="text-3xl font-semibold tracking-tight text-brand-navy-900"
        >
          What Clients Say
        </h2>
        <div className="mt-10 flex flex-col gap-6">
          {picks.map(t => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
