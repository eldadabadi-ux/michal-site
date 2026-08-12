'use client'
import { useState, type FormEvent } from 'react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [code, setCode] = useState('')
  const [needMfa, setNeedMfa] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pw, code: code || undefined }),
    })
    const data = await res.json().catch(() => ({}))
    setLoading(false)

    if (res.ok && data.ok) {
      window.location.href = '/admin/content' // full reload so middleware sees the session
      return
    }
    if (res.ok && data.enroll) {
      window.location.href = '/admin/mfa' // first login — set up two-factor
      return
    }
    if (res.ok && data.mfa) {
      setNeedMfa(true)
      setError('הזיני את הקוד מאפליקציית האימות')
      return
    }
    if (data.error === 'not authorized') {
      setError('החשבון אינו מורשה לניהול')
      return
    }
    setError(needMfa ? 'קוד שגוי, נסי שוב' : 'דוא״ל או סיסמה שגויים')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '16px 17px', fontSize: 19,
    border: '1.5px solid #dde5e1', borderRadius: 6,
    fontFamily: 'Heebo, sans-serif', direction: 'rtl',
    boxSizing: 'border-box', outline: 'none', marginBottom: 14,
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#35423a', fontFamily: 'Heebo, sans-serif', direction: 'rtl',
    }}>
      <div style={{
        background: '#fff', padding: '58px 53px', borderRadius: 12,
        width: '100%', maxWidth: 456, boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#eef5f1', border: '2px solid #4d7c60',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 19px', fontSize: 31,
          }}>⚖️</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#35423a' }}>פאנל ניהול</div>
          <div style={{ fontSize: 17, color: '#8aaa98', marginTop: 4 }}>עו״ד מיכל גלר-עבאדי</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#577066', marginBottom: 7 }}>דוא״ל</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="כתובת דוא״ל" required autoComplete="username" style={inputStyle} />

          <label style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#577066', marginBottom: 7 }}>סיסמה</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="הכניסי סיסמה"
              required
              autoComplete="current-password"
              style={{ ...inputStyle, padding: '16px 50px 16px 17px', marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              aria-label={showPw ? 'הסתר סיסמה' : 'הצג סיסמה'}
              style={{
                position: 'absolute', left: 14, top: '28px', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, display: 'flex', alignItems: 'center', color: '#8aaa98',
              }}
            >
              {showPw ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>

          {needMfa && (
            <>
              <label style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#577066', margin: '18px 0 7px' }}>קוד אימות דו-שלבי</label>
              <input
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric" placeholder="______" autoComplete="one-time-code"
                style={{ ...inputStyle, textAlign: 'center', letterSpacing: '0.5em', fontFamily: 'monospace', marginBottom: 0 }}
              />
            </>
          )}

          {error && <div style={{ fontSize: 16, color: '#c0392b', marginTop: 12 }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 22, width: '100%', padding: '17px',
              background: loading ? '#8aaa98' : '#4d7c60',
              color: '#fff', border: 'none', borderRadius: 6,
              fontSize: 19, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
              fontFamily: 'Heebo, sans-serif',
            }}
          >
            {loading ? 'מתחבר...' : needMfa ? 'אימות וכניסה →' : 'כניסה →'}
          </button>
        </form>
      </div>
    </div>
  )
}
