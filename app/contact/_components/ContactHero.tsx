import Image from "next/image";

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      data-testid="contact-hero"
      className="px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <ContactHeroCopy />
        <ContactHeroImage />
      </div>
    </section>
  );
}

function ContactHeroCopy() {
  return (
    <div>
      <h1
        id="contact-hero-heading"
        className="text-4xl font-semibold tracking-tight text-brand-navy-900 md:text-5xl"
      >
        Contact
      </h1>
      <p className="prose-body mt-6 text-brand-navy-700">
        We welcome new clients by phone, email, or in person at our Dallas office.
        Reach out and we will respond promptly.
      </p>
    </div>
  );
}

function ContactHeroImage() {
  return (
    <Image
      src="/contact/welcome.jpg"
      alt="Cornerstone Law Group reception area welcoming a new client"
      width={1200}
      height={800}
      priority
      className="h-auto w-full rounded-2xl object-cover shadow-sm"
    />
  );
}
