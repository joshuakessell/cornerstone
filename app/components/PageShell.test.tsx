import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { PageShell } from "./PageShell";

describe("GF-8: PageShell bottom-right payment CTA", () => {
  it("renders exactly one Make a Payment link", () => {
    render(
      <PageShell>
        <main>content</main>
      </PageShell>,
    );
    const ctas = screen.getAllByRole("link", { name: /make a payment/i });
    expect(ctas).toHaveLength(1);
  });

  it("wraps the payment CTA in a fixed bottom-right container", () => {
    render(
      <PageShell>
        <main>content</main>
      </PageShell>,
    );
    const cta = screen.getByRole("link", { name: /make a payment/i });
    const wrapper = cta.closest('[data-testid="payment-button"]');
    expect(wrapper).not.toBeNull();
    const cls = wrapper!.className;
    expect(cls).toMatch(/fixed/);
    expect(cls).toMatch(/bottom-/);
    expect(cls).toMatch(/right-/);
  });
});

describe("GF-9: Payment CTA security attrs", () => {
  it("carries rel=noopener, target=_blank, aria-label", () => {
    render(
      <PageShell>
        <main>content</main>
      </PageShell>,
    );
    const cta = screen.getByRole("link", { name: /make a payment/i });
    expect(cta.getAttribute("rel") ?? "").toMatch(/noopener/);
    expect(cta.getAttribute("target")).toBe("_blank");
    expect(cta.getAttribute("aria-label")).toBe("Make a payment");
  });
});

describe("GF-13: axe-core reports no serious/critical violations", () => {
  it("PageShell with empty main has zero serious/critical violations", async () => {
    const { container } = render(
      <PageShell>
        <main>
          <h1>Cornerstone</h1>
        </main>
      </PageShell>,
    );
    const results = await axe(container);
    const bad = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(bad).toEqual([]);
  });
});
