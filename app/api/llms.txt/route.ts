import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/lib/site-settings'
import { getArticles } from '@/lib/articles'
import { siteUrl } from '@/lib/site-url'

/**
 * llms.txt — the site's summary for AI crawlers.
 *
 * Generated from site_settings and the published articles rather than a fixed
 * string, so it can never drift from what the site actually says. The previous
 * hardcoded version advertised a placeholder phone number and practice areas
 * the office does not work in.
 */
export const dynamic = 'force-dynamic'

/** Collapses the multi-line/rich fields the CMS allows into one clean line. */
function oneLine(s: string | undefined): string {
  return (s ?? '').replace(/\s+/g, ' ').trim()
}

export async function GET() {
  const base = siteUrl()

  const [settings, articles] = await Promise.all([
    getSiteSettings(),
    getArticles().catch(() => []),
  ])

  const brand = oneLine(settings.footer_brand_name) || 'משרד עו"ד מיכל גלר-עבאדי'
  const summary = oneLine(settings.hero_subtitle) || oneLine(settings.office_description)

  const lines: string[] = [`# ${brand}`, '']
  if (summary) lines.push(`> ${summary}`, '')

  const services = (settings.services ?? []).filter(s => oneLine(s.t))
  if (services.length) {
    lines.push('## תחומי עיסוק', '')
    for (const s of services) {
      const detail = oneLine(s.desc) || oneLine(s.sub)
      lines.push(detail ? `- ${oneLine(s.t)}: ${detail}` : `- ${oneLine(s.t)}`)
    }
    lines.push('')
  }

  const about = oneLine(settings.about_text1)
  if (about) lines.push('## אודות', '', about, '')

  if (articles.length) {
    lines.push('## מאמרים', '')
    for (const a of articles) {
      const excerpt = oneLine(a.excerpt)
      const title = oneLine(a.title)
      lines.push(excerpt
        ? `- [${title}](${base}/blog/${a.slug}): ${excerpt}`
        : `- [${title}](${base}/blog/${a.slug})`)
    }
    lines.push('')
  }

  lines.push('## יצירת קשר', '')
  if (oneLine(settings.contact_phone))   lines.push(`- טלפון: ${oneLine(settings.contact_phone)}`)
  if (oneLine(settings.contact_email))   lines.push(`- דוא"ל: ${oneLine(settings.contact_email)}`)
  if (oneLine(settings.contact_address)) lines.push(`- כתובת: ${oneLine(settings.contact_address)}`)
  if (oneLine(settings.contact_hours))   lines.push(`- שעות קבלה: ${oneLine(settings.contact_hours)}`)
  lines.push('', `- טופס יצירת קשר: ${base}/contact`, '')

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
