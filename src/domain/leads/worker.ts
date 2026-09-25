import type { OutboxEvent } from "./store";

/** §5.3 / gate 19 — retry with backoff, then dead-letter. Nothing is lost. */
export const MAX_ATTEMPTS = 5;
export const BASE_BACKOFF_MS = 1_000;

export function backoffMs(attempt: number): number {
  return BASE_BACKOFF_MS * 2 ** Math.max(0, attempt - 1);
}

export type DeliveryOutcome =
  | { status: "delivered" }
  | { status: "retry"; error: string }
  | { status: "dead_letter"; error: string };

export interface Deliverable {
  attempts: number;
}

/**
 * Pure transition function so the retry policy is unit-testable without a
 * live provider. Transient failures retry; exhausted work dead-letters.
 */
export function nextState(
  event: Deliverable,
  result: { ok: boolean; retryable: boolean; error?: string },
): DeliveryOutcome {
  if (result.ok) return { status: "delivered" };
  const attempts = event.attempts + 1;
  if (!result.retryable || attempts >= MAX_ATTEMPTS) {
    return { status: "dead_letter", error: result.error ?? "unknown" };
  }
  return { status: "retry", error: result.error ?? "unknown" };
}

export async function processOutbox(
  events: OutboxEvent[],
  deliver: (event: OutboxEvent) => Promise<{ ok: boolean; retryable: boolean; error?: string }>,
): Promise<{ delivered: number; retried: number; deadLettered: number }> {
  let delivered = 0;
  let retried = 0;
  let deadLettered = 0;

  for (const event of events) {
    if (event.state !== "pending") continue;
    const result = await deliver(event);
    const outcome = nextState(event, result);
    event.attempts += 1;
    if (outcome.status === "delivered") {
      event.state = "delivered";
      delivered += 1;
    } else if (outcome.status === "dead_letter") {
      event.state = "dead_letter";
      deadLettered += 1;
    } else {
      retried += 1;
    }
  }
  return { delivered, retried, deadLettered };
}
