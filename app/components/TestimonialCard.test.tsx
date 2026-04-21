import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import type { Testimonial } from "@/app/content/approach";
import { TestimonialCard } from "@/app/components/TestimonialCard";

const sample: Testimonial = {
  id: "jennifer",
  firstName: "Jennifer",
  quote:
    "[PLACEHOLDER_TESTIMONIAL:Jennifer] Sample long-form quote content that exceeds two hundred characters to exercise the rendering path for an in-depth testimonial and to ensure typography and layout assumptions hold under realistic copy lengths.",
};

describe("TestimonialCard", () => {
  it("renders the quote inside a <blockquote>", () => {
    const { container } = render(<TestimonialCard testimonial={sample} />);
    const bq = container.querySelector("blockquote");
    expect(bq).not.toBeNull();
    expect(bq!.textContent).toContain(sample.quote);
  });

  it("renders the firstName inside a <cite>", () => {
    const { container } = render(<TestimonialCard testimonial={sample} />);
    const cite = container.querySelector("cite");
    expect(cite).not.toBeNull();
    expect(cite!.textContent?.trim()).toBe("Jennifer");
  });

  it("uses no inline styles", () => {
    const { container } = render(<TestimonialCard testimonial={sample} />);
    expect(container.querySelector("[style]")).toBeNull();
  });
});
