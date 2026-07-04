'use client'
import { useState, type FormEvent } from 'react'
import type { SiteSettings } from '@/lib/site-settings'

export default function ContactSection({ settings }: { settings: SiteSettings }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [form, setForm] = useState({ name: '', phone: '', email: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(r.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 13px',
    background: '#fff',
    border: '1.5px solid #dde5e1',
    borderRadius: 4,
    fontFamily: 'var(--sans)',
    fontSize: 24,
    color: 'var(--ink)',
    outline: 'none',
    direction: 'rtl',
    marginTop: 5,
    transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 20,
    color: 'var(--ink-soft)',
    fontWeight: 600,
    letterSpacing: '0.03em',
  }

  const phoneHref = `tel:${settings.contact_phone}`
  const emailHref = `mailto:${settings.contact_email}`

  return (
    <section id="contact" style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
      {/* Outer wrapper — dark bg with bottom padding so grid ends exactly at שעות row */}
      <div className="contact-dark-bg" style={{
        background: 'var(--ink)',
        padding: '63px clamp(20px, 12vw, 220px) 63px',
      }}>
        {/* Label — above the grid, full width */}
        <div className="contact-section-label-wrap" style={{ marginBottom: 24, textAlign: 'right' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 24, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-soft)' }}>
            {settings.contact_section_label}
          </span>
        </div>

        {/* Grid — both columns start at heading level, grid height = info column CONTENT height */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 72,
          alignItems: 'stretch',
        }} className="contact-outer-grid">

          {/* Info column — NO paddingBottom so grid height = content height = up to שעות */}
          <div>
            <h2 className="contact-heading" style={{
              fontFamily: 'var(--serif)',
              fontWeight: 700,
              fontSize: 'clamp(38px, 4vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: '0 0 20px',
              whiteSpace: 'pre-line',
            }}>
              {settings.contact_section_heading}
            </h2>

            <p className="contact-subtitle" style={{ fontSize: 29, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: 44, maxWidth: 380 }}>
              {settings.contact_section_subtitle}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {[
                { label: 'טלפון',  val: settings.contact_phone,   href: phoneHref,  ltr: true },
                { label: 'דוא״ל', val: settings.contact_email,   href: emailHref,   ltr: true },
                { label: 'כתובת', val: settings.contact_address,  href: undefined,   ltr: false },
                { label: 'שעות',  val: settings.contact_hours,    href: undefined,   ltr: false },
              ].map(({ label, val, href, ltr }) => (
                <div key={label} className="contact-info-row" style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 24,
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span style={{ fontSize: 29, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-soft)', minWidth: 70, fontWeight: 600 }}>
                    {label}
                  </span>
                  {href ? (
                    <a href={href} dir={ltr ? 'ltr' : undefined} style={{ fontSize: 29, color: '#fff', textDecoration: 'none' }}>
                      {val}
                    </a>
                  ) : (
                    <span dir={ltr ? 'ltr' : undefined} style={{ fontSize: 29, color: 'rgba(255,255,255,0.8)' }}>
                      {val}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form card — stretches to exactly the grid height = שעות row bottom */}
          <div className="contact-form-card" style={{
            background: '#fff',
            padding: '28px 26px',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
            borderRadius: '8px 8px 8px 8px',
            borderTop: '4px solid var(--gold)',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
            boxSizing: 'border-box',
          }}>
            <span style={{ fontSize: 24, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
              {settings.contact_form_card_title}
            </span>
            <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 24, margin: '8px 0 16px', color: 'var(--ink)' }}>
              {settings.contact_form_card_subtitle}
            </h3>

            {status === 'ok' ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: 44, color: 'var(--gold)', marginBottom: 16 }}>✓</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 26, marginBottom: 8, fontWeight: 700 }}>{settings.contact_form_success_title}</div>
                <div style={{ fontSize: 20, color: 'var(--ink-soft)' }}>{settings.contact_form_success_body}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-fields" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="contact-name-phone" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <label>
                    <span style={labelStyle}>שם מלא</span>
                    <input required placeholder={settings.contact_form_name_placeholder} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                  </label>
                  <label>
                    <span style={labelStyle}>טלפון</span>
                    <input placeholder={settings.contact_form_phone_placeholder} dir="ltr" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} />
                  </label>
                </div>

                <label>
                  <span style={labelStyle}>דוא״ל</span>
                  <input type="email" required placeholder={settings.contact_form_email_placeholder} dir="ltr" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
                </label>

                {status === 'err' && (
                  <p style={{ fontSize: 19, color: '#c0392b', margin: 0 }}>
                    שגיאה בשליחה — אנא נסו שנית או פנו בטלפון.
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'} style={{
                  marginTop: 12,
                  background: status === 'sending' ? 'var(--ink-mute)' : 'var(--gold)',
                  color: '#fff', padding: '13px 22px', fontSize: 24, fontWeight: 600,
                  letterSpacing: '0.03em', border: 'none', borderRadius: 4,
                  cursor: status === 'sending' ? 'default' : 'pointer',
                  fontFamily: 'var(--sans)', width: '100%',
                }}>
                  {status === 'sending' ? 'שולח...' : settings.contact_form_button}
                </button>

                <div style={{ marginTop: 'auto', paddingTop: 12, fontSize: 25, color: 'var(--ink-mute)', lineHeight: 1.65, textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                  {settings.contact_form_disclaimer}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-dark-bg { padding-top: 28px !important; padding-bottom: 28px !important; }
          .contact-outer-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .contact-form-card  { border-radius: 8px !important; padding: 20px 18px !important; }
          .contact-heading { font-size: 30px !important; margin-bottom: 10px !important; }
          .contact-section-label-wrap { margin-bottom: 10px !important; }
        }
        @media (max-width: 600px) {
          .contact-name-phone { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .contact-subtitle { display: none !important; }
          .contact-info-row { padding: 7px 0 !important; }
          .contact-info-row span, .contact-info-row a { font-size: 18px !important; }
          .contact-info-row > span:first-child { min-width: 54px !important; font-size: 14px !important; }
          .contact-form-fields { gap: 10px !important; }
          .contact-form-fields input { font-size: 17px !important; padding: 8px 10px !important; }
        }
      `}</style>
    </section>
  )
}
