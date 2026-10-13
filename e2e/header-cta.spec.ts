import { expect, test } from "@playwright/test";

test.describe("header Request Service button", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("stays on the homepage and scrolls to the form", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await page.getByRole("link", { name: "Request Service" }).click();
    await expect(page).toHaveURL(/\/#hero-quote-form$/);
    await expect(page.locator("#hero-quote-form")).toBeInViewport();
  });

  test("on a page without a form, goes to the contact form", async ({ page }) => {
    await page.goto("/privacy");
    await page.getByRole("link", { name: "Request Service" }).click();
    await expect(page).toHaveURL(/\/contact#quote-form$/);
  });
});
