import { expect, test } from "@playwright/test";

const CALL_NAME = /call us for a quote/i;

test.describe("mobile call bar (below 768px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("is visible at the bottom and links to the configured phone", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: CALL_NAME });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", /^tel:\+1\d{10}$/);
    const box = await link.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(48);
  });
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("the call bar is hidden", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: CALL_NAME })).toBeHidden();
  });
});
