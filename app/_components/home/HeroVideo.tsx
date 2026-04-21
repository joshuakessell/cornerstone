import { home } from "@/app/content/home";

export function HeroVideo() {
  return (
    <video
      data-testid="hero-video"
      aria-hidden="true"
      tabIndex={-1}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={home.posterSrc}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
    >
      <source src={home.videoSrc} type="video/mp4" />
    </video>
  );
}
