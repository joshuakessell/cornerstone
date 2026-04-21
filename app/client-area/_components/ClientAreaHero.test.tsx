import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClientAreaHero } from "@/app/client-area/_components/ClientAreaHero";

describe("ClientAreaHero", () => {
  it("renders an h1 with text 'Client Area'", () => {
    render(<ClientAreaHero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.trim()).toBe("Client Area");
  });

  it("renders at least 1 blockquote (testimonial)", () => {
    const { container } = render(<ClientAreaHero />);
    expect(container.querySelectorAll("blockquote").length).toBeGreaterThanOrEqual(1);
  });

  it("renders a welcoming image with width, height, and alt", () => {
    const { container } = render(<ClientAreaHero />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("width")).not.toBeNull();
    expect(img!.getAttribute("height")).not.toBeNull();
    expect(img!.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("exposes the section via data-testid='client-area-hero'", () => {
    const { container } = render(<ClientAreaHero />);
    expect(container.querySelector("[data-testid='client-area-hero']")).not.toBeNull();
  });
});
