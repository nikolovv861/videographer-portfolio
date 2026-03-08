import { test, expect } from "@playwright/test";

test.describe("Gold Dividers", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("gold divider elements exist between sections", async ({ page }) => {
    const dividers = page.locator('[data-testid="gold-divider"]');
    const count = await dividers.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Verify divider styling -- gold color
    const firstDivider = dividers.first();
    const bgColor = await firstDivider.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    // Should have gold-ish color (#c9a96e / rgb(201, 169, 110))
    expect(bgColor).toContain("201");
  });

  test("dividers animate on scroll", async ({ page }) => {
    const divider = page.locator('[data-testid="gold-divider"]').first();
    await divider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // After scrolling into view, divider should have full width (scaleX(1))
    const transform = await divider.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });
    // When fully animated, scaleX should be 1 (matrix with first value = 1)
    // "matrix(1, 0, 0, 1, 0, 0)" or "none" means fully visible
    expect(
      transform === "none" || transform.startsWith("matrix(1")
    ).toBe(true);
  });
});
