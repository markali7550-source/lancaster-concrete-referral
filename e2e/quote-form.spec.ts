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
  return page.locator("#quote-form [id$='consent-section'] input[type=checkbox]").first();
}

function uniqueEmail(): string {
  return `owner${Date.now()}@example.com`;
}

function uniquePhone(): string {
  const tail = String(Date.now()).slice(-4);
  return `803555${tail}`;
}

/** The homepage has a hero form and a lower form; tests drive the lower one. */
function formOf(page: Page) {
  return page.locator("#quote-form");
}

async function fillContact(page: Page, email = uniqueEmail()) {
  await formOf(page).getByLabel(/^email$/i).fill(email);
  await formOf(page).getByLabel(/^phone$/i).fill(uniquePhone());
}

async function fillStepOne(page: Page, zip: string) {
  await formOf(page).getByRole("radio", { name: /driveway/i }).first().check();
  await formOf(page).getByLabel(/^location$/i).selectOption(zip);
  await formOf(page).getByRole("button", { name: /continue/i }).click();
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
    await expect(formOf(page).getByText(/step 1 of 2/i)).toBeVisible();
    await fillStepOne(page, APPROVED_ZIP);
    await expect(formOf(page).getByText(/step 2 of 2/i)).toBeVisible();
  });

  test("blocks a missing location and does not advance", async ({ page }) => {
    await page.goto("/");
    await formOf(page).getByRole("button", { name: /continue/i }).click();
    await expect(formOf(page).getByText(/choose your location/i).first()).toBeVisible();
    await expect(formOf(page).getByText(/step 1 of 2/i)).toBeVisible();
  });

  test("accepts an email with a plus tag (regression)", async ({
    page,
  }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await formOf(page).getByLabel(/full name/i).fill("Jane Homeowner");
    await fillContact(page, `tagged+${Date.now()}@example.com`);
    await serviceConsent(page).check();
    await formOf(page).getByRole("button", { name: /request concrete service/i }).click();
    await expect(formOf(page).getByText(/request received/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(formOf(page).getByText(/^lead_/)).toBeVisible();
  });

  test("submits end to end and shows a lead reference", async ({ page }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await formOf(page).getByLabel(/full name/i).fill("Sam Owner");
    await fillContact(page);
    await serviceConsent(page).check();
    await formOf(page).getByRole("button", { name: /request concrete service/i }).click();
    await expect(formOf(page).getByText(/request is with our team/i)).toBeVisible({
      timeout: 15000,
    });
  });

  test("correcting a field clears its error immediately (regression)", async ({
    page,
  }) => {
    await page.goto("/");
    await formOf(page).getByRole("button", { name: /continue/i }).click();
    await expect(formOf(page).getByText(/choose your location/i).first()).toBeVisible();
    await formOf(page).getByLabel(/^location$/i).selectOption(APPROVED_ZIP);
    await expect(formOf(page).getByText(/choose your location/i)).toHaveCount(0);
  });

  test("collects name, email, phone and details", async ({ page }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await expect(formOf(page).getByLabel(/full name/i)).toBeVisible();
    await expect(formOf(page).getByLabel(/^email$/i)).toBeVisible();
    await expect(formOf(page).getByLabel(/^phone$/i)).toBeVisible();
    await expect(formOf(page).getByLabel(/project details/i)).toBeVisible();
    await expect(formOf(page).getByLabel(/preferred contact method/i)).toHaveCount(0);
  });

  test("requires a valid phone number", async ({ page }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await formOf(page).getByLabel(/full name/i).fill("Jane Homeowner");
    await formOf(page).getByLabel(/^email$/i).fill(uniqueEmail());
    await formOf(page).getByLabel(/^phone$/i).fill("123");
    await serviceConsent(page).check();
    await formOf(page).getByRole("button", { name: /request concrete service/i }).click();
    await expect(formOf(page).getByText(/10 digit us phone/i).first()).toBeVisible();
  });

  test("requires the service consent checkbox", async ({ page }) => {
    await page.goto("/");
    await fillStepOne(page, APPROVED_ZIP);
    await formOf(page).getByLabel(/full name/i).fill("Jane Homeowner");
    await fillContact(page);
    await formOf(page).getByRole("button", { name: /request concrete service/i }).click();
    await expect(formOf(page).getByText(/consent is required/i).first()).toBeVisible();
  });

  test("unlisted location shows the no-coverage screen, not a failure", async ({
    page,
  }) => {
    await page.goto("/");
    await fillStepOne(page, UNAPPROVED_ZIP);
    await formOf(page).getByLabel(/full name/i).fill("Out Of Area");
    await fillContact(page);
    await serviceConsent(page).check();
    await formOf(page).getByRole("button", { name: /request concrete service/i }).click();
    await expect(formOf(page).getByText(/isn't covered yet/i)).toBeVisible({
      timeout: 15000,
    });
    await expect(
      formOf(page).getByRole("button", { name: /change location/i }),
    ).toBeVisible();
  });

  test("static fallback phone is present and dialable", async ({ page }) => {
    await page.goto("/");
    const telLink = page.locator('a[href^="tel:"]').first();
    await expect(telLink).toBeVisible();
    await expect(telLink).toHaveAttribute("href", /^tel:\+1\d{10}$/);
  });
});
