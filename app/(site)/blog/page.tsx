import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/articles'
import { getSiteSettings } from '@/lib/site-settings'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'מאמרים',
  description: 'מאמרים משפטיים ממוקדים, כתובים בשפה פשוטה וברורה.',
}

export default async function BlogPage() {
  const [articles, settings] = await Promise.all([getArticles(), getSiteSettings()])

  return (
    <>
      {/* Banner */}
      <div style={{ padding: '80px clamp(20px, 12vw, 220px)', background: 'var(--ink)', textAlign: 'center' }}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 20, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {settings.blog_label}
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--serif)', fontWeight: 700,
          fontSize: 'clamp(36px, 5vw, 58px)', color: '#fff',
          margin: '0 0 16px', letterSpacing: '-0.02em',
        }}>
          {settings.blog_heading}
        </h1>
        <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto' }}>
          {settings.blog_subtitle}
        </p>
      </div>

      {/* Articles */}
      <section style={{ padding: '70px clamp(20px, 12vw, 220px)', background: 'var(--paper)', minHeight: 400 }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--ink-mute)', fontSize: 22, padding: '60px 0' }}>
            אין מאמרים עדיין — הוסף מאמרים דרך מערכת האדמין.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 28, maxWidth: 1100, margin: '0 auto',
          }}>
            {articles.map(a => (
              <article key={a.id} style={{
                background: 'var(--paper-cool)',
                borderTop: '2px solid var(--gold)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}>
                {a.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.image} alt={a.title}
                    style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                )}
                <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  <h2 style={{
                    fontFamily: 'var(--serif)', fontSize: 22,
                    fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.4,
                  }}>
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.75, margin: 0 }}>
                      {a.excerpt}
                    </p>
                  )}
                  <Link href={`/blog/${a.slug}`} style={{
                    marginTop: 'auto', paddingTop: 12,
                    fontSize: 19, color: 'var(--gold-deep)',
                    borderBottom: '1px solid var(--gold)', paddingBottom: 2,
                    textDecoration: 'none', alignSelf: 'flex-start',
                  }}>
                    למאמר המלא →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
