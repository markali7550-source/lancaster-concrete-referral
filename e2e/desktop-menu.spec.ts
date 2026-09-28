import { expect, test } from "@playwright/test";

const DESKTOP = { width: 1440, height: 900 };

test.use({ viewport: DESKTOP });

test.describe("desktop Services menu", () => {
  test("opens on click", async ({ page }) => {
    await page.goto("/");
    const button = page.locator('nav[aria-label="Primary"] button', {
      hasText: "Services",
    });
    await button.click();
    await expect(page.locator('nav[aria-label="Primary"] div.card')).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "true");
  });

  test("closes on Escape", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .click();
    await page.keyboard.press("Escape");
    await expect(page.locator('nav[aria-label="Primary"] div.card')).toHaveCount(0);
  });

  test("closes on outside click", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .click();
    await page.mouse.click(700, 750);
    await expect(page.locator('nav[aria-label="Primary"] div.card')).toHaveCount(0);
  });

  test("closes after client-side navigation (regression)", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .click();
    await page.getByRole("link", { name: /concrete patios/i }).first().click();
    await page.waitForURL("**/services/concrete-patios");
    await expect(page.locator('nav[aria-label="Primary"] div.card')).toHaveCount(0);
  });

  test("desktop nav is shown and the hamburger is hidden at 1440", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
    await expect(
      page.locator('summary[aria-label="Open menu"]'),
    ).toBeHidden();
  });
});

test.describe("Services menu hover", () => {
  const panel = 'nav[aria-label="Primary"] div.card';

  test("opens on hover and reveals every published service", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .hover();
    await expect(page.locator(panel)).toBeVisible();
    for (const name of [
      "Concrete Driveways",
      "Concrete Patios",
      "Concrete Slabs",
      "Concrete Repair",
    ]) {
      await expect(page.locator(panel).getByText(name, { exact: true })).toBeVisible();
    }
    await expect(page.locator(panel).getByText(/all services/i)).toBeVisible();
  });

  test("stays open while moving the cursor into the panel", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .hover();
    await page.locator(panel).getByText("Concrete Patios", { exact: true }).hover();
    await expect(page.locator(panel)).toBeVisible();
  });

  test("closes when the cursor leaves", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .hover();
    await expect(page.locator(panel)).toBeVisible();
    await page.mouse.move(700, 800);
    await expect(page.locator(panel)).toHaveCount(0);
  });

  test("each item shows its project types", async ({ page }) => {
    await page.goto("/");
    await page
      .locator('nav[aria-label="Primary"] button', { hasText: "Services" })
      .hover();
    const first = page.locator(`${panel} a`).first();
    await expect(first).toContainText("·");
  });
});
