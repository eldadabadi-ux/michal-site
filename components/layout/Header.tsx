'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV = [
  { label: 'ראשי',          href: '/' },
  { label: 'אודות',          href: '/about' },
  { label: 'תחומי עיסוק',   href: '/services' },
  { label: 'מאמרים',         href: '/blog' },
  { label: 'יצירת קשר',     href: '/#contact' },
]

export default function Header({ logoImage }: { logoImage?: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <div className="fixed top-0 right-0 left-0 z-50" style={{ fontFamily: 'var(--sans)' }}>
      {/* ── Main header ── */}
      <header className="header-inner" style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
        padding: 'clamp(16px, 2vw, 24px) clamp(20px, 12vw, 220px)',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        transition: 'box-shadow 0.2s',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}>
        {/* Wordmark */}
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0, transform: 'translateX(-20px)' }}>
          {logoImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoImage}
              alt="לוגו"
              className="header-logo-img"
              style={{
                height: 'clamp(90px, 9.5vw, 118px)',
                width: 'auto',
                maxWidth: 360,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          ) : (
            <div className="header-logo-fallback" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="header-logo-circle" style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--gold-soft)',
                border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, overflow: 'hidden',
              }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div>
                <div className="header-logo-name" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.8vw, 26px)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                  מיכל גלר-עבאדי
                </div>
                <div className="header-logo-sub" style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(11px, 1vw, 15px)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 3 }}>
                  עורכת דין · LAW OFFICE
                </div>
              </div>
            </div>
          )}
        </Link>

        {/* Desktop nav — centered, shown at lg+ (1024px+) */}
        <nav className="hidden lg:flex" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 'clamp(64px, 5vw, 96px)' }}>
          {NAV.slice(0, -1).map(it => {
            const active = pathname === it.href || (it.href !== '/' && pathname.startsWith(it.href))
            return (
              <Link key={it.href} href={it.href}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                style={{
                fontSize: 'clamp(20px, 2.2vw, 38px)',
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--ink)' : 'var(--ink-soft)',
                textDecoration: 'none',
                paddingBottom: 6,
                borderBottom: active ? '3px solid var(--gold)' : '3px solid transparent',
                transition: 'color 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
              }}>
                {it.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA + Burger — grouped together, pushed to inline-end (left in RTL) */}
        <div className="header-end-group">
          <Link href="/#contact" className="header-cta" style={{
            background: 'var(--gold)',
            color: '#fff',
            padding: 'clamp(10px, 1.2vw, 16px) clamp(18px, 2vw, 30px)',
            fontSize: 'clamp(16px, 1.4vw, 22px)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            textDecoration: 'none',
            borderRadius: 4,
            transition: 'background 0.15s',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
          }}>
            צור קשר
          </Link>

          {/* Burger — shown below lg */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex', alignItems: 'center', padding: 4 }}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <style>{`
        .header-end-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-inline-start: auto;
        }
        @media (max-width: 1023px) {
          .header-inner { padding-inline: 14px !important; }
          .header-cta { padding: 8px 12px !important; font-size: 14px !important; }
          .header-logo-img { height: 67px !important; }
          .header-logo-fallback { gap: 8px !important; }
          .header-logo-circle { width: 50px !important; height: 50px !important; }
          .header-logo-name { font-size: 18px !important; }
          .header-logo-sub { display: none !important; }
        }
      `}</style>

      {/* Mobile/tablet drawer */}
      {open && (
        <div style={{
          background: 'var(--paper)',
          borderBottom: '1px solid var(--rule)',
          padding: '20px 28px 28px',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {NAV.map(it => (
              <Link key={it.href} href={it.href}
                onClick={it.href.includes('#') ? undefined : () => window.scrollTo({ top: 0, behavior: 'instant' })}
                style={{
                fontSize: 26,
                color: pathname === it.href ? 'var(--gold-deep)' : 'var(--ink)',
                textDecoration: 'none',
                padding: '18px 0',
                borderBottom: '1px solid var(--rule)',
                fontWeight: pathname === it.href ? 700 : 400,
              }}>
                {it.label}
              </Link>
            ))}
          </nav>
          <Link href="/#contact" style={{
            display: 'block', marginTop: 24,
            background: 'var(--gold)', color: '#fff',
            padding: '20px 24px', textAlign: 'center',
            textDecoration: 'none', fontSize: 22, fontWeight: 700,
            borderRadius: 4,
          }}>
            צור קשר
          </Link>
        </div>
      )}
    </div>
  )
}
