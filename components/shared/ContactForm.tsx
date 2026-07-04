'use client'
import { useState, useRef } from 'react'
import Script from 'next/script'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

interface Props {
  variant?: 'dark' | 'light'
}

// Cloudflare Turnstile site key — when set, a bot-verification widget is shown
// and its token is sent to /api/leads. When unset, the form works as before.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

const SUBJECTS = [
  'דיני מקרקעין',
  'דיני עסקים ומסחר',
  'דיני משפחה',
  'צוואות וירושות',
  'ליטיגציה אזרחית',
  'ייעוץ משפטי כללי',
]

export default function ContactForm({ variant = 'light' }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [consent, setConsent] = useState(false)
  const [token, setToken] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const widgetRef = useRef<HTMLDivElement>(null)

  function renderTurnstile() {
    const ts = (window as unknown as { turnstile?: { render: (el: HTMLElement, opts: object) => void } }).turnstile
    if (!TURNSTILE_SITE_KEY || !widgetRef.current || !ts) return
    ts.render(widgetRef.current, { sitekey: TURNSTILE_SITE_KEY, callback: (t: string) => setToken(t) })
  }

  const isDark = variant === 'dark'
  const labelCls = `text-sm font-medium mb-1 block ${isDark ? 'text-white/80' : ''}`
  const inputCls = `w-full px-4 py-2.5 border transition-colors focus:outline-none focus:ring-2 ${
    isDark
      ? 'bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:ring-white/30'
      : 'bg-white border-[color:var(--rule)] text-[color:var(--ink)] placeholder:text-[color:var(--ink-mute)] focus:ring-[color:var(--gold-soft)]'
  }`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrMsg('')
    if (!consent) { setStatus('error'); setErrMsg('יש לאשר את מדיניות הפרטיות כדי לשלוח.'); return }
    if (TURNSTILE_SITE_KEY && !token) { setStatus('error'); setErrMsg('יש להשלים את אימות האבטחה.'); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent, turnstileToken: token }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setConsent(false)
      setToken('')
    } catch {
      setStatus('error')
      setErrMsg('אירעה שגיאה. אנא נסה שוב או פנה טלפונית.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle2 size={48} className="text-green-400" />
        <h3 className={`text-xl font-serif font-bold ${isDark ? 'text-white' : ''}`} style={isDark ? {} : { color: 'var(--ink)' }}>
          תודה שפנית אלינו!
        </h3>
        <p className={`text-sm ${isDark ? 'text-white/60' : ''}`} style={isDark ? {} : { color: 'var(--ink-soft)' }}>
          קיבלנו את פנייתך ונחזור אליך בהקדם האפשרי.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 underline text-sm"
          style={{ color: 'var(--gold)' }}
        >
          שלח פנייה נוספת
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelCls}>שם מלא *</label>
          <input
            id="cf-name"
            type="text"
            required
            placeholder="ישראל ישראלי"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>טלפון</label>
          <input
            id="cf-phone"
            type="tel"
            placeholder="05X-XXXXXXX"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelCls}>דוא&quot;ל *</label>
        <input
          id="cf-email"
          type="email"
          required
          placeholder="name@example.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cf-subject" className={labelCls}>נושא</label>
        <select
          id="cf-subject"
          value={form.subject}
          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className={inputCls}
        >
          <option value="">בחר נושא...</option>
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>הודעה *</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          placeholder="תאר את עניינך בקצרה..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Privacy consent (A.8.12 / חוק הגנת הפרטיות) */}
      <label className={`flex items-start gap-2 text-sm ${isDark ? 'text-white/70' : ''}`} style={isDark ? {} : { color: 'var(--ink-soft)' }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          אני מאשר/ת את עיבוד הפרטים לצורך מענה לפנייתי בהתאם ל
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--gold)' }}> מדיניות הפרטיות</a>.
        </span>
      </label>

      {/* Cloudflare Turnstile bot verification — only when configured */}
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={renderTurnstile}
          />
          <div ref={widgetRef} />
        </>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          {errMsg || 'אירעה שגיאה. אנא נסה שוב או פנה טלפונית.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 disabled:opacity-60 text-white px-8 py-3 font-semibold transition-colors"
      style={{ background: 'var(--ink)', borderInlineStart: '2px solid var(--gold)' }}
      >
        {status === 'loading' ? (
          <span className="animate-pulse">שולח...</span>
        ) : (
          <>
            <Send size={16} />
            שלח פנייה
          </>
        )}
      </button>
    </form>
  )
}
