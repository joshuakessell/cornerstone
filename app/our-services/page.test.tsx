import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import OurServicesPage, { metadata } from "@/app/our-services/page";
import { services } from "@/app/content/services";

function renderPage() {
  return render(<OurServicesPage />);
}

describe("OS-1 route renders inside PageShell with single h1", () => {
  it("has exactly one h1", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("is wrapped by PageShell (data-testid marker)", () => {
    const { container } = renderPage();
    expect(container.querySelector("[data-testid='page-shell']")).not.toBeNull();
  });
});

describe("OS-2 intro paragraph present", () => {
  it("renders an intro paragraph before the services grid with >= 30 chars", () => {
    const { container } = renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    const grid = screen.getByTestId("services-grid");
    const intro = container.querySelector("header p");
    expect(intro).not.toBeNull();
    expect(intro?.textContent?.trim().length ?? 0).toBeGreaterThanOrEqual(30);
    expect(h1.compareDocumentPosition(intro!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(intro!.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe("OS-3 grid has at least 4 article cards", () => {
  it("renders >= 4 articles inside services-grid", () => {
    renderPage();
    const grid = screen.getByTestId("services-grid");
    expect(within(grid).getAllByRole("article").length).toBeGreaterThanOrEqual(4);
  });
});

describe("OS-6 each card has a heading and a paragraph", () => {
  it("every article contains a h2/h3 heading and a <p>", () => {
    renderPage();
    const grid = screen.getByTestId("services-grid");
    const articles = within(grid).getAllByRole("article");
    for (const article of articles) {
      const heading = article.querySelector("h2, h3");
      const paragraph = article.querySelector("p");
      expect(heading).not.toBeNull();
      expect(paragraph).not.toBeNull();
    }
  });
});

describe("OS-7 default categories present", () => {
  it("renders the 4 default category titles", () => {
    renderPage();
    const grid = screen.getByTestId("services-grid");
    const titles = within(grid)
      .getAllByRole("article")
      .map(a => a.querySelector("h2, h3")?.textContent?.trim());
    for (const expected of ["Divorce", "Child Custody", "Adoption", "Mediation"]) {
      expect(titles).toContain(expected);
    }
  });

  it("content/services.ts exports those 4 defaults", () => {
    const titles = services.map(s => s.title);
    expect(titles).toEqual(
      expect.arrayContaining(["Divorce", "Child Custody", "Adoption", "Mediation"])
    );
    expect(services.length).toBeGreaterThanOrEqual(4);
  });
});

describe("OS-8 metadata title", () => {
  it("page metadata exports title 'Our Services' (template resolves full string in layout)", () => {
    expect(metadata.title).toBe("Our Services");
  });
});

describe("OS-9 no bare <img> without width+height", () => {
  it("rendered HTML contains no <img> missing width/height attributes", () => {
    const { container } = renderPage();
    const imgs = Array.from(container.querySelectorAll("img"));
    for (const img of imgs) {
      expect(img.getAttribute("width")).not.toBeNull();
      expect(img.getAttribute("height")).not.toBeNull();
    }
  });
});

describe("OS-10 axe-core clean", () => {
  it("has no a11y violations", async () => {
    const { container } = renderPage();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
