import { home } from "@/app/content/home";
import { HeroVideo } from "./HeroVideo";

function renderHeadline(headline: string, familyWord: string) {
  const parts = headline.split(familyWord);
  return parts.flatMap((part, i) =>
    i === 0
      ? [<span key={`p${i}`}>{part}</span>]
      : [
          <span
            key={`f${i}`}
            data-testid="hero-family"
            className="home-hero-family font-bold underline decoration-brand-gold-500 decoration-4 underline-offset-4"
          >
            {familyWord}
          </span>,
          <span key={`p${i}`}>{part}</span>,
        ]
  );
}

function HeroCopy() {
  return (
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24 md:px-10 md:py-36">
      <h1
        id="home-hero-heading"
        className="text-4xl font-semibold tracking-tight md:text-6xl"
      >
        {renderHeadline(home.headline, home.familyWord)}
      </h1>
      <p
        data-testid="hero-subhead"
        className="max-w-2xl text-lg text-brand-gold-100 md:text-xl"
      >
        {home.subhead}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      data-testid="home-hero"
      className="relative isolate overflow-hidden bg-brand-navy-900 text-white"
    >
      <HeroVideo />
      <HeroCopy />
    </section>
  );
}
