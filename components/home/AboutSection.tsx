import Link from 'next/link'
import type { SiteSettings } from '@/lib/site-settings'

export default function AboutSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="about-section" style={{
      padding: '90px clamp(20px, 12vw, 220px)',
      background: 'var(--paper-cool)',
      borderTop: '1px solid var(--rule)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        alignItems: 'start',
      }} className="about-grid">
        {/* Portrait */}
        <div style={{ position: 'relative', paddingTop: 18 }}>
          <div style={{
            background: settings.about_image ? 'transparent' : 'repeating-linear-gradient(135deg, #efe9d9 0 8px, #e6dec9 8px 16px)',
            aspectRatio: '4/5',
            maxHeight: 680,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {settings.about_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.about_image}
                alt="תמונת המשרד"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--sans)', fontSize: 18, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#7a6e54',
              }}>
                portrait · 4:5
              </div>
            )}
          </div>
          <div className="about-gold-corner" style={{
            position: 'absolute', bottom: -16, insetInlineEnd: -16,
            width: 80, height: 80,
            borderBottom: '2px solid var(--gold)',
            borderInlineEnd: '2px solid var(--gold)',
          }} />
        </div>

        {/* Text */}
        <div>
          <div style={{ marginBottom: 22 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {settings.about_section_label}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 46px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 24px',
            whiteSpace: 'pre-line',
          }}>
            {settings.about_section_heading}
          </h2>

          <p style={{ fontSize: 26, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 16 }}>
            {settings.about_text1}
          </p>
          <p style={{ fontSize: 26, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 32 }}>
            {settings.about_text2}
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {settings.about_highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 26, color: 'var(--ink)' }}>
                <span style={{ color: 'var(--gold)', marginTop: 3, flexShrink: 0, fontSize: 19 }}>◆</span>
                {h}
              </li>
            ))}
          </ul>

          <Link href="/about" style={{
            display: 'inline-block',
            background: 'var(--ink)',
            color: '#fff',
            padding: '14px 24px',
            fontSize: 25,
            fontWeight: 600,
            letterSpacing: '0.03em',
            textDecoration: 'none',
            borderInlineStart: '2px solid var(--gold)',
          }}>
            קראו עוד אודות המשרד ←
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-section { padding-top: 30px !important; padding-bottom: 30px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .about-gold-corner { display: none !important; }
        }
      `}</style>
    </section>
  )
}
