'use client'

import { useState } from 'react'
import { T } from '../tokens'
import { Eyebrow } from '../Shared'
import { SiteHeader, SiteFooter } from '../Shared'
import { ScrollTopFab } from '../ScrollTopFab'

const CATEGORIES = ['M&A', 'גיוס הון', 'דיני עבודה', 'ליטיגציה', 'נדל״ן', 'אחר']

const inputStyle = {
  width: '100%', marginTop: 8, padding: '12px 0',
  background: 'transparent', border: 'none', borderBottom: `1px solid ${T.rule}`,
  fontFamily: T.sans, fontSize: 15, color: T.ink, outline: 'none', direction: 'rtl' as const,
}

export function ContactScreen() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', category: '', description: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans }}>
      <SiteHeader current="contact" />

      <section style={{ padding: '64px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <Eyebrow>Index · 06 — יצירת קשר</Eyebrow>
          <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 72, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '14px 0 0' }}>
            פגישה ראשונה,<br />
            <em style={{ color: T.goldDeep }}>בדיסקרטיות מלאה.</em>
          </h1>
          <p style={{ marginTop: 22, maxWidth: 460, fontSize: 16, lineHeight: 1.75, color: T.inkSoft }}>
            פגישת היכרות נמשכת כשעה ומתקיימת במשרדנו בתל אביב או באמצעות שיחה
            מאובטחת. השותף הרלוונטי לנושא ילווה את הפגישה אישית.
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              ['כתובת', 'מגדל אלרוב · רחוב ויצמן 2, קומה 32 · תל אביב 6423902'],
              ['טלפון', '03-720-1898'],
              ['דוא״ל', 'office@auerbach-yarden.co.il'],
              ['שעות', 'ימים א׳–ה׳ · 08:30–19:00'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24, alignItems: 'baseline', borderBottom: `1px solid ${T.rule}`, paddingBottom: 16 }}>
                <Eyebrow>{k}</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 18, color: T.ink }} dir={k === 'דוא״ל' || k === 'טלפון' ? 'ltr' : 'rtl'}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {status === 'ok' ? (
          <div style={{ background: T.paperCool, padding: 36, borderTop: `2px solid ${T.gold}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ fontFamily: T.serif, fontSize: 48, color: T.goldDeep }}>✓</div>
            <div style={{ fontFamily: T.serif, fontSize: 28, color: T.ink, textAlign: 'center' }}>תודה! קיבלנו את פנייתך.</div>
            <div style={{ fontSize: 15, color: T.inkSoft, textAlign: 'center', maxWidth: 360, lineHeight: 1.7 }}>
              נחזור אליך בתוך 24 שעות. אישור קבלה נשלח לכתובת המייל שציינת.
            </div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: T.paperCool, padding: 36, borderTop: `2px solid ${T.gold}` }}>
            <Eyebrow>בקשת ייעוץ ראשוני</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, margin: '10px 0 28px', letterSpacing: '-0.01em' }}>
              ספרו לנו במשפט מה הסוגיה.
            </h2>

            <div style={{ display: 'grid', gap: 18 }}>
              {([['שם מלא', 'name', 'text', true], ['חברה / תפקיד', 'company', 'text', false]] as const).map(([l, k, type, req]) => (
                <label key={l} style={{ display: 'block' }}>
                  <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
                  <input
                    required={req} type={type}
                    placeholder={l}
                    value={form[k as 'name' | 'company']}
                    onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                    style={inputStyle}
                  />
                </label>
              ))}

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>דוא״ל</span>
                <input required type="email" placeholder="name@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ ...inputStyle, direction: 'ltr' }} />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>טלפון</span>
                <input required type="tel" placeholder="050-0000000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} />
              </label>

              <label>
                <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>תחום הסוגיה</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {CATEGORIES.map(cat => (
                    <span key={cat} onClick={() => setForm(f => ({ ...f, category: cat }))} style={{
                      padding: '7px 14px', fontSize: 12, border: `1px solid ${T.rule}`, cursor: 'pointer',
                      background: form.category === cat ? T.ink : 'transparent',
                      color: form.category === cat ? T.paper : T.inkSoft,
                    }}>{cat}</span>
                  ))}
                </div>
              </label>

              <label>
                <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>תיאור הסוגיה</span>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="תארו בקצרה — מה הסיטואציה ומה צריך להתרחש הלאה..."
                  style={{
                    width: '100%', marginTop: 8, padding: 14, minHeight: 100,
                    background: T.paper, border: `1px solid ${T.rule}`,
                    fontFamily: T.sans, fontSize: 14, color: T.ink, outline: 'none', resize: 'none',
                    direction: 'rtl', lineHeight: 1.65,
                  }}
                />
              </label>

              <button type="submit" disabled={status === 'sending'} style={{
                marginTop: 8, background: T.ink, color: '#fff',
                padding: '16px 24px', fontSize: 13, letterSpacing: '0.06em',
                border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                borderInlineStart: `2px solid ${T.gold}`,
                fontFamily: T.sans, opacity: status === 'sending' ? 0.7 : 1,
              }}>{status === 'sending' ? 'שולח...' : 'שליחת בקשה · נחזור בתוך 24 שעות →'}</button>

              {status === 'err' && (
                <div style={{ fontSize: 12, color: '#c0392b' }}>אירעה שגיאה. אנא נסו שנית או פנו אלינו ישירות.</div>
              )}

              <div style={{ fontSize: 11, color: T.inkMute, lineHeight: 1.6 }}>
                שליחת הטופס אינה יוצרת יחסי עו״ד–לקוח. כל פנייה נשמרת בדיסקרטיות מלאה ומועברת לשותף הרלוונטי בלבד.
              </div>
            </div>
          </form>
        )}
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  )
}
