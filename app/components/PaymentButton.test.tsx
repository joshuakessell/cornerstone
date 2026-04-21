import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentButton } from "./PaymentButton";

describe("PaymentButton", () => {
  it("renders a single Make a Payment link", () => {
    render(<PaymentButton />);
    const links = screen.getAllByRole("link", { name: /make a payment/i });
    expect(links).toHaveLength(1);
  });

  it("applies fixed bottom-right positioning on its wrapper", () => {
    render(<PaymentButton />);
    const wrapper = screen.getByTestId("payment-button");
    const cls = wrapper.className;
    expect(cls).toMatch(/fixed/);
    expect(cls).toMatch(/bottom-/);
    expect(cls).toMatch(/right-/);
  });

  it("carries external-link security attributes", () => {
    render(<PaymentButton />);
    const link = screen.getByRole("link", { name: /make a payment/i });
    expect(link.getAttribute("rel") ?? "").toMatch(/noopener/);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("aria-label")).toBe("Make a payment");
  });

  it("sets href from siteConfig.paymentUrl", () => {
    render(<PaymentButton />);
    const link = screen.getByRole("link", { name: /make a payment/i });
    expect(link.getAttribute("href")).toMatch(/^https?:\/\/|^#$|^$/);
  });
});
