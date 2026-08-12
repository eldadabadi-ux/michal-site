import type { MetadataRoute } from 'next'
import { getArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/site-url'

/**
 * Built from NEXT_PUBLIC_SITE_URL so it follows the site to its own domain
 * without a code change. Blog entries come from the same published-articles
 * query the blog pages use, so an unpublished draft never leaks into the map.
 */
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,         lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
    { url: `${base}/blog`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ]

  // A Supabase outage must not fail the whole sitemap — serve the static
  // routes rather than a 500.
  let articleRoutes: MetadataRoute.Sitemap = []
  try {
    const articles = await getArticles()
    articleRoutes = articles.map(a => ({
      url: `${base}/blog/${a.slug}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : now,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }))
  } catch {
    articleRoutes = []
  }

  return [...staticRoutes, ...articleRoutes]
}
