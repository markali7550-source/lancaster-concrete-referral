import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  join(process.cwd(), "src/components/lead/QuoteForm.tsx"),
  "utf8",
);

describe("quote form: Back navigation", () => {
  it("renders the Back button only inside the step 2 branch", () => {
    const stepTwoStart = source.indexOf(") : (");
    const backIndex = source.indexOf("Back\n            </button>");
    expect(stepTwoStart).toBeGreaterThan(-1);
    expect(backIndex).toBeGreaterThan(stepTwoStart);
  });

  it("returns to step 1 without clearing the entered values", () => {
    expect(source).toContain("onClick={() => setStep(1)}");
    // Values live in one state object; the Back handler must not reset it.
    const backHandler = source.slice(
      source.indexOf("onClick={() => setStep(1)}") - 200,
      source.indexOf("onClick={() => setStep(1)}") + 40,
    );
    expect(backHandler).not.toContain("setValues");
  });

  it("uses theme tokens and a 44px minimum tap target", () => {
    expect(source).toContain("min-h-11");
    expect(source).toContain("text-[var(--color-muted)]");
    expect(source).toContain("hover:text-[var(--color-ink)]");
    expect(source).not.toMatch(/hover:text-\[var\(--color-text\)\]/);
  });

  it("gives the arrow icon an accessible hidden state", () => {
    expect(source).toMatch(/aria-hidden="true"\s+focusable="false"/);
  });
});
