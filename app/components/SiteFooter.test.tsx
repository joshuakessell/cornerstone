import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./SiteFooter";

describe("GF-11: SiteFooter shows firm + current year", () => {
  it("renders the current year", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    const currentYear = new Date().getFullYear();
    expect(footer).toHaveTextContent(new RegExp(`©\\s*${currentYear}`));
  });

  it("contains an address placeholder", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent ?? "").toMatch(/\w+/);
  });

  it("does not contain scaffold boilerplate", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.textContent ?? "").not.toMatch(/create next app/i);
    expect(footer.textContent ?? "").not.toMatch(/vercel logomark/i);
  });
});
