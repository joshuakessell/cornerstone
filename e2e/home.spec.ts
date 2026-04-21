import { test, expect } from "@playwright/test";

const ROUTE = "/";

test.describe("HP-13 hero video honors prefers-reduced-motion", () => {
  test.use({ colorScheme: "light" });

  test("video is paused when reduced-motion is reduce", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(ROUTE);
    const video = page.getByTestId("hero-video");
    await expect(video).toBeVisible();
    const paused = await video.evaluate((el) => (el as HTMLVideoElement).paused);
    expect(paused).toBe(true);
    await context.close();
  });

  test("video plays normally when reduced-motion is no-preference", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "no-preference" });
    const page = await context.newPage();
    await page.goto(ROUTE);
    const video = page.getByTestId("hero-video");
    await expect(video).toBeVisible();
    await page.waitForTimeout(500);
    const paused = await video.evaluate((el) => (el as HTMLVideoElement).paused);
    expect(paused).toBe(false);
    await context.close();
  });
});
