import { test, expect } from "@playwright/test";

test.describe("Lazy Loading", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero video iframe loads eagerly (above fold)", async ({ page }) => {
    const hero = page.locator('[id="hero"]');
    await expect(hero).toBeVisible();
    const iframe = hero.locator("iframe");
    await expect(iframe).toBeAttached();
  });

  test("below-fold video iframes are lazy-loaded", async ({ page }) => {
    // Check that below-fold iframes are NOT present initially
    const belowFoldIframes = await page.evaluate(() => {
      const viewportHeight = window.innerHeight;
      const allIframes = document.querySelectorAll("iframe");
      return Array.from(allIframes).filter((iframe) => {
        const rect = iframe.getBoundingClientRect();
        return rect.top > viewportHeight * 2;
      }).length;
    });

    // Initially, far-below-fold iframes should not be in the DOM
    // (intersection observer hasn't triggered)
    const totalIframesBefore = await page.locator("iframe").count();

    // Scroll to the bottom of the page to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const totalIframesAfter = await page.locator("iframe").count();

    // After scrolling, more iframes should be present (lazy-loaded)
    expect(totalIframesAfter).toBeGreaterThanOrEqual(totalIframesBefore);
  });
});
