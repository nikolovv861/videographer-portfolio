import { test, expect } from "@playwright/test";

test.describe("Custom Cursor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders custom cursor dot and ring on desktop", async ({ page }) => {
    const dot = page.locator('[data-testid="cursor-dot"]');
    const ring = page.locator('[data-testid="cursor-ring"]');
    await expect(dot).toBeAttached();
    await expect(ring).toBeAttached();
    await expect(dot).toHaveCSS("pointer-events", "none");
    await expect(ring).toHaveCSS("pointer-events", "none");
    await expect(dot).toHaveCSS("position", "fixed");
    await expect(ring).toHaveCSS("position", "fixed");
  });

  test("cursor follows mouse movement", async ({ page }) => {
    await page.mouse.move(300, 400);
    await page.waitForTimeout(100);
    const dot = page.locator('[data-testid="cursor-dot"]');
    const transform = await dot.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.transform;
    });
    expect(transform).not.toBe("none");
  });

  test("ring expands on interactive element hover", async ({ page }) => {
    const ring = page.locator('[data-testid="cursor-ring"]');
    const link = page.locator("a").first();
    const box = await link.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(200);
      const scale = await ring.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      // Ring should have a scale transform applied on hover
      expect(scale).not.toBe("none");
    }
  });

  test("hides custom cursor on touch devices", async ({ browser }) => {
    const context = await browser.newContext({ hasTouch: true });
    const page = await context.newPage();
    await page.goto("/");
    const dot = page.locator('[data-testid="cursor-dot"]');
    const ring = page.locator('[data-testid="cursor-ring"]');
    await expect(dot).not.toBeAttached();
    await expect(ring).not.toBeAttached();
    await context.close();
  });
});
