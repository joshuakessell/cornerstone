import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import ContactPage, { metadata } from "@/app/contact/page";
import { siteConfig } from "@/app/config/site.config";

function renderPage() {
  return render(<ContactPage />);
}

describe("CT-1 Contact renders inside PageShell with single h1 and >=2 blockquotes", () => {
  it("is wrapped by PageShell (data-testid marker)", () => {
    const { container } = renderPage();
    expect(container.querySelector("[data-testid='page-shell']")).not.toBeNull();
  });

  it("has exactly one h1", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders at least 2 blockquote elements", () => {
    const { container } = renderPage();
    expect(container.querySelectorAll("blockquote").length).toBeGreaterThanOrEqual(2);
  });

  it("each blockquote has an accompanying <cite> in its containing card", () => {
    const { container } = renderPage();
    for (const bq of container.querySelectorAll("blockquote")) {
      const card = bq.closest("article") ?? bq.parentElement;
      expect(card?.querySelector("cite")).not.toBeNull();
    }
  });
});

describe("CT-2 tel and mailto links", () => {
  it("renders at least one tel: link driven by siteConfig.phone", () => {
    const { container } = renderPage();
    const tel = container.querySelector('a[href^="tel:"]');
    expect(tel).not.toBeNull();
    expect(tel!.getAttribute("href")).toContain(siteConfig.phone.replace(/\D/g, ""));
  });

  it("renders at least one mailto: link driven by siteConfig.email", () => {
    const { container } = renderPage();
    const mail = container.querySelector('a[href^="mailto:"]');
    expect(mail).not.toBeNull();
    expect(mail!.getAttribute("href")).toContain(siteConfig.email);
  });
});

describe("CT-3 address semantic element", () => {
  it("renders at least one <address> element in the contact body (outside footer)", () => {
    const { container } = renderPage();
    const outsideFooter = Array.from(container.querySelectorAll("address")).filter(
      a => !a.closest("footer")
    );
    expect(outsideFooter.length).toBeGreaterThanOrEqual(1);
  });

  it("address reflects siteConfig.address (line1 + line2)", () => {
    const { container } = renderPage();
    const outsideFooter = Array.from(container.querySelectorAll("address")).find(
      a => !a.closest("footer")
    );
    expect(outsideFooter?.textContent ?? "").toContain(siteConfig.address.line1);
    expect(outsideFooter?.textContent ?? "").toContain(siteConfig.address.line2);
  });
});

describe("CT-4 welcoming image", () => {
  it("renders at least one <img> with width+height+alt attributes (next/image shape)", () => {
    const { container } = renderPage();
    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    for (const img of imgs) {
      expect(img.getAttribute("width")).not.toBeNull();
      expect(img.getAttribute("height")).not.toBeNull();
      expect(img.getAttribute("alt")).not.toBeNull();
    }
  });
});

describe("CT-5 metadata title short form (layout template resolves full string)", () => {
  it("page metadata exports title 'Contact'", () => {
    expect(metadata.title).toBe("Contact");
  });
});

describe("Contact a11y (supports CA-13 scope for /contact)", () => {
  it("has no axe violations", async () => {
    const { container } = renderPage();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
