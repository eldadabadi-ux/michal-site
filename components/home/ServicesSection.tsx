'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import type { SiteSettings } from '@/lib/site-settings'

/* ── Built-in SVG icons (fallback when no custom SVG uploaded) ── */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  '01': (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  ),
  '02': (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  '03': (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  '04': (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M5 6l7-3 7 3"/>
      <path d="M5 6l3 9c.5 1 1.5 2 4 2s3.5-1 4-2l3-9"/>
      <path d="M3 21h18"/>
    </svg>
  ),
  '05': (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  '06': (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
}

/* ── Animation variants (propagate to children automatically) ── */
const transition = { duration: 0.5, ease: 'easeOut' as const }

const cardV = {
  idle:  { boxShadow: '0 4px 24px rgba(11,47,87,0.07)' },
  hover: { boxShadow: '0 16px 48px rgba(11,47,87,0.18)', transition: { duration: 0.3 } },
}
const iconV = {
  idle:  { scale: 1,    filter: 'drop-shadow(0 2px 8px rgba(201,179,126,0.18))' },
  hover: { scale: 1.25, filter: 'drop-shadow(0 4px 16px rgba(201,179,126,0.38))', transition },
}
const contentV = {
  idle:  { y: 0 },
  hover: { y: -22, transition },
}
const revealV = {
  idle:  { opacity: 0, y: 14 },
  hover: { opacity: 1, y: 0, transition: { ...transition, delay: 0.08 } },
}
const arrowV = {
  idle:  { x: 0 },
  hover: { x: -5, transition: { duration: 0.3 } },
}

export default function ServicesSection({ settings }: { settings: SiteSettings }) {
  const router = useRouter()
  return (
    <section className="services-section" style={{
      padding: '90px clamp(20px, 12vw, 220px) 70px',
      background: 'var(--paper)',
      borderTop: '1px solid var(--rule)',
    }}>
      {/* Section header */}
      <div className="services-header" style={{ textAlign: 'right', marginBottom: 52 }}>
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {settings.services_label}
          </span>
        </div>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(32px, 4vw, 44px)',
          margin: '0 0 10px',
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
        }}>
          {settings.services_heading}
        </h2>
        <p style={{ maxWidth: 560, fontSize: 26, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
          {settings.services_subtitle}
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }} className="services-grid">
        {settings.services.map(s => (
          <motion.article
            key={s.id}
            dir="rtl"
            initial="idle"
            whileHover="hover"
            variants={cardV}
            onClick={() => router.push('/services')}
            style={{
              height: 380,
              background: 'linear-gradient(135deg, rgba(217,221,227,0.05) 0%, rgba(11,47,87,0.03) 100%), #fff',
              borderRadius: 16,
              border: '1px solid var(--rule)',
              borderBottom: '4px solid var(--ink)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '32px 28px 24px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            {/* Icon */}
            <motion.div variants={iconV} style={{ color: 'var(--gold)', display: 'flex', marginBottom: 36, flexShrink: 0 }}>
              {s.icon_svg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.icon_svg}
                  alt={s.t}
                  style={{ width: 70, height: 70, objectFit: 'contain', display: 'block' }}
                />
              ) : (
                SERVICE_ICONS[s.id] ?? SERVICE_ICONS['01']
              )}
            </motion.div>

            {/* Category label + Title (slide up on hover) */}
            <motion.div variants={contentV} style={{ textAlign: 'center', width: '100%' }}>
              <span className="services-sub" style={{
                fontFamily: 'var(--sans)',
                fontSize: 18,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--ink-soft)',
                display: 'block',
                marginBottom: 10,
              }}>
                {s.sub}
              </span>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(24px, 2.4vw, 32px)',
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.25,
              }}>
                {s.t}
              </h3>
            </motion.div>

            {/* Description + Read more (revealed on hover) */}
            <motion.div
              className="services-reveal"
              variants={revealV}
              style={{
                textAlign: 'center',
                width: '100%',
                marginTop: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: 22,
                fontWeight: 500,
                color: 'var(--ink-soft)',
                lineHeight: 1.7,
                margin: 0,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
              }}>
                {s.desc || s.sub}
              </p>

              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 18,
                  fontWeight: 800,
                  color: 'var(--ink)',
                  letterSpacing: '0.08em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                קרא עוד
                <motion.span variants={arrowV} style={{ display: 'inline-block' }}>←</motion.span>
              </span>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* Footer link */}
      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <Link href="/services" style={{
          display: 'inline-block',
          fontSize: 24,
          color: 'var(--gold-deep)',
          borderBottom: '1px solid var(--gold)',
          paddingBottom: 4,
          textDecoration: 'none',
          letterSpacing: '0.03em',
        }}>
          לכל תחומי העיסוק →
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .services-section { padding-top: 28px !important; padding-bottom: 24px !important; }
          .services-header { margin-bottom: 18px !important; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .services-grid article { height: auto !important; min-height: 160px !important; padding: 20px 12px 16px !important; justify-content: flex-start !important; align-items: center !important; border-radius: 12px !important; }
          .services-grid article > div:first-child { margin-bottom: 14px !important; }
          .services-grid article svg,
          .services-grid article img { width: 48px !important; height: 48px !important; }
          .services-reveal { display: none !important; }
          .services-sub { display: none !important; }
        }
      `}</style>
    </section>
  )
}
