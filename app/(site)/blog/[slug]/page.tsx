import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getArticleBySlug } from '@/lib/articles'
import { getSiteSettings } from '@/lib/site-settings'
import ContactSection from '@/components/home/ContactSection'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const [article, settings] = await Promise.all([getArticleBySlug(slug), getSiteSettings()])
  if (!article) notFound()

  return (
    <>
      {/* Hero — image or plain navy banner */}
      {article.image ? (
        <div style={{ padding: '0 clamp(20px, 12vw, 220px)', background: 'var(--paper)' }}>
          <div style={{ position: 'relative', height: 'clamp(260px, 38vw, 500px)', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(11,47,87,0.10) 0%, rgba(11,47,87,0.75) 100%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, left: 0,
              padding: 'clamp(20px, 4vw, 48px) clamp(16px, 3vw, 40px)',
            }}>
              <h1 style={{
                fontFamily: 'var(--serif)', fontWeight: 700,
                fontSize: 'clamp(24px, 4vw, 50px)', color: '#fff',
                margin: 0, lineHeight: 1.25, letterSpacing: '-0.02em',
              }}>
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '80px clamp(20px, 12vw, 220px) 50px', background: 'var(--ink)' }}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontWeight: 700,
            fontSize: 'clamp(26px, 4vw, 52px)', color: '#fff',
            margin: 0, lineHeight: 1.25, letterSpacing: '-0.02em',
          }}>
            {article.title}
          </h1>
        </div>
      )}

      {/* Content */}
      <section style={{ padding: '60px clamp(20px, 12vw, 220px) 80px', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <Link href="/blog" style={{
            fontSize: 19, color: 'var(--ink-soft)', textDecoration: 'none',
            display: 'inline-block', marginBottom: 36,
          }}>
            ← חזרה לכל המאמרים
          </Link>

          {article.excerpt && (
            <p style={{
              fontSize: 22, fontWeight: 600, color: 'var(--ink-soft)',
              lineHeight: 1.7, marginBottom: 36,
              borderInlineStart: '3px solid var(--gold)', paddingInlineStart: 20,
            }}>
              {article.excerpt}
            </p>
          )}

          <div style={{ fontSize: 21, lineHeight: 1.95, color: 'var(--ink)', whiteSpace: 'pre-line' }}>
            {article.content}
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
