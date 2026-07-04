import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/site-settings'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'אודות',
  description: 'הכירו את עו"ד מיכל גלר-עבאדי — ניסיון, השכלה וגישה מקצועית לכל תיק משפטי.',
}

export default async function AboutPage() {
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
            אודות המשרד
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
          עו&quot;ד מיכל גלר-עבאדי
        </h1>
      </div>

      {/* Main content */}
      <section style={{
        padding: '80px clamp(20px, 12vw, 220px)',
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72,
          alignItems: 'start',
          maxWidth: 1100,
          margin: '0 auto',
        }} className="about-inner-grid">
          {/* Portrait */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '3/4',
              maxHeight: 560,
              position: 'relative',
              overflow: 'hidden',
              background: settings.about_image
                ? 'transparent'
                : 'repeating-linear-gradient(135deg, #efe9d9 0 8px, #e6dec9 8px 16px)',
            }}>
              {settings.about_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.about_image}
                  alt="תמונת עורכת הדין"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--sans)', fontSize: 18, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#7a6e54',
                }}>
                  portrait · 3:4
                </div>
              )}
            </div>
            <div style={{
              position: 'absolute', bottom: -16, insetInlineStart: -16,
              width: 80, height: 80,
              borderBottom: '2px solid var(--gold)',
              borderInlineStart: '2px solid var(--gold)',
            }} />
          </div>

          {/* Bio */}
          <div>
            <div style={{ marginBottom: 22 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                קצת עלי
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--serif)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 38px)',
              color: 'var(--ink)',
              margin: '0 0 24px',
              letterSpacing: '-0.02em',
            }}>
              {settings.about_text1}
            </h2>

            <p style={{ fontSize: 26, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 16 }}>
              {settings.about_text2}
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36, marginTop: 24 }}>
              {settings.about_highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 26, color: 'var(--ink)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: 4, flexShrink: 0, fontSize: 19 }}>◆</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section style={{
        padding: '70px clamp(20px, 12vw, 220px)',
        background: 'var(--paper-cool)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          maxWidth: 1100,
          margin: '0 auto',
        }} className="edu-exp-grid">
          <div>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                השכלה
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {settings.education.map((e, i) => (
                <div key={i} style={{
                  borderInlineStart: '2px solid var(--gold)',
                  paddingInlineStart: 16,
                }}>
                  <p style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{e.degree}</p>
                  <p style={{ fontSize: 24, color: 'var(--ink-soft)' }}>{e.institution}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                ניסיון מקצועי
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {settings.experience.map((e, i) => (
                <div key={i} style={{
                  borderInlineStart: '2px solid var(--gold)',
                  paddingInlineStart: 16,
                }}>
                  <p style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{e.role}</p>
                  <p style={{ fontSize: 24, color: 'var(--ink-soft)' }}>{e.place}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{
        padding: '70px clamp(20px, 12vw, 220px)',
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              ערכי המשרד
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {settings.about_values.map((v, i) => (
              <div key={i} style={{
                background: 'var(--paper-cool)',
                padding: '20px 24px',
                borderInlineStart: '3px solid var(--gold)',
                fontSize: 26,
                color: 'var(--ink)',
                lineHeight: 1.6,
              }}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection settings={settings} />

      <style>{`
        @media (max-width: 768px) {
          .about-inner-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .edu-exp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  )
}
