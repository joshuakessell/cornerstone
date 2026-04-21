import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ContactInfo } from "@/app/contact/_components/ContactInfo";
import { siteConfig } from "@/app/config/site.config";

describe("ContactInfo", () => {
  it("renders a tel: link that matches siteConfig.phone digits", () => {
    const { container } = render(<ContactInfo />);
    const tel = container.querySelector('a[href^="tel:"]');
    expect(tel).not.toBeNull();
    expect(tel!.getAttribute("href")).toContain(siteConfig.phone.replace(/\D/g, ""));
  });

  it("renders a mailto: link for siteConfig.email", () => {
    const { container } = render(<ContactInfo />);
    const mail = container.querySelector('a[href^="mailto:"]');
    expect(mail).not.toBeNull();
    expect(mail!.getAttribute("href")).toContain(siteConfig.email);
  });

  it("renders an <address> with both address lines", () => {
    const { container } = render(<ContactInfo />);
    const addr = container.querySelector("address");
    expect(addr).not.toBeNull();
    expect(addr!.textContent).toContain(siteConfig.address.line1);
    expect(addr!.textContent).toContain(siteConfig.address.line2);
  });
});
