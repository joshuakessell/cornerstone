import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cssPath = resolve(__dirname, "globals.css");
const css = readFileSync(cssPath, "utf8");

function extractHex(token: string): string | null {
  const re = new RegExp(`--color-${token}\\s*:\\s*(#[0-9a-fA-F]{3,8})\\s*;`);
  const m = css.match(re);
  return m ? m[1] : null;
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(parseHex(hexA));
  const lb = relativeLuminance(parseHex(hexB));
  const [lo, hi] = la < lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

describe("GF-1: Tailwind 4 @theme exposes brand palette", () => {
  const navySteps = [50, 100, 500, 700, 900];
  const goldSteps = [50, 100, 500, 700, 900];

  it.each(navySteps)(
    "declares --color-brand-navy-%s",
    (step) => {
      const hex = extractHex(`brand-navy-${step}`);
      expect(hex).not.toBeNull();
      expect(hex ?? "").toMatch(/^#[0-9a-fA-F]{3,8}$/);
    },
  );

  it.each(goldSteps)(
    "declares --color-brand-gold-%s",
    (step) => {
      const hex = extractHex(`brand-gold-${step}`);
      expect(hex).not.toBeNull();
      expect(hex ?? "").toMatch(/^#[0-9a-fA-F]{3,8}$/);
    },
  );
});

describe("GF-2: navy-on-white contrast meets WCAG AA", () => {
  it("brand-navy-700 vs #ffffff has ratio >= 4.5", () => {
    const navy = extractHex("brand-navy-700");
    expect(navy).not.toBeNull();
    expect(contrastRatio(navy!, "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });
});

describe("GF-3: no peach/coral tokens", () => {
  it("globals.css has no peach/coral references", () => {
    expect(css).not.toMatch(/peach/i);
    expect(css).not.toMatch(/coral/i);
    expect(css).not.toMatch(/#f8d7c/i);
  });
});

describe("GF-5: prose-body utility exists with justified text", () => {
  it("declares .prose-body with text-align: justify", () => {
    const re = /\.prose-body[\s\S]*?text-align\s*:\s*justify/;
    expect(css).toMatch(re);
  });
});
