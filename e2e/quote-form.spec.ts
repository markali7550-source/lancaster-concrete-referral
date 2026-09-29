import { expect, test, type ConsoleMessage, type Page } from "@playwright/test";

/**
 * Real-browser proof that the quote form hydrates and submits.
 * HTTP-level tests cannot catch a hydration failure; this can.
 */

const APPROVED_ZIP = "29720";
const UNAPPROVED_ZIP = "00000";

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message: ConsoleMessage) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  return errors;
}

/** Unique per run: the dev store dedupes on contact within a 30-day window. */
/** The service-consent checkbox specifically — /consent/i also matches the
 *  tracking-consent banner region, which is not a checkbox. */
function serviceConsent(page: Page) {
  return page.locator("#consent-section input[type=checkbox]").first();
}

function uniquePhone(): string {
  const tail = String(Date.now()).slice(-4);
  return `803555${tail}`;
}

async function fillStepOne(page: Page, zip: string) {
  await page.getByRole("radio", { name: /driveway/i }).first().check();
  await page.getByLabel(/^location$/i).selectOption(zip);
  await page.getByRole("button", { name: /continue/i }).click();
}

test.describe("quote form", () => {
  test("hydrates without console or page errors", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors, `browser reported errors:\n${errors.join("\n")}`).toEqual([]);
  });

  test("Continue advances to step 2 (proves interactivity)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/step 1 of 2/i)).toBeVisible();
    await fillStepOne(page, APPROVED_ZIP);
    await expect(page.getByText(/step 2 of 2/i)).toBeVisible();
  });

  test("blocks a missing location and does not advance", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText(/choose your location/i).first()).toBeVisible();
    await expect(page.getByText(/step 1 of 2/i)).toBeVisible();
  });

  test("accepts a phone number typed with the leading 1 (regression)", async ({
    page,
  }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await page.getByLabel(/full name/i).fill("Jane Homeowner");
    await page.getByLabel(/^phone$/i).fill(`1-${uniquePhone().slice(0, 3)}-555-0142`);
    await serviceConsent(page).check();
    await page.getByRole("button", { name: /request my quote/i }).click();
    await expect(page.getByText(/request received/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText(/^lead_/)).toBeVisible();
  });

  test("submits end to end and shows a lead reference", async ({ page }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await page.getByLabel(/full name/i).fill("Sam Owner");
    await page.getByLabel(/^phone$/i).fill(uniquePhone());
    await serviceConsent(page).check();
    await page.getByRole("button", { name: /request my quote/i }).click();
    await expect(page.getByText(/routing team/i)).toBeVisible({
      timeout: 15000,
    });
  });

  test("correcting a field clears its error immediately (regression)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText(/choose your location/i).first()).toBeVisible();
    await page.getByLabel(/^location$/i).selectOption(APPROVED_ZIP);
    await expect(page.getByText(/choose your location/i)).toHaveCount(0);
  });

  test("switching contact method drops the retired channel's error (regression)", async ({
    page,
  }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await page.getByLabel(/full name/i).fill("Jane Homeowner");
    await page.getByLabel(/^phone$/i).fill("123");
    await page.getByRole("button", { name: /request my quote/i }).click();
    await expect(page.getByText(/10-digit us phone/i).first()).toBeVisible();
    await page.getByLabel(/preferred contact method/i).selectOption("email");
    await expect(page.getByText(/10-digit us phone/i)).toHaveCount(0);
  });

  test("requires the service consent checkbox", async ({ page }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await page.getByLabel(/full name/i).fill("Jane Homeowner");
    await page.getByLabel(/^phone$/i).fill(uniquePhone());
    await page.getByRole("button", { name: /request my quote/i }).click();
    await expect(page.getByText(/consent is required/i).first()).toBeVisible();
  });

  test("unlisted location shows the no-coverage screen, not a failure", async ({
    page,
  }) => {
    await page.goto("/");
    await fillStepOne(page, UNAPPROVED_ZIP);
    await page.getByLabel(/full name/i).fill("Out Of Area");
    await page.getByLabel(/^phone$/i).fill(uniquePhone());
    await serviceConsent(page).check();
    await page.getByRole("button", { name: /request my quote/i }).click();
    await expect(page.getByText(/do not cover that area/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(
      page.getByRole("button", { name: /change location/i }),
    ).toBeVisible();
  });

  test("static fallback phone is present and dialable", async ({ page }) => {
    await page.goto("/");
    const telLink = page.locator('a[href^="tel:"]').first();
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute("href", /^tel:\+1\d{10}$/);
  });
});
