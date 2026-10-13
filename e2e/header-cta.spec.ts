import { expect, test } from "@playwright/test";

test.describe("header Request Service button", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("goes to the service page, not the contact form", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Request Service" }).click();
    await expect(page).toHaveURL(/\/services\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
