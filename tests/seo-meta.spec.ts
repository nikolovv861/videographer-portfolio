import { test, expect } from "@playwright/test";

test.describe("SEO Meta Tags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page has title meta tag", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Alex Rivera");
  });

  test("page has description meta tag", async ({ page }) => {
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);
  });

  test("page has Open Graph tags", async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogTitle).toHaveAttribute("content", /.+/);
    await expect(ogDescription).toHaveAttribute("content", /.+/);
    await expect(ogImage).toHaveAttribute("content", /.+/);
  });

  test("page has Twitter card tags", async ({ page }) => {
    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    await expect(twitterCard).toHaveAttribute("content", /.+/);
    await expect(twitterTitle).toHaveAttribute("content", /.+/);
  });

  test("page has JSON-LD structured data", async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.textContent();
    expect(content).toBeTruthy();
    const parsed = JSON.parse(content!);
    expect(parsed).toHaveProperty("@type");
    expect(parsed).toHaveProperty("name");
  });
});
