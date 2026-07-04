import Link from 'next/link'
import type { SiteSettings } from '@/lib/site-settings'
import type { Article } from '@/lib/articles'

export default function WhyUsSection({ settings, articles }: { settings: SiteSettings; articles: Article[] }) {
  return (
    <section className="why-section" style={{
      padding: '80px clamp(20px, 12vw, 220px) 100px',
      background: 'var(--paper-cool)',
      borderTop: '1px solid var(--rule)',
    }}>
      {/* Section header */}
      <div className="why-header" style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        marginBottom: 40, flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {settings.blog_label}
          </span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(28px, 3.5vw, 38px)', margin: '14px 0 0',
            letterSpacing: '-0.02em', color: 'var(--ink)',
          }}>
            {settings.blog_heading}
          </h2>
          <p className="why-subtitle" style={{ maxWidth: 540, fontSize: 26, color: 'var(--ink-soft)', marginTop: 10, lineHeight: 1.75 }}>
            {settings.blog_subtitle}
          </p>
        </div>
        <Link href="/blog" className="why-articles-link-header" style={{
          fontSize: 25, color: 'var(--ink)',
          borderBottom: '1px solid var(--gold)',
          textDecoration: 'none', paddingBottom: 4, whiteSpace: 'nowrap',
        }}>
          כל המאמרים →
        </Link>
      </div>

      {/* Cards */}
      {articles.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="knowledge-grid">
          {articles.slice(0, 3).map((a, i) => (
            <article key={a.id} style={{
              background: 'var(--paper)', padding: '0',
              borderTop: '2px solid var(--gold)',
              display: 'flex', flexDirection: 'column',
              minHeight: 260, overflow: 'hidden',
            }}>
              {a.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.image} alt={a.title}
                  style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
              )}
              <div style={{ padding: '22px 22px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 20, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    מאמר
                  </span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 20, letterSpacing: '0.18em', color: 'var(--ink-mute)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 26, lineHeight: 1.4, color: 'var(--ink)', flex: 1 }}>
                  {a.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Link href={`/blog/${a.slug}`} style={{
                    color: 'var(--gold-deep)', borderBottom: '1px solid var(--gold)',
                    paddingBottom: 2, textDecoration: 'none', fontSize: 23, letterSpacing: '0.03em',
                  }}>
                    למאמר המלא →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--ink-mute)', fontSize: 25, padding: '40px 0' }}>
          מאמרים יתפרסמו בקרוב.
        </div>
      )}

      {/* "כל המאמרים" — mobile only (shown below cards) */}
      <div className="why-articles-mobile" style={{ textAlign: 'center', marginTop: 28 }}>
        <Link href="/blog" style={{
          display: 'inline-block',
          fontSize: 22, color: 'var(--ink)',
          borderBottom: '1px solid var(--gold)',
          textDecoration: 'none', paddingBottom: 4,
        }}>
          כל המאמרים →
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) { .knowledge-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) {
          .why-section { padding-top: 28px !important; padding-bottom: 36px !important; }
          .why-header { margin-bottom: 14px !important; }
        }
        @media (max-width: 580px) { .knowledge-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 581px) {
          .why-articles-mobile { display: none !important; }
        }
        @media (max-width: 580px) {
          .why-subtitle { display: none !important; }
          .why-articles-link-header { display: none !important; }
        }
      `}</style>
    </section>
  )
}
