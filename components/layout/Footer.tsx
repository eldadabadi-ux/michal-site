'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { SiteSettings } from '@/lib/site-settings'

type ModalType = 'privacy' | 'accessibility' | 'terms' | null

function WhatsAppFooterIcon() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.3 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.3 2.2 3.3 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  )
}

function renderText(text: string) {
  return text.split('\n').flatMap((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    const nodes = parts.map((part, j) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={j}>{part.slice(2, -2)}</strong>
        : part
    )
    return i < arr.length - 1 ? [...nodes, <br key={`br${i}`} />] : nodes
  })
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{
        position: 'relative', background: '#fff', width: '100%', maxWidth: 720,
        maxHeight: '80vh', borderRadius: 12, fontFamily: 'var(--sans)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Header — always visible, never scrolls */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 32px', borderBottom: '1px solid var(--rule)', flexShrink: 0,
        }}>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 26, color: 'var(--ink)', margin: 0 }}>{title}</h2>
          <button onClick={onClose} aria-label="סגור" style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--ink-mute)', lineHeight: 1, padding: 4 }}>✕</button>
        </div>
        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', padding: '28px 32px 40px', color: 'var(--ink-soft)', lineHeight: 1.85, fontSize: 17 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function phoneToWaUrl(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? '972' + digits.slice(1) : digits
  return `https://wa.me/${intl}`
}

export default function Footer({ settings }: { settings: SiteSettings }) {
  const [modal, setModal] = useState<ModalType>(null)
  const waUrl = settings.footer_whatsapp || phoneToWaUrl(settings.contact_phone)

  useEffect(() => {
    const handler = () => setModal('accessibility')
    window.addEventListener('open-accessibility-statement', handler)
    return () => window.removeEventListener('open-accessibility-statement', handler)
  }, [])

  return (
    <>
      <footer className="site-footer" style={{
        background: 'var(--ink)',
        color: '#e9e1cc',
        padding: '56px clamp(20px, 12vw, 220px) 28px',
        fontFamily: 'var(--sans)',
        fontSize: 26,
        lineHeight: 1.8,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}
             className="footer-grid">
          {/* Brand */}
          <div className="footer-brand-col">
            <div className="footer-brand-name" style={{ fontFamily: 'var(--sans)', fontSize: 36, fontWeight: 700, marginBottom: 8 }}>{settings.footer_brand_name}</div>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,217,182,0.6)' }}>
              {settings.footer_tagline_en}
            </span>
            <p style={{ marginTop: 16, fontSize: 26, color: 'rgba(233,225,204,0.65)', maxWidth: 320, lineHeight: 1.75 }}>
              {settings.office_description}
            </p>
          </div>

          {/* Practice areas */}
          <div>
            <div className="footer-col-header" style={{ color: 'var(--gold-soft)', marginBottom: 16, fontWeight: 700, fontSize: 27 }}>תחומי עיסוק</div>
            {settings.services.map(s => (
              <div key={s.id} className="footer-col-item" style={{ color: 'rgba(233,225,204,0.72)', marginBottom: 6, fontSize: 26 }}>{s.t}</div>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-header" style={{ color: 'var(--gold-soft)', marginBottom: 16, fontWeight: 700, fontSize: 27 }}>ניווט מהיר</div>
            {[
              { label: 'ראשי', href: '/' },
              { label: 'אודות המשרד', href: '/about' },
              { label: 'תחומי עיסוק', href: '/services' },
              { label: 'מאמרים', href: '/blog' },
              { label: 'יצירת קשר', href: '/#contact' },
            ].map(l => (
              <div key={l.href}>
                <Link href={l.href} className="footer-col-item" style={{ color: 'rgba(233,225,204,0.72)', textDecoration: 'none', display: 'block', marginBottom: 6, fontSize: 26 }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="footer-contact-col">
            <div className="footer-col-header" style={{ color: 'var(--gold-soft)', marginBottom: 16, fontWeight: 700, fontSize: 27 }}>צרו קשר</div>
            <div className="footer-col-item" style={{ color: 'rgba(233,225,204,0.72)', marginBottom: 6, fontSize: 26, textAlign: 'right' }}>{settings.contact_address}</div>
            <a href={`tel:${settings.contact_phone}`} dir="ltr" className="footer-col-item" style={{ color: 'rgba(233,225,204,0.72)', display: 'block', textDecoration: 'none', marginBottom: 6, fontSize: 26, textAlign: 'right' }}>{settings.contact_phone}</a>
            <a href={`mailto:${settings.contact_email}`} dir="ltr" className="footer-col-item" style={{ color: 'rgba(233,225,204,0.72)', display: 'block', textDecoration: 'none', marginBottom: 10, fontSize: 26, textAlign: 'right' }}>{settings.contact_email}</a>
            <div className="footer-col-item" style={{ color: 'rgba(233,225,204,0.5)', fontSize: 24, textAlign: 'right' }}>{settings.contact_hours}</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 16, justifyContent: 'flex-start' }}>
              {settings.footer_facebook ? (
                <a href={settings.footer_facebook} target="_blank" rel="noopener noreferrer"
                   aria-label="Facebook"
                   style={{
                     color: 'rgba(233,225,204,0.82)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     width: 44, height: 44,
                     border: '1px solid rgba(210,218,224,0.38)',
                     borderRadius: 8,
                     transition: 'color 0.15s, border-color 0.15s',
                     flexShrink: 0,
                   }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              ) : (
                <span aria-label="Facebook" style={{
                  color: 'rgba(233,225,204,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  border: '1px solid rgba(210,218,224,0.15)',
                  borderRadius: 8,
                  cursor: 'default',
                  flexShrink: 0,
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </span>
              )}
              {settings.footer_linkedin ? (
                <a href={settings.footer_linkedin} target="_blank" rel="noopener noreferrer"
                   aria-label="LinkedIn"
                   style={{
                     color: 'rgba(233,225,204,0.82)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     width: 44, height: 44,
                     border: '1px solid rgba(210,218,224,0.38)',
                     borderRadius: 8,
                     transition: 'color 0.15s, border-color 0.15s',
                     flexShrink: 0,
                   }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              ) : (
                <span aria-label="LinkedIn" style={{
                  color: 'rgba(233,225,204,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  border: '1px solid rgba(210,218,224,0.15)',
                  borderRadius: 8,
                  cursor: 'default',
                  flexShrink: 0,
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
              )}
              {/* WhatsApp — exact visual copy of the floating FAB */}
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                 aria-label="שלחו הודעת וואטסאפ"
                 style={{
                   background: '#25D366',
                   color: '#fff',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   width: 44, height: 44,
                   borderRadius: '50%',
                   textDecoration: 'none',
                   flexShrink: 0,
                   boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                 }}>
                <WhatsAppFooterIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar" style={{
          borderTop: '1px solid rgba(232,217,182,0.12)',
          paddingTop: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'rgba(233,225,204,0.6)',
          fontSize: 26,
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span>{settings.footer_copyright_line.replace('{year}', String(new Date().getFullYear()))}</span>
          <span style={{ display: 'flex', gap: 24 }}>
            <button onClick={() => setModal('privacy')} style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>פרטיות</button>
            <button onClick={() => setModal('accessibility')} style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>נגישות</button>
            <button onClick={() => setModal('terms')} style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>תקנון</button>
            <button onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>עוגיות</button>
          </span>
        </div>
      <style>{`
        @media (max-width: 768px) {
          .site-footer { padding-top: 28px !important; padding-bottom: 16px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 18px !important; margin-bottom: 22px !important; }
          .footer-brand-name { font-size: 24px !important; }
          .footer-col-header { font-size: 20px !important; }
          .footer-col-item, .footer-col-item a { font-size: 18px !important; }
          .footer-bottom-bar { font-size: 18px !important; }
        }
        @media (max-width: 480px) {
          .site-footer { padding-top: 22px !important; }
          /* Brand (right) + contact (left) span full width; תחומי + ניווט share a row */
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 14px 10px !important; }
          .footer-brand-col   { grid-column: 1 / -1 !important; }
          .footer-contact-col { grid-column: 1 / -1 !important; }
          .footer-brand-name { font-size: 22px !important; }
          .footer-col-header { font-size: 18px !important; }
          .footer-col-item, .footer-col-item a { font-size: 16px !important; }
          .footer-bottom-bar { font-size: 16px !important; }
        }
      `}</style>
      </footer>

      {/* Privacy Modal */}
      <Modal open={modal === 'privacy'} onClose={() => setModal(null)} title="מדיניות פרטיות">
        <p>{renderText(settings.privacy_text)}</p>
      </Modal>

      {/* Accessibility Modal */}
      <Modal open={modal === 'accessibility'} onClose={() => setModal(null)} title="הצהרת נגישות">
        <p>{renderText(settings.accessibility_text)}</p>
      </Modal>

      {/* Terms Modal */}
      <Modal open={modal === 'terms'} onClose={() => setModal(null)} title="תקנון האתר">
        <p>{renderText(settings.terms_text)}</p>
      </Modal>
    </>
  )
}
