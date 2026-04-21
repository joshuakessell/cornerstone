import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/_components/home/Hero";

describe("Hero (supports HP-1, HP-2, HP-3)", () => {
  it("HP-1a renders exactly one h1", () => {
    render(<Hero />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("HP-1b h1 text contains the word 'Family'", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent ?? "").toMatch(/Family/);
  });

  it("HP-2 'Family' is wrapped in a span with class 'home-hero-family'", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const emphasis = h1.querySelector("span.home-hero-family");
    expect(emphasis).not.toBeNull();
    expect(emphasis!.textContent?.trim()).toBe("Family");
  });

  it("HP-3a renders exactly one <video> element (the decorative hero video)", () => {
    const { container } = render(<Hero />);
    expect(container.querySelectorAll("video")).toHaveLength(1);
  });

  it("HP-3b renders a subhead marked with data-testid='hero-subhead' that follows the h1", () => {
    const { container } = render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const subhead = container.querySelector("[data-testid='hero-subhead']");
    expect(subhead).not.toBeNull();
    expect(subhead!.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    const followsH1 =
      h1.compareDocumentPosition(subhead!) & Node.DOCUMENT_POSITION_FOLLOWING;
    expect(followsH1).toBeTruthy();
  });
});
