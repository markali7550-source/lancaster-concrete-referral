import { randomBytes } from "node:crypto";

/**
 * Server-only signing secrets for provider webhooks.
 *
 * Nothing here ever returns a published or guessable string. A missing secret
 * in production is an explicit error, so the endpoint fails closed instead of
 * accepting signatures made with a value that appears in the source code.
 *
 * Outside production (local development, tests, previews) a random secret is
 * generated once per process. Real provider signatures will not verify there,
 * which is the intended result.
 */
export const WEBHOOK_SECRET_NAMES = ["CALL_WEBHOOK_SECRET", "PARTNER_WEBHOOK_SECRET"] as const;

export type WebhookSecretName = (typeof WEBHOOK_SECRET_NAMES)[number];

const perProcessSecrets = new Map<WebhookSecretName, string>();

export function webhookSecret(name: WebhookSecretName): string {
  const configured = process.env[name];
  if (configured && configured.length > 0) return configured;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `${name} is not set. Provider webhooks refuse to run in production without it. Set ${name} in the hosting environment.`,
    );
  }

  let generated = perProcessSecrets.get(name);
  if (!generated) {
    generated = randomBytes(32).toString("hex");
    perProcessSecrets.set(name, generated);
  }
  return generated;
}
