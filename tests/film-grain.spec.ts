import { test, expect } from "@playwright/test";

test.describe("Film Grain Effect", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders film grain SVG filter in hero section", async ({ page }) => {
    const hero = page.locator('[id="hero"]');
    await expect(hero).toBeVisible();
    const grainSvg = page.locator("svg filter feTurbulence");
    await expect(grainSvg).toBeAttached();
  });

  test("film grain has low opacity", async ({ page }) => {
    const grainContainer = page.locator('[data-testid="film-grain"]');
    await expect(grainContainer).toBeAttached();
    const opacity = await grainContainer.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).opacity);
    });
    expect(opacity).toBeGreaterThanOrEqual(0.04);
    expect(opacity).toBeLessThanOrEqual(0.1);
  });
});
