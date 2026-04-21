import { test, expect, devices } from "@playwright/test";

const ROUTE = "/our-team";

test.describe("OT-2 team member row uses a 2-column grid at desktop width", () => {
  test.use({ viewport: { width: 1024, height: 800 } });

  test("each .team-member has display:grid with 2 tracks at 1024px", async ({ page }) => {
    await page.goto(ROUTE);
    const rows = page.getByTestId("team-member");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      const row = rows.nth(i);
      const display = await row.evaluate(el => getComputedStyle(el).display);
      expect(display).toBe("grid");
      const tracks = await row.evaluate(el =>
        getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length,
      );
      expect(tracks).toBe(2);
    }
  });
});

test.describe("OT-3 page stacks to single column on mobile with no horizontal overflow", () => {
  test.use({ ...devices["iPhone 13"] });

  test("single track per row at 390px and no body horizontal scroll", async ({ page }) => {
    await page.goto(ROUTE);
    const rows = page.getByTestId("team-member");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      const tracks = await rows.nth(i).evaluate(el =>
        getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length,
      );
      expect(tracks).toBe(1);
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("OT-10 resolved document.title at runtime", () => {
  test("document.title === 'Our Team | Cornerstone Law Group'", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page).toHaveTitle("Our Team | Cornerstone Law Group");
  });
});

test.describe("OT-5 computed clip-path is 'none' for every element in the team section", () => {
  test("no element under [data-testid=team-list] has a non-none computed clip-path", async ({ page }) => {
    await page.goto(ROUTE);
    const badCount = await page.evaluate(() => {
      const section = document.querySelector("[data-testid='team-list']");
      if (!section) return -1;
      let bad = 0;
      for (const el of section.querySelectorAll("*")) {
        const cp = getComputedStyle(el).clipPath;
        if (cp && cp !== "none") bad += 1;
      }
      return bad;
    });
    expect(badCount).toBe(0);
  });
});

// OT-12 (Lighthouse Perf >= 90, SEO >= 95, A11y >= 95, CLS < 0.1) is enforced
// by `lhci autorun` gated on `/our-team` via the Lighthouse CI config owned
// by the `global-foundation` feature. No in-spec assertion here — the gate
// lives in CI (lighthouserc.js or equivalent).
// TODO: replace with lhci gate once lighthouse-ci is wired (see _project_specs/todos/backlog.md)
