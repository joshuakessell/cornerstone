import { describe, it, expect } from "vitest";
import { team } from "@/app/content/team";

describe("team content data", () => {
  it("exports the two default members in order (Clint, Tyra)", () => {
    const names = team.map(m => m.name);
    expect(names).toEqual(["Clint C. Brown", "Tyra Miller"]);
  });

  it("Clint C. Brown has role 'Managing Partner and Founder'", () => {
    const clint = team.find(m => m.name === "Clint C. Brown");
    expect(clint?.role).toBe("Managing Partner and Founder");
  });

  it("Tyra Miller has role 'Board Certified Paralegal'", () => {
    const tyra = team.find(m => m.name === "Tyra Miller");
    expect(tyra?.role).toBe("Board Certified Paralegal");
  });

  it("every member bio is at least 50 chars", () => {
    for (const m of team) {
      expect(m.bio.trim().length).toBeGreaterThanOrEqual(50);
    }
  });

  it("every member bio carries the [UPDATED_BIO_TBD] placeholder marker", () => {
    for (const m of team) {
      expect(m.bio).toContain("[UPDATED_BIO_TBD]");
    }
  });

  it("every member has a /team/*.placeholder.jpg image path", () => {
    for (const m of team) {
      expect(m.imageSrc).toMatch(/^\/team\/.+\.placeholder\.jpg$/);
    }
  });

  it("every member has non-empty alt text for the headshot", () => {
    for (const m of team) {
      expect(m.imageAlt.trim().length).toBeGreaterThan(0);
    }
  });
});
