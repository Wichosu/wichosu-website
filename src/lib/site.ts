/**
 * Canonical site URL, shared by metadata, sitemap and the Payload server URL.
 * Trailing slashes are stripped so callers can safely append paths.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wichosu.com').replace(
  /\/+$/,
  '',
)

export const absoluteUrl = (path = ''): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
