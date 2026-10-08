import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

function loadEnv(file: string): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync(resolve(__dirname, file), "utf8")
        .split("\n")
        .filter((line) => line.trim() && !line.startsWith("#"))
        .map((line) => {
          const index = line.indexOf("=");
          return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
        }),
    );
  } catch {
    return {};
  }
}

export default defineConfig({
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  test: {
    environment: "node",
    include: ["src/tests/**/*.test.ts"],
    // .env.local is gitignored, so a fresh checkout has no public env and any
    // suite importing @/lib/env fails at collection. The committed example
    // carries schema-valid values, so it is the fallback; local overrides win.
    env: { ...loadEnv(".env.example"), ...loadEnv(".env.local") },
  },
});
