import { describe, it, expect } from "vitest";
import { home } from "@/app/content/home";

describe("HP content module (app/content/home.ts)", () => {
  it("exports a non-empty headline string", () => {
    expect(typeof home.headline).toBe("string");
    expect(home.headline.trim().length).toBeGreaterThan(0);
  });

  it("exports the literal word 'Family' to emphasize", () => {
    expect(home.familyWord).toBe("Family");
  });

  it("headline contains the familyWord", () => {
    expect(home.headline).toContain(home.familyWord);
  });

  it("exports a non-empty subhead string", () => {
    expect(typeof home.subhead).toBe("string");
    expect(home.subhead.trim().length).toBeGreaterThan(0);
  });

  it("exports an intro paragraph at least 30 chars long", () => {
    expect(typeof home.intro).toBe("string");
    expect(home.intro.trim().length).toBeGreaterThanOrEqual(30);
  });

  it("exports a non-empty videoSrc and posterSrc", () => {
    expect(home.videoSrc.trim().length).toBeGreaterThan(0);
    expect(home.posterSrc.trim().length).toBeGreaterThan(0);
  });

  it("does not contain the banned marketing phrase", () => {
    const banned = /Exemplary Representation from a Dallas Legal Firm/;
    expect(home.headline).not.toMatch(banned);
    expect(home.subhead).not.toMatch(banned);
    expect(home.intro).not.toMatch(banned);
  });
});
