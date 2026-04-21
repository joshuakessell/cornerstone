import { test, expect, devices } from "@playwright/test";

const ROUTE = "/our-approach";

test.describe("OA-8 resolved document.title at runtime", () => {
  test("document.title === 'Our Approach | Cornerstone Law Group'", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page).toHaveTitle("Our Approach | Cornerstone Law Group");
  });
});

test.describe("OA-4 five blockquotes render inside the testimonials section", () => {
  test("testimonials section contains exactly 5 blockquote elements", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("testimonials");
    await expect(section.locator("blockquote")).toHaveCount(5);
  });
});

test.describe("OA-7 forbidden firm string absent from testimonials section", () => {
  test("'Cornerstone Law Group' does not appear anywhere inside testimonials", async ({ page }) => {
    await page.goto(ROUTE);
    const section = page.getByTestId("testimonials");
    const text = (await section.textContent()) ?? "";
    expect(text).not.toContain("Cornerstone Law Group, P.C.");
    expect(text.toLowerCase()).not.toContain("cornerstone law group");
  });
});

test.describe("OA-2 hero renders a single image on mobile", () => {
  test.use({ ...devices["iPhone 13"] });

  test("hero section has exactly one <img> with non-empty src and alt", async ({ page }) => {
    await page.goto(ROUTE);
    const hero = page.getByTestId("approach-hero");
    const imgs = hero.locator("img");
    await expect(imgs).toHaveCount(1);
    await expect(imgs).toHaveAttribute("src", /\/approach\/hero-placeholder/);
    const alt = await imgs.getAttribute("alt");
    expect(alt?.trim().length ?? 0).toBeGreaterThan(0);
  });
});

// OA-10 (Lighthouse Perf >= 90, SEO >= 95, A11y >= 95, CLS < 0.1) on /our-approach
// mobile is enforced by `lhci autorun` configured by the global-foundation feature.
// No in-spec Lighthouse assertion here — the gate lives in CI config.
