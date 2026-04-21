import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PrimaryNav } from "./PrimaryNav";

const links = [
  { label: "Home", href: "/" },
  { label: "Our Team", href: "/our-team" },
];

describe("PrimaryNav", () => {
  it("renders a <nav> labelled Primary with one link per entry", () => {
    render(<PrimaryNav links={links} />);
    const nav = screen.getByRole("navigation", { name: /primary/i });
    const navLinks = within(nav).getAllByRole("link");
    expect(navLinks).toHaveLength(links.length);
  });

  it("each link has a smaller-than-base font-size class", () => {
    render(<PrimaryNav links={links} />);
    const nav = screen.getByRole("navigation", { name: /primary/i });
    const navLinks = within(nav).getAllByRole("link");
    const allSmaller = navLinks.every((a) => /text-sm|text-xs/.test(a.className));
    expect(allSmaller).toBe(true);
  });
});
