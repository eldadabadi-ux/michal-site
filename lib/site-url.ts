/**
 * The site's canonical base URL, without a trailing slash.
 *
 * Single source of truth for every absolute URL the app emits — canonical/OG
 * tags, sitemap, robots and llms.txt — so the domain is configured in one
 * place instead of being repeated per route.
 */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gellerabadi.co.il'
  return raw.replace(/\/+$/, '') // a trailing slash would yield '//blog' when joined
}
