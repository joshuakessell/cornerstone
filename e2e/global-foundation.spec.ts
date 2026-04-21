import { test, expect } from "@playwright/test";

test.describe("global-foundation e2e", () => {
  test("GF-4: typography scale (h1 > h2 > h3 > body)", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div id="typo-probe"><h1>h1</h1><h2>h2</h2><h3>h3</h3><p id="body-probe">body</p></div>',
      );
    });
    const sizes = await page.evaluate(() => {
      const px = (sel: string): number => {
        const el = document.querySelector(sel) as HTMLElement;
        return parseFloat(getComputedStyle(el).fontSize);
      };
      return {
        h1: px("#typo-probe h1"),
        h2: px("#typo-probe h2"),
        h3: px("#typo-probe h3"),
        body: px("#body-probe"),
      };
    });
    expect(sizes.h1).toBeGreaterThan(sizes.h2);
    expect(sizes.h2).toBeGreaterThan(sizes.h3);
    expect(sizes.h3).toBeGreaterThan(sizes.body);
  });

  test("GF-6: menu link font-size smaller than body", async ({ page }) => {
    await page.goto("/");
    const sizes = await page.evaluate(() => {
      const link = document.querySelector("header nav a") as HTMLElement;
      const body = document.body;
      return {
        link: parseFloat(getComputedStyle(link).fontSize),
        body: parseFloat(getComputedStyle(body).fontSize),
      };
    });
    expect(sizes.link).toBeLessThan(sizes.body);
  });

  test("GF-10: payment CTA visible on mobile viewport", async ({
    page,
    viewport,
  }) => {
    test.skip(!viewport || viewport.width >= 640, "mobile-only");
    await page.goto("/");
    const cta = page.getByRole("link", { name: /make a payment/i });
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
  });

  test("GF-5: body prose paragraphs are justified", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div class="prose-body" id="prose-probe"><p>lorem ipsum dolor sit amet</p></div>',
      );
    });
    const align = await page.evaluate(() => {
      const p = document.querySelector("#prose-probe p") as HTMLElement;
      return getComputedStyle(p).textAlign;
    });
    expect(align).toBe("justify");
  });
});
