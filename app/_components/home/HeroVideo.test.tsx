import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HeroVideo } from "@/app/_components/home/HeroVideo";

function renderVideo() {
  return render(<HeroVideo />);
}

describe("HeroVideo (supports HP-3, HP-4, HP-11)", () => {
  it("HP-3 renders a single <video> element", () => {
    const { container } = renderVideo();
    expect(container.querySelectorAll("video")).toHaveLength(1);
  });

  it("HP-3 video has loop, muted, autoPlay, playsInline all truthy", () => {
    const { container } = renderVideo();
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.loop).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(video.playsInline).toBe(true);
  });

  it("HP-4a video has a non-empty poster attribute", () => {
    const { container } = renderVideo();
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.getAttribute("poster")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("HP-4b video contains at least one <source> with a non-empty src", () => {
    const { container } = renderVideo();
    const source = container.querySelector("video source") as HTMLSourceElement | null;
    expect(source).not.toBeNull();
    expect(source!.getAttribute("src")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("HP-11 video is decorative: aria-hidden='true' and tabIndex === -1", () => {
    const { container } = renderVideo();
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.getAttribute("aria-hidden")).toBe("true");
    expect(video.tabIndex).toBe(-1);
  });

  it("HP-4c video uses preload='metadata' to avoid CLS / excess bandwidth", () => {
    const { container } = renderVideo();
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.getAttribute("preload")).toBe("metadata");
  });

  it("exposes data-testid='hero-video' for page-level scoping", () => {
    const { container } = renderVideo();
    expect(container.querySelector("[data-testid='hero-video']")).not.toBeNull();
  });
});
