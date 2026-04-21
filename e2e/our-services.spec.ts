import { test, expect, devices } from "@playwright/test";

const ROUTE = "/our-services";

test.describe("OS-4 grid has >= 2 columns at desktop width", () => {
  test.use({ viewport: { width: 1024, height: 800 } });

  test("grid-template-columns resolves to >= 2 tracks at 1024px", async ({ page }) => {
    await page.goto(ROUTE);
    const grid = page.getByTestId("services-grid");
    const tracks = await grid.evaluate((el) =>
      getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length
    );
    expect(tracks).toBeGreaterThanOrEqual(2);
  });
});

test.describe("OS-5 grid collapses to 1 column on mobile with no horizontal overflow", () => {
  test.use({ ...devices["iPhone 13"] });

  test("single track at 375px wide; body has no horizontal scroll", async ({ page }) => {
    await page.goto(ROUTE);
    const grid = page.getByTestId("services-grid");
    const tracks = await grid.evaluate((el) =>
      getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length
    );
    expect(tracks).toBe(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("OS-8 resolved document.title at runtime", () => {
  test("document.title === 'Our Services | Cornerstone Law Group'", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page).toHaveTitle("Our Services | Cornerstone Law Group");
  });
});

// OS-11: LHCI harness not yet in foundation test infra. Smoke-only here;
// full Perf/SEO/A11y/CLS gates tracked in _project_specs/todos/backlog.md.
test.describe("OS-11 Lighthouse smoke (full gates tracked in backlog)", () => {
  test("route responds 200 with visible h1 + services-grid", async ({ page }) => {
    const response = await page.goto(ROUTE);
    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByTestId("services-grid")).toBeVisible();
  });
});
