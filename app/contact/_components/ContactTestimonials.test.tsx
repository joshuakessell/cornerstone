import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ContactTestimonials } from "@/app/contact/_components/ContactTestimonials";

describe("ContactTestimonials", () => {
  it("renders at least 2 blockquote elements", () => {
    const { container } = render(<ContactTestimonials />);
    expect(container.querySelectorAll("blockquote").length).toBeGreaterThanOrEqual(2);
  });

  it("each blockquote has an accompanying <cite> in its containing card", () => {
    const { container } = render(<ContactTestimonials />);
    for (const bq of container.querySelectorAll("blockquote")) {
      const card = bq.closest("article") ?? bq.parentElement;
      expect(card?.querySelector("cite")).not.toBeNull();
    }
  });

  it("is identified by data-testid='contact-testimonials'", () => {
    const { container } = render(<ContactTestimonials />);
    expect(container.querySelector("[data-testid='contact-testimonials']")).not.toBeNull();
  });
});
