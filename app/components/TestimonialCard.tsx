import type { Testimonial } from "@/app/content/approach";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-brand-navy-100 bg-white p-6 shadow-sm md:p-8">
      <blockquote className="prose-body text-brand-navy-900">
        <p>{testimonial.quote}</p>
      </blockquote>
      <cite className="mt-4 block not-italic font-semibold text-brand-navy-700">
        {testimonial.firstName}
      </cite>
    </article>
  );
}
