import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-url'

/**
 * The admin panel and the API are kept out of the index. Note that while the
 * maintenance gate is on, the proxy answers every public path with a 503
 * (including this one), which is the correct signal to a crawler — the rules
 * below only take effect once the site is live again.
 */
export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
