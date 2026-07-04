import type { Metadata } from 'next'
import Link from 'next/link'
import ContactSection from '@/components/home/ContactSection'
import { getSiteSettings } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: 'תחומי עיסוק',
  description: 'תחומי התמחות משרד עו"ד מיכל גלר-עבאדי: מקרקעין, דיני עסקים, משפחה, צוואות, ליטיגציה ועוד.',
}

export default async function ServicesPage() {
  const settings = await getSiteSettings()

  return (
    <>
      {/* Page banner */}
      <div style={{
        padding: '80px clamp(20px, 12vw, 220px)',
        background: 'var(--ink)',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {settings.services_page_eyebrow}
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 5vw, 58px)',
          color: '#fff',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          {settings.services_page_heading}
        </h1>
      </div>

      {/* Services list */}
      <section style={{
        padding: '80px clamp(20px, 12vw, 220px)',
        background: 'var(--paper)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {settings.services.map((s, i) => (
            <div key={s.id} className="svc-card" style={{
              background: 'var(--paper-cool)',
              padding: '32px 36px',
              borderInlineEnd: '3px solid var(--gold)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 22, letterSpacing: '0.1em', color: 'var(--gold)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  color: 'var(--ink)',
                  margin: 0,
                }}>
                  {s.t}
                </h2>
              </div>
              {s.desc && (
                <p className="svc-desc" style={{ fontSize: 26, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 20 }}>
                  {s.desc}
                </p>
              )}
              {s.items && s.items.length > 0 && (
                <ul className="svc-bullets" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '18px 24px',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {s.items.map((item, j) => (
                    <li key={j} className="svc-bullet-item" style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: 25,
                      color: 'var(--ink)',
                      lineHeight: 1.6,
                    }}>
                      {/* height = fontSize(25) × lineHeight(1.6) = 40px — centers ◆ on first text line */}
                      <span className="svc-bullet-dot" style={{
                        color: 'var(--gold)', flexShrink: 0, fontSize: 14,
                        display: 'flex', alignItems: 'center', height: 40,
                      }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 700px) {
            .svc-card { padding: 18px 16px !important; }
            .svc-desc { font-size: 18px !important; margin-bottom: 14px !important; }
            .svc-bullets { grid-template-columns: repeat(2, 1fr) !important; gap: 12px 12px !important; }
            .svc-bullet-item { font-size: 17px !important; gap: 7px !important; line-height: 1.5 !important; }
            .svc-bullet-dot { height: 26px !important; font-size: 11px !important; }
          }
          @media (max-width: 420px) {
            .svc-bullets { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
            .svc-bullet-item { font-size: 15px !important; }
          }
        `}</style>

        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <p style={{ fontSize: 26, color: 'var(--ink-soft)', marginBottom: 20 }}>
            {settings.services_page_footer_text}
          </p>
          <Link href="/#contact" style={{
            display: 'inline-block',
            background: 'var(--ink)',
            color: '#fff',
            padding: '14px 32px',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '0.03em',
            textDecoration: 'none',
            borderInlineStart: '2px solid var(--gold)',
            fontFamily: 'var(--sans)',
          }}>
            {settings.services_page_button_text}
          </Link>
        </div>
      </section>

      <ContactSection settings={settings} />
    </>
  )
}
