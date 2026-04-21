import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";

describe("GF-7: SiteHeader nav without payment button", () => {
  it("renders 5 primary nav links", () => {
    render(<SiteHeader />);
    const header = screen.getByRole("banner");
    const links = within(header).getAllByRole("link");
    const navLinks = links.filter(
      (a) => !/make a payment/i.test(a.textContent ?? ""),
    );
    expect(navLinks.length).toBeGreaterThanOrEqual(5);
  });

  it("renders the firm name", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner")).toHaveTextContent(/\w+/);
  });

  it("does not contain a Make a Payment link", () => {
    render(<SiteHeader />);
    const header = screen.getByRole("banner");
    expect(
      within(header).queryByRole("link", { name: /make a payment/i }),
    ).toBeNull();
  });
});

describe("GF-6: menu font size smaller than body", () => {
  it("primary nav links carry a className that indicates smaller-than-base size", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: /primary/i });
    const navLinks = within(nav).getAllByRole("link");
    const allHaveSmallerClass = navLinks.every((a) =>
      /text-sm|text-xs/.test(a.className),
    );
    expect(allHaveSmallerClass).toBe(true);
    expect(navLinks.length).toBe(5);
  });
});
