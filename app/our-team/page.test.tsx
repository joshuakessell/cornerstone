import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import OurTeamPage, { metadata } from "@/app/our-team/page";
import { team } from "@/app/content/team";

function renderPage() {
  return render(<OurTeamPage />);
}

function getTeamSection(container: HTMLElement) {
  const section = container.querySelector("[data-testid='team-list']");
  if (!section) throw new Error("team-list section missing");
  return section as HTMLElement;
}

describe("OT-1 route renders inside PageShell", () => {
  it("wraps content in PageShell", () => {
    const { container } = renderPage();
    expect(container.querySelector("[data-testid='page-shell']")).not.toBeNull();
  });

  it("exposes a <main> landmark", () => {
    renderPage();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders a top-level h1 referencing the team", () => {
    renderPage();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent ?? "").toMatch(/our team/i);
  });
});

describe("OT-4 exactly n-1 dividers between members", () => {
  it("divider count equals team.length - 1", () => {
    const { container } = renderPage();
    const section = getTeamSection(container);
    const dividers = section.querySelectorAll("[data-role='divider']");
    expect(dividers.length).toBe(team.length - 1);
  });

  it("no divider appears before the first team member row", () => {
    const { container } = renderPage();
    const section = getTeamSection(container);
    const first = section.firstElementChild;
    expect(first?.getAttribute("data-role")).not.toBe("divider");
  });

  it("no divider appears after the last team member row", () => {
    const { container } = renderPage();
    const section = getTeamSection(container);
    const last = section.lastElementChild;
    expect(last?.getAttribute("data-role")).not.toBe("divider");
  });
});

describe("OT-5 no diamond/rhombus clip-path in the team subtree", () => {
  it("no element in the team section has a class matching diamond|rhombus", () => {
    const { container } = renderPage();
    const section = getTeamSection(container);
    const all = section.querySelectorAll("*");
    for (const el of all) {
      expect(el.className?.toString() ?? "").not.toMatch(/diamond|rhombus/i);
    }
  });

  it("no element in the team section uses inline clip-path", () => {
    const { container } = renderPage();
    const section = getTeamSection(container);
    const all = section.querySelectorAll("*");
    for (const el of all) {
      const inline = (el as HTMLElement).style.clipPath;
      expect(inline === "" || inline === "none").toBe(true);
    }
  });
});

describe("OT-7 Clint C. Brown entry is present", () => {
  it("heading for Clint C. Brown exists", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: /Clint C\. Brown/ }),
    ).toBeInTheDocument();
  });

  it("the Clint row exposes role text 'Managing Partner and Founder'", () => {
    renderPage();
    const heading = screen.getByRole("heading", { name: /Clint C\. Brown/ });
    const row = heading.closest("[data-testid='team-member']") as HTMLElement;
    expect(row).not.toBeNull();
    const role = row.querySelector("[data-testid='team-member-role']");
    expect(role?.textContent?.trim()).toBe("Managing Partner and Founder");
  });
});

describe("OT-8 Tyra Miller entry is present", () => {
  it("heading for Tyra Miller exists", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: /Tyra Miller/ }),
    ).toBeInTheDocument();
  });

  it("the Tyra row exposes role text 'Board Certified Paralegal'", () => {
    renderPage();
    const heading = screen.getByRole("heading", { name: /Tyra Miller/ });
    const row = heading.closest("[data-testid='team-member']") as HTMLElement;
    expect(row).not.toBeNull();
    const role = row.querySelector("[data-testid='team-member-role']");
    expect(role?.textContent?.trim()).toBe("Board Certified Paralegal");
  });
});

describe("OT-9 every rendered bio is at least 50 chars", () => {
  it("each team-member-bio element has textContent length >= 50", () => {
    const { container } = renderPage();
    const bios = container.querySelectorAll("[data-testid='team-member-bio']");
    expect(bios.length).toBe(team.length);
    for (const bio of bios) {
      expect((bio.textContent ?? "").trim().length).toBeGreaterThanOrEqual(50);
    }
  });
});

describe("OT-10 page metadata title resolves to 'Our Team'", () => {
  it("metadata.title is 'Our Team' (layout template appends firm name)", () => {
    expect(metadata.title).toBe("Our Team");
  });
});

describe("OT-11 axe-core clean on the team page container", () => {
  it(
    "renders with no serious/critical accessibility violations",
    async () => {
      const { container } = renderPage();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    },
    15_000,
  );
});

describe("composition: the team section contains a row per member", () => {
  it("team-member rows count equals team data length", () => {
    const { container } = renderPage();
    const section = getTeamSection(container);
    const rows = within(section).getAllByTestId("team-member");
    expect(rows).toHaveLength(team.length);
  });
});
