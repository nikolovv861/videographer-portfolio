import { test, expect } from "@playwright/test";

test.describe("Reduced Motion Compliance", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
  });

  test("CSS disables animations for reduced-motion users", async ({
    page,
  }) => {
    // With prefers-reduced-motion: reduce, animation-duration should be minimal
    const body = page.locator("body");
    const animDuration = await body.evaluate(() => {
      const animated = document.querySelector(
        '[data-testid="scroll-reveal"], [style*="animation"]'
      ) as HTMLElement;
      if (!animated) return "0s";
      return window.getComputedStyle(animated).animationDuration;
    });
    // Should be 0s or 0.01ms (effectively disabled)
    expect(["0s", "0.01ms", "0ms"]).toContain(animDuration);
  });

  test("custom cursor hidden for reduced-motion users", async ({ page }) => {
    const dot = page.locator('[data-testid="cursor-dot"]');
    const ring = page.locator('[data-testid="cursor-ring"]');
    await expect(dot).not.toBeAttached();
    await expect(ring).not.toBeAttached();
  });

  test("loading intro skipped for reduced-motion users", async ({ page }) => {
    const overlay = page.locator('[data-testid="loading-overlay"]');
    await expect(overlay).not.toBeVisible({ timeout: 1000 });
  });
});
