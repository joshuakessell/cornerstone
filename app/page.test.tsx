import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import HomePage from "@/app/page";

function renderHome() {
  return render(<HomePage />);
}

describe("HP-7 home page wraps content in <PageShell>", () => {
  it("page render contains the PageShell testid marker", () => {
    const { container } = renderHome();
    expect(container.querySelector("[data-testid='page-shell']")).not.toBeNull();
  });
});

describe("HP-9 home page exposes a <main> landmark", () => {
  it("a main landmark is present", () => {
    renderHome();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("the page's h1 is inside the <main>", () => {
    renderHome();
    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});

describe("HP-5 home page renders zero <audio> elements", () => {
  it("has no <audio> tags anywhere on the page", () => {
    const { container } = renderHome();
    expect(container.querySelectorAll("audio")).toHaveLength(0);
  });
});

describe("HP-6 home page does not contain the banned marketing phrase", () => {
  it("rendered text omits 'Exemplary Representation from a Dallas Legal Firm'", () => {
    const { container } = renderHome();
    expect(container.textContent ?? "").not.toMatch(
      /Exemplary Representation from a Dallas Legal Firm/
    );
  });
});

describe("HP-10 all images inside <main> have non-empty alt text", () => {
  it("every <img role='img'> in main has a non-empty alt attribute", () => {
    renderHome();
    const main = screen.getByRole("main");
    const imgs = within(main).queryAllByRole("img");
    for (const img of imgs) {
      expect(img.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });
});

describe("HP-12 axe-core a11y scan is clean", () => {
  it(
    "home page has no serious or critical a11y violations",
    async () => {
      const { container } = renderHome();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    },
    15_000
  );
});

describe("page composition (within main)", () => {
  it("main contains exactly one <video> (the hero video)", () => {
    renderHome();
    const main = screen.getByRole("main");
    expect(main.querySelectorAll("video")).toHaveLength(1);
  });

  it("main contains the .home-hero-family emphasis span", () => {
    renderHome();
    const main = screen.getByRole("main");
    expect(main.querySelector("span.home-hero-family")).not.toBeNull();
  });

  it("main contains an intro <p> with class 'prose-body'", () => {
    renderHome();
    const main = screen.getByRole("main");
    expect(main.querySelector("p.prose-body")).not.toBeNull();
  });
});
