/** Provider event idempotency ledger (§5.6.7). In production: a unique index. */
const processed = new Map<string, string>();

export function alreadyProcessed(providerEventId: string): boolean {
  return processed.has(providerEventId);
}

export function markProcessed(providerEventId: string, outcome: string): void {
  processed.set(providerEventId, outcome);
}

export function processedCount(): number {
  return processed.size;
}

export function resetEventsForTests(): void {
  processed.clear();
}
