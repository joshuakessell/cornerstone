import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TeamMember } from "@/app/our-team/_components/TeamMember";
import type { TeamMember as TeamMemberData } from "@/app/content/team";

const fixture: TeamMemberData = {
  name: "Test Person",
  role: "Test Role",
  bio: "x".repeat(60),
  imageSrc: "/team/test.placeholder.jpg",
  imageAlt: "Portrait of Test Person",
};

describe("TeamMember row structure", () => {
  it("renders a heading (h2 or h3) with the member name", () => {
    render(<TeamMember member={fixture} />);
    const row = screen.getByTestId("team-member");
    const heading = row.querySelector("h2, h3");
    expect(heading?.textContent?.trim()).toBe(fixture.name);
  });

  it("renders a role element distinct from the heading", () => {
    render(<TeamMember member={fixture} />);
    const row = screen.getByTestId("team-member");
    const role = row.querySelector("[data-testid='team-member-role']");
    expect(role).not.toBeNull();
    expect(role?.textContent?.trim()).toBe(fixture.role);
  });

  it("renders a bio element with the full bio text", () => {
    render(<TeamMember member={fixture} />);
    const row = screen.getByTestId("team-member");
    const bio = row.querySelector("[data-testid='team-member-bio']");
    expect(bio?.textContent?.trim()).toBe(fixture.bio);
  });
});

describe("OT-6 team member image pins subject to the top", () => {
  it("image has inline style object-position starting with 'top'", () => {
    render(<TeamMember member={fixture} />);
    const row = screen.getByTestId("team-member");
    const img = row.querySelector("img") as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.style.objectPosition.toLowerCase()).toMatch(/^top\b|^center\s+top\b/);
  });

  it("image className carries an object-top utility for production CSS", () => {
    render(<TeamMember member={fixture} />);
    const img = screen.getByTestId("team-member").querySelector("img")!;
    expect(img.className).toMatch(/object-top/);
  });

  it("image className carries an object-cover utility", () => {
    render(<TeamMember member={fixture} />);
    const img = screen.getByTestId("team-member").querySelector("img")!;
    expect(img.className).toMatch(/object-cover/);
  });
});

describe("TeamMember image accessibility", () => {
  it("renders an <img> with non-empty alt text", () => {
    render(<TeamMember member={fixture} />);
    const img = screen.getByTestId("team-member").querySelector("img");
    expect(img?.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("image has explicit width and height attributes (CLS guard)", () => {
    render(<TeamMember member={fixture} />);
    const img = screen.getByTestId("team-member").querySelector("img")!;
    expect(img.getAttribute("width")).not.toBeNull();
    expect(img.getAttribute("height")).not.toBeNull();
  });
});

describe("TeamMember markup is clip-path free", () => {
  it("no descendant has an inline clip-path other than 'none'", () => {
    const { container } = render(<TeamMember member={fixture} />);
    for (const el of container.querySelectorAll("*")) {
      const inline = (el as HTMLElement).style.clipPath;
      expect(inline === "" || inline === "none").toBe(true);
    }
  });

  it("no class name contains 'diamond' or 'rhombus'", () => {
    const { container } = render(<TeamMember member={fixture} />);
    for (const el of container.querySelectorAll("*")) {
      expect(el.className?.toString() ?? "").not.toMatch(/diamond|rhombus/i);
    }
  });
});
