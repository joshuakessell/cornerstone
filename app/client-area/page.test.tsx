import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import ClientAreaPage, { metadata } from "@/app/client-area/page";

function renderPage() {
  return render(<ClientAreaPage />);
}

describe("CA-1 Client Area renders inside PageShell with 'Client Area' heading", () => {
  it("is wrapped by PageShell (data-testid marker)", () => {
    const { container } = renderPage();
    expect(container.querySelector("[data-testid='page-shell']")).not.toBeNull();
  });

  it("has exactly one h1 with text 'Client Area'", () => {
    renderPage();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.trim()).toBe("Client Area");
  });
});

describe("CA-7 initial render includes >=1 testimonial and welcome image", () => {
  it("at least 1 blockquote appears on initial render", () => {
    const { container } = renderPage();
    expect(container.querySelectorAll("blockquote").length).toBeGreaterThanOrEqual(1);
  });

  it("renders at least one <img> with width+height", () => {
    const { container } = renderPage();
    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    for (const img of imgs) {
      expect(img.getAttribute("width")).not.toBeNull();
      expect(img.getAttribute("height")).not.toBeNull();
    }
  });
});

describe("CA-10 no custom intake form beyond pre-intake (initial render)", () => {
  it("total non-hidden input controls on the initial page <= 3", () => {
    const { container } = renderPage();
    const controls = container.querySelectorAll(
      "input:not([type='hidden']), select, textarea"
    );
    expect(controls.length).toBeLessThanOrEqual(3);
  });
});

describe("CA-12 metadata title short form (layout template resolves full string)", () => {
  it("page metadata exports title 'Client Area'", () => {
    expect(metadata.title).toBe("Client Area");
  });
});

describe("CA-13 axe clean on /client-area initial render", () => {
  it("has no axe violations", async () => {
    const { container } = renderPage();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
