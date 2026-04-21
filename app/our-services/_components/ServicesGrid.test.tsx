import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ServicesGrid } from "@/app/our-services/_components/ServicesGrid";
import { services } from "@/app/content/services";

describe("ServicesGrid", () => {
  it("renders a section with data-testid='services-grid'", () => {
    render(<ServicesGrid />);
    expect(screen.getByTestId("services-grid").tagName).toBe("SECTION");
  });

  it("renders one article per service in the content array", () => {
    render(<ServicesGrid />);
    const grid = screen.getByTestId("services-grid");
    const articles = within(grid).getAllByRole("article");
    expect(articles).toHaveLength(services.length);
  });

  it("renders each service title as a heading inside its article", () => {
    render(<ServicesGrid />);
    const grid = screen.getByTestId("services-grid");
    const titles = within(grid)
      .getAllByRole("article")
      .map(a => a.querySelector("h2, h3")?.textContent?.trim());
    for (const s of services) {
      expect(titles).toContain(s.title);
    }
  });
});
