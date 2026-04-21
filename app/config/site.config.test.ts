import { describe, it, expect } from "vitest";
import { siteConfig } from "./site.config";

describe("siteConfig contract", () => {
  it("exposes firm name, nav links, payment url, contact details", () => {
    expect(siteConfig.firmName).toMatch(/\w+/);
    expect(siteConfig.navLinks.length).toBe(5);
    const labels = siteConfig.navLinks.map((l) => l.label.toLowerCase());
    expect(labels).toEqual([
      "home",
      "our team",
      "our approach",
      "our services",
      "contact",
    ]);
    expect(siteConfig.paymentUrl).toMatch(/^https?:\/\/|^#$/);
    expect(siteConfig.phone).toMatch(/\d/);
    expect(siteConfig.email).toMatch(/@/);
    expect(siteConfig.address.line1).toMatch(/\w+/);
  });
});
