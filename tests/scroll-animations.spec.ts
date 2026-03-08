import { test, expect } from "@playwright/test";

test.describe("Scroll Animations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("sections have scroll-triggered animation wrappers", async ({
    page,
  }) => {
    const services = page.locator('[id="services"]');
    await services.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Expect elements with motion/animation attributes within the section
    const animatedElements = services.locator(
      '[data-testid="scroll-reveal"], [style*="opacity"], [style*="transform"]'
    );
    const count = await animatedElements.count();
    expect(count).toBeGreaterThan(0);
  });

  test("section content becomes visible after scrolling into view", async ({
    page,
  }) => {
    // Scroll to a below-fold section
    const about = page.locator('[id="about"]');
    await about.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Content should be fully visible (opacity: 1) after scroll
    const opacity = await about.evaluate((el) => {
      const firstChild = el.querySelector(
        '[data-testid="scroll-reveal"]'
      ) as HTMLElement;
      if (!firstChild) return "0";
      return window.getComputedStyle(firstChild).opacity;
    });
    expect(opacity).toBe("1");
  });
});
