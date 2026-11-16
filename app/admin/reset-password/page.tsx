'use client'
import { Suspense, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

function ResetPasswordForm() {
  const params = useSearchParams()
  const tokenHash = params.get('token_hash') || ''

  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (pw.length < 8) {
      setError('הסיסמה חייבת להכיל לפחות 8 תווים')
      return
    }
    if (pw !== pw2) {
      setError('הסיסמאות אינן זהות')
      return
    }
    setLoading(true)
    const res = await fetch('/api/admin/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token_hash: tokenHash, password: pw }),
    })
    const data = await res.json().catch(() => ({}))
    setLoading(false)
    if (res.ok && data.ok) {
      setDone(true)
      return
    }
    if (data.error === 'invalid_token') {
      setError('הקישור פג תוקף או שכבר נעשה בו שימוש — בקשי קישור חדש מדף "שחזור סיסמה"')
      return
    }
    setError('האיפוס נכשל, נסי שוב')
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
          }}>🔒</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#35423a' }}>בחירת סיסמה חדשה</div>
          <div style={{ fontSize: 17, color: '#8aaa98', marginTop: 4 }}>פאנל ניהול האתר</div>
        </div>

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, color: '#35423a', lineHeight: 1.7 }}>
              הסיסמה עודכנה בהצלחה ✓
            </div>
            <a href="/admin/login" style={{
              display: 'inline-block', marginTop: 24, padding: '15px 36px',
              background: '#4d7c60', color: '#fff', borderRadius: 6,
              fontSize: 18, fontWeight: 600, textDecoration: 'none',
            }}>לכניסה עם הסיסמה החדשה ←</a>
          </div>
        ) : !tokenHash ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, color: '#c0392b', lineHeight: 1.7 }}>
              הקישור חסר או שגוי.
            </div>
            <a href="/admin/forgot-password" style={{
              display: 'inline-block', marginTop: 20, fontSize: 17,
              color: '#4d7c60', fontWeight: 600, textDecoration: 'none',
            }}>לבקשת קישור איפוס חדש</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#577066', marginBottom: 7 }}>סיסמה חדשה</label>
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="לפחות 8 תווים"
                required
                minLength={8}
                autoComplete="new-password"
                style={{ ...inputStyle, padding: '16px 50px 16px 17px', marginBottom: 0 }}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'הסתר סיסמה' : 'הצג סיסמה'}
                style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
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

            <label style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#577066', marginBottom: 7 }}>אימות סיסמה</label>
            <input
              type={showPw ? 'text' : 'password'}
              value={pw2}
              onChange={e => setPw2(e.target.value)}
              placeholder="הזיני שוב את הסיסמה"
              required
              minLength={8}
              autoComplete="new-password"
              style={{ ...inputStyle, marginBottom: 0 }}
            />

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
              {loading ? 'מעדכן...' : 'עדכון סיסמה →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ResetPassword() {
  // useSearchParams requires a Suspense boundary during prerender.
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
