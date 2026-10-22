/**
 * Search indexing is OFF until launch. Only an explicit ALLOW_SEARCH_INDEXING=true
 * at build time turns it on. Previews, staging, local builds, and any deployment
 * that does not set the flag stay noindex.
 *
 * Read at build time: pages, robots.txt, and the sitemap are static, so setting
 * the flag requires a redeploy. next.config.ts reads the same variable to send
 * the X-Robots-Tag header.
 */
export const SEARCH_INDEXING_ENABLED = process.env.ALLOW_SEARCH_INDEXING === "true";
