import { expect, test } from "@playwright/test";

/** Regression guard: the header lives in the layout, so a native <details>
 *  menu keeps its open state across client navigation unless we close it. */
test.use({ viewport: { width: 390, height: 780 }, isMobile: true, hasTouch: true });

const isOpen = (page: import("@playwright/test").Page) =>
  page.locator("header details").evaluate((el: HTMLDetailsElement) => el.open);

test.describe("mobile menu", () => {
  test("closes after navigating to another page", async ({ page }) => {
    await page.goto("/");
    await page.locator("header summary").click();
    expect(await isOpen(page)).toBe(true);

    await page.locator("header details a", { hasText: "Concrete Patios" }).first().click();
    await page.waitForURL("**/services/concrete-patios");
    expect(await isOpen(page)).toBe(false);
  });

  test("closes when the link targets the current page", async ({ page }) => {
    await page.goto("/services/concrete-patios");
    await page.locator("header summary").click();
    expect(await isOpen(page)).toBe(true);

    await page.locator("header details a", { hasText: "Concrete Patios" }).first().click();
    await expect.poll(() => isOpen(page)).toBe(false);
  });

  test("closes on Escape and on an outside click", async ({ page }) => {
    await page.goto("/");

    await page.locator("header summary").click();
    await page.keyboard.press("Escape");
    await expect.poll(() => isOpen(page)).toBe(false);

    await page.locator("header summary").click();
    await page.mouse.click(30, 620);
    await expect.poll(() => isOpen(page)).toBe(false);
  });
});
