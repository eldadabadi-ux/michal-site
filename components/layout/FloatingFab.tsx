'use client'
import { useEffect, useState } from 'react'

export default function FloatingFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const fabBase: React.CSSProperties = {
    width: 52, height: 52, borderRadius: '50%',
    border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(61,52,43,0.18)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  }

  return (
    <>
      <div style={{
        position: 'fixed',
        insetInlineEnd: 24,
        bottom: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 40,
        alignItems: 'center',
      }}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/972507771484"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="שלחו הודעת וואטסאפ"
          style={{ ...fabBase, background: '#25D366', color: '#fff', textDecoration: 'none' }}
        >
          <WhatsAppIcon />
        </a>

        {/* Phone */}
        <a
          href="tel:+972507771484"
          aria-label="חיוג ישיר"
          style={{ ...fabBase, background: 'var(--paper)', border: '1px solid var(--gold)', textDecoration: 'none' }}
        >
          <PhoneIcon />
        </a>

        {/* Scroll to top — desktop only */}
        {visible && (
          <button
            className="fab-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="גלילה למעלה"
            style={{
              ...fabBase,
              width: 46, height: 46,
              background: 'var(--paper)',
              color: 'var(--gold-deep)',
              border: '1px solid var(--gold)',
            }}
          >
            <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="var(--gold-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        )}

        {/* Accessibility — mobile only (replaces scroll-to-top) */}
        <button
          className="fab-a11y"
          onClick={() => window.dispatchEvent(new Event('open-accessibility-widget'))}
          aria-label="תפריט נגישות"
          style={{
            ...fabBase,
            background: 'var(--ink)',
            color: 'var(--gold)',
            border: '1px solid var(--gold)',
          }}
        >
          <span style={{ fontSize: 26, lineHeight: 1 }}>&#9855;</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px)  { .fab-scroll-top { display: none !important; } }
        @media (min-width: 769px)  { .fab-a11y      { display: none !important; } }
      `}</style>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="#fff">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.3 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.3 2.2 3.3 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="var(--gold-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 12.66a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
