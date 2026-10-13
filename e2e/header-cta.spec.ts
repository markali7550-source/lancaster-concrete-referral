import { expect, test } from "@playwright/test";

test.describe("header Request Service button", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("on the homepage, scrolls to the bottom form and stays on the page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.getByRole("link", { name: "Request Service" }).click();
    await expect(page).toHaveURL(/\/#quote-form$/);
    await expect(page.locator("#quote-form")).toBeInViewport();
  });

  test("on a service page, scrolls to that page's form", async ({ page }) => {
    await page.goto("/services/concrete-slabs");
    await page.getByRole("link", { name: "Request Service" }).click();
    await expect(page).toHaveURL(/\/services\/concrete-slabs#quote-form$/);
    await expect(page.locator("#quote-form")).toBeInViewport();
  });

  test("on a page with no form, goes to the contact form", async ({ page }) => {
    await page.goto("/privacy");
    await page.getByRole("link", { name: "Request Service" }).click();
    await expect(page).toHaveURL(/\/contact#quote-form$/);
  });
});
