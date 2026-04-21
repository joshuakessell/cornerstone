import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactHero } from "@/app/contact/_components/ContactHero";

describe("ContactHero", () => {
  it("renders an h1 with text 'Contact'", () => {
    render(<ContactHero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.trim()).toBe("Contact");
  });

  it("renders a welcoming image with width, height, and alt", () => {
    const { container } = render(<ContactHero />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("width")).not.toBeNull();
    expect(img!.getAttribute("height")).not.toBeNull();
    expect(img!.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("exposes the section via data-testid='contact-hero'", () => {
    const { container } = render(<ContactHero />);
    expect(container.querySelector("[data-testid='contact-hero']")).not.toBeNull();
  });
});
