import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceCard } from "@/app/our-services/_components/ServiceCard";
import type { Service } from "@/app/content/services";

const base: Service = {
  slug: "divorce",
  title: "Divorce",
  description: "Guidance through contested and uncontested divorce.",
};

describe("ServiceCard (supports OS-6, OS-9)", () => {
  it("renders an <article> element", () => {
    render(<ServiceCard service={base} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders the service title inside a heading (h2 or h3)", () => {
    render(<ServiceCard service={base} />);
    const article = screen.getByRole("article");
    const heading = article.querySelector("h2, h3");
    expect(heading?.textContent?.trim()).toBe(base.title);
  });

  it("renders the description paragraph", () => {
    render(<ServiceCard service={base} />);
    expect(screen.getByText(base.description)).toBeInTheDocument();
  });

  it("renders a sub-services list when provided", () => {
    const withSubs: Service = { ...base, subServices: ["Uncontested", "Contested"] };
    render(<ServiceCard service={withSubs} />);
    const ul = screen.getByRole("article").querySelector("ul");
    expect(ul).not.toBeNull();
    expect(ul!.querySelectorAll("li")).toHaveLength(2);
  });

  it("omits the sub-services list when none provided", () => {
    render(<ServiceCard service={base} />);
    expect(screen.getByRole("article").querySelector("ul")).toBeNull();
  });

  it("never renders a bare <img> without width+height attrs", () => {
    const { container } = render(<ServiceCard service={base} />);
    for (const img of container.querySelectorAll("img")) {
      expect(img.getAttribute("width")).not.toBeNull();
      expect(img.getAttribute("height")).not.toBeNull();
    }
  });
});
