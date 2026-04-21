import { test, expect } from "@playwright/test";

const ROUTE = "/contact";

test.describe("CT-5 (e2e) full document.title after layout template resolution", () => {
  test("document.title === 'Contact | Cornerstone Law Group'", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page).toHaveTitle("Contact | Cornerstone Law Group");
  });
});

test.describe("Contact renders tel/mailto/address at runtime", () => {
  test("tel: and mailto: links visible at viewport", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
    await expect(page.locator("address").first()).toBeVisible();
  });
});

// CT-6 Lighthouse mobile gates (Perf >= 90, SEO >= 95, A11y >= 95, CLS < 0.1)
// are enforced by `lhci autorun` on /contact via the Lighthouse CI config
// owned by the `global-foundation` feature. No in-spec assertion here —
// the gate lives in CI (lighthouserc.js or equivalent).
