import { beforeEach, describe, expect, it } from "vitest";
import { signPayload, verifySignature } from "@/lib/validation/signature";
import { alreadyProcessed, markProcessed, resetEventsForTests } from "@/domain/leads/events";
import { backoffMs, nextState, processOutbox, MAX_ATTEMPTS } from "@/domain/leads/worker";
import type { OutboxEvent } from "@/domain/leads/store";

const SECRET = "test-secret";

describe("webhook signature verification (gate 22)", () => {
  const body = JSON.stringify({ providerEventId: "evt_123", type: "call_initiated" });

  it("accepts a correctly signed payload", () => {
    const { timestamp, header } = signPayload(body, SECRET);
    expect(
      verifySignature({ rawBody: body, signatureHeader: header, timestampHeader: timestamp, secret: SECRET }),
    ).toEqual({ ok: true });
  });

  it("rejects a tampered body", () => {
    const { timestamp, header } = signPayload(body, SECRET);
    const result = verifySignature({
      rawBody: body.replace("evt_123", "evt_999"),
      signatureHeader: header,
      timestampHeader: timestamp,
      secret: SECRET,
    });
    expect(result).toEqual({ ok: false, reason: "mismatch" });
  });

  it("rejects a replayed timestamp outside the window", () => {
    const old = Math.floor(Date.now() / 1000) - 600;
    const { timestamp, header } = signPayload(body, SECRET, old);
    expect(
      verifySignature({ rawBody: body, signatureHeader: header, timestampHeader: timestamp, secret: SECRET }),
    ).toEqual({ ok: false, reason: "stale" });
  });

  it("rejects a missing signature", () => {
    expect(
      verifySignature({ rawBody: body, signatureHeader: null, timestampHeader: null, secret: SECRET }),
    ).toEqual({ ok: false, reason: "missing" });
  });
});

describe("provider event idempotency", () => {
  beforeEach(() => resetEventsForTests());

  it("processes an event once", () => {
    expect(alreadyProcessed("evt_a")).toBe(false);
    markProcessed("evt_a", "call_completed");
    expect(alreadyProcessed("evt_a")).toBe(true);
  });
});

describe("delivery resilience (gate 19)", () => {
  it("backs off exponentially", () => {
    expect(backoffMs(1)).toBe(1000);
    expect(backoffMs(3)).toBe(4000);
  });

  it("retries a transient failure", () => {
    expect(nextState({ attempts: 1 }, { ok: false, retryable: true, error: "503" })).toEqual({
      status: "retry",
      error: "503",
    });
  });

  it("dead-letters a permanent failure immediately", () => {
    expect(nextState({ attempts: 0 }, { ok: false, retryable: false, error: "400" })).toEqual({
      status: "dead_letter",
      error: "400",
    });
  });

  it("dead-letters once attempts are exhausted", () => {
    expect(
      nextState({ attempts: MAX_ATTEMPTS - 1 }, { ok: false, retryable: true, error: "timeout" }).status,
    ).toBe("dead_letter");
  });

  it("never loses an accepted lead: every event ends delivered or dead-lettered", async () => {
    const events: OutboxEvent[] = [
      { id: "1", leadId: "lead_1", type: "lead.deliver", createdAt: "", attempts: 0, state: "pending" },
      { id: "2", leadId: "lead_2", type: "lead.deliver", createdAt: "", attempts: 4, state: "pending" },
    ];
    const result = await processOutbox(events, async (event) =>
      event.leadId === "lead_1" ? { ok: true, retryable: false } : { ok: false, retryable: true, error: "timeout" },
    );
    expect(result.delivered).toBe(1);
    expect(result.deadLettered).toBe(1);
    expect(events.every((e) => e.state !== "pending")).toBe(true);
  });
});
