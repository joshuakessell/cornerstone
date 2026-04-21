import { test, expect } from "@playwright/test";

const ROUTE = "/client-area";

test.describe("CA-12 (e2e) full document.title after layout template resolution", () => {
  test("document.title === 'Client Area | Cornerstone Law Group'", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page).toHaveTitle("Client Area | Cornerstone Law Group");
  });
});

test.describe("CA-7 (e2e) step transition reveals Clio surface", () => {
  test("after submitting pre-intake, either clio-embed or clio-placeholder is visible", async ({
    page,
  }) => {
    await page.goto(ROUTE);
    await page.getByLabel(/full name/i).fill("Jane Doe");
    await page.getByRole("radio", { name: /email/i }).check();
    await page.getByLabel(/email address/i).fill("jane@example.com");
    await page.getByRole("button", { name: /continue|submit/i }).click();

    const embed = page.getByTestId("clio-embed");
    const placeholder = page.getByTestId("clio-placeholder");
    await expect(embed.or(placeholder)).toBeVisible();
  });
});

// CA-14 Lighthouse mobile gates (Perf >= 85 when widget present, SEO >= 95,
// A11y >= 95, CLS < 0.1) are enforced by `lhci autorun` on /client-area via
// the Lighthouse CI config owned by the `global-foundation` feature.
