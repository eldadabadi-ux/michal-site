import Link from 'next/link'
import type { SiteSettings } from '@/lib/site-settings'

export default function HeroSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="hero-grid" style={{
      padding: 'clamp(60px, 8vw, 90px) clamp(20px, 12vw, 220px) clamp(80px, 10vw, 110px)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.55fr)',
      gap: 48,
      alignItems: 'start',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper)',
    }}>
      {/* Left — text */}
      <div style={{ paddingTop: 5 }}>
        <div className="hero-label-wrap" style={{ marginBottom: 28 }}>
          <span className="hero-label" style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {settings.hero_label}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(48px, 6vw, 82px)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          margin: 0,
          color: 'var(--ink)',
          whiteSpace: 'pre-line',
        }}>
          {settings.hero_title}
        </h1>

        <p className="hero-subtitle hero-sub-wrap" style={{
          marginTop: 28,
          maxWidth: 520,
          fontSize: 21,
          lineHeight: 1.8,
          color: 'var(--ink-soft)',
        }}>
          {settings.hero_subtitle}
        </p>

        <div className="hero-cta-wrap" style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
          <Link href="/#contact" className="hero-cta-btn" style={{
            background: 'var(--ink)',
            color: '#fff',
            padding: '16px 26px',
            fontSize: 29,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderInlineStart: '2px solid var(--gold)',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            display: 'inline-block',
          }}>
            קביעת ייעוץ ראשוני ←
          </Link>
        </div>
      </div>

      {/* Right — portrait */}
      <div style={{ position: 'relative' }}>
        <div className="hero-img" style={{
          height: 520,
          position: 'relative',
          overflow: 'hidden',
          background: settings.hero_image ? 'transparent' : 'repeating-linear-gradient(135deg, #D9DDE3 0 8px, #c8d0da 8px 16px)',
        }}>
          {settings.hero_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.hero_image}
              alt="עורכת הדין מיכל"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--sans)', fontSize: 20, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--ink-mute)',
            }}>
              תמונת עורכת הדין · 3:4
            </div>
          )}
        </div>

        {settings.hero_card_show && (
          <div className="hero-card" style={{
            position: 'absolute',
            bottom: 24,
            insetInlineStart: -28,
            background: 'var(--paper)',
            padding: '18px 22px',
            maxWidth: 260,
            boxShadow: 'var(--shadow-md)',
            borderInlineStart: '2px solid var(--gold)',
          }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {settings.hero_card_title}
            </span>
            <div style={{ marginTop: 8, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              {settings.hero_card_text}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 14px !important;
            padding-top: 20px !important; padding-bottom: 26px !important; }
          .hero-img  { height: 280px !important; }
          .hero-label-wrap { margin-bottom: 12px !important; }
          .hero-sub-wrap { margin-top: 14px !important; }
          .hero-cta-wrap { margin-top: 20px !important; }
          .hero-cta  { width: 100% !important; text-align: center !important; justify-content: center !important; }
          .hero-card {
            position: static !important;
            margin-top: 8px !important;
            max-width: 100% !important;
            padding: 10px 14px !important;
          }
          .hero-card span { font-size: 14px !important; line-height: 1.4 !important; }
          .hero-card div  { font-size: 13px !important; margin-top: 4px !important; line-height: 1.55 !important; }
          .hero-label { font-size: 16px !important; }
          .hero-subtitle { font-size: 17px !important; }
          .hero-cta-btn { font-size: 20px !important; padding: 13px 20px !important; }
        }
        @media (max-width: 480px) {
          .hero-img  { height: 240px !important; }
          .hero-cta-btn { font-size: 18px !important; width: 100% !important; text-align: center !important; display: block !important; }
        }
      `}</style>
    </section>
  )
}
