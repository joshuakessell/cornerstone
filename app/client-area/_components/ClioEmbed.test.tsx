import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClioEmbed } from "@/app/client-area/_components/ClioEmbed";

/**
 * ClioEmbed must read process.env.NEXT_PUBLIC_CLIO_EMBED_URL inside its
 * function body (not at module top-level) so that vi.stubEnv() affects
 * re-renders between tests.
 */

afterEach(() => {
  vi.unstubAllEnvs();
});

const PRE_INTAKE = {
  fullName: "Jane Doe",
  preferredContact: "email" as const,
  emailAddress: "jane@example.com",
};

describe("CA-8 iframe when env var set", () => {
  it("renders <iframe data-testid='clio-embed'> with the env var src and security attrs", () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "https://example.com/clio");
    render(<ClioEmbed data={PRE_INTAKE} />);
    const iframe = screen.getByTestId("clio-embed") as HTMLIFrameElement;
    expect(iframe.tagName.toLowerCase()).toBe("iframe");
    expect(iframe.getAttribute("src")).toBe("https://example.com/clio");
    expect(iframe.getAttribute("loading")).toBe("lazy");
    expect(iframe.getAttribute("title")).toBe("Clio intake form");
    expect(iframe.getAttribute("referrerpolicy")).toBe("strict-origin-when-cross-origin");
    expect(iframe.getAttribute("sandbox")).not.toBeNull();
  });

  it("interpolates {name} and {contact} tokens into the final src", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_CLIO_EMBED_URL",
      "https://example.com/clio?n={name}&c={contact}"
    );
    render(<ClioEmbed data={PRE_INTAKE} />);
    const src = (screen.getByTestId("clio-embed") as HTMLIFrameElement).getAttribute(
      "src"
    )!;
    expect(src).toContain("Jane");
    expect(src).toContain("jane%40example.com");
    expect(src).not.toContain("{name}");
    expect(src).not.toContain("{contact}");
  });
});

describe("CA-9 placeholder when env var missing or empty", () => {
  it("renders clio-placeholder, not clio-embed, when env var is undefined", () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "");
    render(<ClioEmbed data={PRE_INTAKE} />);
    expect(screen.getByTestId("clio-placeholder")).toBeInTheDocument();
    expect(screen.queryByTestId("clio-embed")).toBeNull();
  });

  it("placeholder has role='status' for a11y", () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "");
    render(<ClioEmbed data={PRE_INTAKE} />);
    expect(screen.getByTestId("clio-placeholder")).toHaveAttribute("role", "status");
  });
});

describe("CA-11 CLS-safe iframe wrapper", () => {
  it("iframe wrapper has aspect-ratio or explicit min-height >= 500px", () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "https://example.com/clio");
    const { container } = render(<ClioEmbed data={PRE_INTAKE} />);
    const iframe = container.querySelector("iframe");
    const wrapper = iframe?.parentElement;
    expect(wrapper).not.toBeNull();

    const cls = wrapper!.className;
    const hasAspectClass = /aspect-\[?[\d\/\.]+\]?/.test(cls);
    const minHMatch = /min-h-\[(\d+)px\]/.exec(cls);
    const meetsMinHeight = minHMatch ? Number(minHMatch[1]) >= 500 : false;

    expect(hasAspectClass || meetsMinHeight).toBe(true);
  });

  it("placeholder wrapper is also CLS-safe (prevents layout jump on env-set re-render)", () => {
    vi.stubEnv("NEXT_PUBLIC_CLIO_EMBED_URL", "");
    render(<ClioEmbed data={PRE_INTAKE} />);
    const placeholder = screen.getByTestId("clio-placeholder");
    const cls = placeholder.className;
    const hasAspectClass = /aspect-\[?[\d\/\.]+\]?/.test(cls);
    const minHMatch = /min-h-\[(\d+)px\]/.exec(cls);
    const meetsMinHeight = minHMatch ? Number(minHMatch[1]) >= 500 : false;
    expect(hasAspectClass || meetsMinHeight).toBe(true);
  });
});
