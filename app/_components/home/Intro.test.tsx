import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Intro } from "@/app/_components/home/Intro";

describe("Intro (supports HP-8)", () => {
  it("renders a single <p> element", () => {
    const { container } = render(<Intro />);
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("HP-8 paragraph carries the foundation 'prose-body' class", () => {
    const { container } = render(<Intro />);
    const p = container.querySelector("p") as HTMLParagraphElement;
    expect(p.classList.contains("prose-body")).toBe(true);
  });

  it("paragraph text is at least 30 chars (from content/home.ts)", () => {
    const { container } = render(<Intro />);
    const p = container.querySelector("p") as HTMLParagraphElement;
    expect(p.textContent?.trim().length ?? 0).toBeGreaterThanOrEqual(30);
  });
});
