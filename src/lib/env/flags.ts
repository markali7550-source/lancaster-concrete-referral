/**
 * §8.2.6 — global intake kill switch. Forms become a safe unavailable state
 * while informational and legal pages stay online. Server-read only, so it
 * flips without a code deployment.
 */
export function intakeEnabled(): boolean {
  return process.env.INTAKE_ENABLED !== "false";
}

/** §8.2.5 — partner routing can be disabled without a full deployment. */
export function routingEnabled(): boolean {
  return process.env.ROUTING_ENABLED !== "false";
}
