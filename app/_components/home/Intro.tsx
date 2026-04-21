import { home } from "@/app/content/home";

export function Intro() {
  return (
    <section
      data-testid="home-intro"
      className="px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <p className="prose-body text-brand-navy-700">{home.intro}</p>
      </div>
    </section>
  );
}
