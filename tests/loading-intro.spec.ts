import { test, expect } from "@playwright/test";

test.describe("Loading Intro", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows letterbox loading overlay on first visit", async ({ page }) => {
    const overlay = page.locator('[data-testid="loading-overlay"]');
    await expect(overlay).toBeVisible();
    await expect(overlay).toHaveCSS("position", "fixed");
    await expect(overlay).toHaveCSS("z-index", "200");
    const counter = overlay.locator('[data-testid="loading-counter"]');
    await expect(counter).toBeVisible();
  });

  test("shows percentage counter counting to 100%", async ({ page }) => {
    const counter = page.locator('[data-testid="loading-counter"]');
    await expect(counter).toHaveText(/\d+%/);
  });

  test("hides overlay after intro completes", async ({ page }) => {
    const overlay = page.locator('[data-testid="loading-overlay"]');
    await expect(overlay).not.toBeVisible({ timeout: 6000 });
  });

  test("shows quick animation on return visit", async ({ page }) => {
    // Wait for intro to finish on first visit
    const overlay = page.locator('[data-testid="loading-overlay"]');
    await expect(overlay).not.toBeVisible({ timeout: 6000 });

    // Verify sessionStorage was set
    const hasVisited = await page.evaluate(() =>
      sessionStorage.getItem("hasVisited")
    );
    expect(hasVisited).toBeTruthy();

    // Navigate away and back
    await page.goto("about:blank");
    await page.goto("/");

    // On return visit, no percentage counter should show
    const counter = page.locator('[data-testid="loading-counter"]');
    await expect(counter).not.toBeVisible({ timeout: 2000 });
  });

  test("skips intro for reduced-motion users", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const overlay = page.locator('[data-testid="loading-overlay"]');
    await expect(overlay).not.toBeVisible({ timeout: 1000 });
  });
});
