import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import OurApproachPage, { metadata } from "@/app/our-approach/page";
import { testimonials } from "@/app/content/approach";

const AUTHORS = ["Jennifer", "Joshua", "Elizabeth", "Cameron", "Catherine"] as const;

function renderPage() {
  return render(<OurApproachPage />);
}

function getTestimonialsSection(container: HTMLElement) {
  const section = container.querySelector("[data-testid='testimonials']");
  if (!section) throw new Error("testimonials section missing");
  return section as HTMLElement;
}

describe("OA-1 route renders inside PageShell with Our Approach h1", () => {
  it("wraps in PageShell", () => {
    const { container } = renderPage();
    expect(container.querySelector("[data-testid='page-shell']")).not.toBeNull();
  });

  it("has exactly one h1 with the text 'Our Approach'", () => {
    renderPage();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toMatch(/our approach/i);
  });
});

describe("OA-2 hero image present", () => {
  it("renders a single <img> in the hero with non-empty src and alt", () => {
    const { container } = renderPage();
    const hero = container.querySelector("[data-testid='approach-hero']");
    expect(hero).not.toBeNull();
    const imgs = hero!.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toBeTruthy();
    expect(imgs[0].getAttribute("alt")).toBeTruthy();
  });
});

describe("OA-3 hero image src is the placeholder path", () => {
  it("hero img src resolves to the /approach/hero-placeholder asset", () => {
    const { container } = renderPage();
    const hero = container.querySelector("[data-testid='approach-hero']");
    const raw = hero!.querySelector("img")?.getAttribute("src") ?? "";
    const decoded = decodeURIComponent(raw);
    expect(decoded).toMatch(/\/approach\/hero-placeholder/);
  });
});

describe("OA-4 testimonials section has exactly 5 blockquotes", () => {
  it("renders five blockquote elements", () => {
    const { container } = renderPage();
    const section = getTestimonialsSection(container);
    const quotes = within(section).getAllByRole("blockquote");
    expect(quotes).toHaveLength(5);
  });
});

describe("OA-5 every testimonial quote is at least 200 characters", () => {
  it("each blockquote textContent >= 200 chars", () => {
    const { container } = renderPage();
    const section = getTestimonialsSection(container);
    const quotes = within(section).getAllByRole("blockquote");
    for (const q of quotes) {
      expect((q.textContent ?? "").trim().length).toBeGreaterThanOrEqual(200);
    }
  });
});

describe("OA-6 cite authors are the five required first names", () => {
  it("<cite> text set equals the required authors", () => {
    const { container } = renderPage();
    const section = getTestimonialsSection(container);
    const cites = section.querySelectorAll("cite");
    const names = Array.from(cites, c => c.textContent?.trim() ?? "");
    expect(new Set(names)).toEqual(new Set(AUTHORS));
    expect(names).toHaveLength(AUTHORS.length);
  });

  it("content/approach.ts exports those five authors", () => {
    const names = testimonials.map(t => t.firstName);
    expect(new Set(names)).toEqual(new Set(AUTHORS));
  });
});

describe("OA-7 forbidden firm string does not appear in testimonials section", () => {
  it("exact case-sensitive substring absent", () => {
    const { container } = renderPage();
    const section = getTestimonialsSection(container);
    expect(section.textContent).not.toContain("Cornerstone Law Group, P.C.");
  });

  it("case-insensitive firm name also absent", () => {
    const { container } = renderPage();
    const section = getTestimonialsSection(container);
    expect(section.textContent ?? "").not.toMatch(/cornerstone law group/i);
  });
});

describe("OA-7 extra testimonials carry no inline styles", () => {
  it("no element inside the testimonials section uses the style attribute", () => {
    const { container } = renderPage();
    const section = getTestimonialsSection(container);
    expect(section.querySelector("[style]")).toBeNull();
  });
});

describe("OA-8 page metadata title resolves to 'Our Approach'", () => {
  it("metadata.title is 'Our Approach' (layout template appends firm name)", () => {
    expect(metadata.title).toBe("Our Approach");
  });
});

describe("OA-9 axe-core clean", () => {
  it("renders with no accessibility violations", async () => {
    const { container } = renderPage();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
