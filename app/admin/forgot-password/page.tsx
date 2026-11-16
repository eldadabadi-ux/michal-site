'use client'
import { useState, type FormEvent } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setLoading(false)
    if (res.status === 429) {
      setError('יותר מדי בקשות — נסי שוב בעוד מספר דקות')
      return
    }
    if (!res.ok) {
      setError('שליחת המייל נכשלה, נסי שוב מאוחר יותר')
      return
    }
    setSent(true)
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
          }}>🔑</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#35423a' }}>שחזור סיסמה</div>
          <div style={{ fontSize: 17, color: '#8aaa98', marginTop: 4 }}>פאנל ניהול האתר</div>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, color: '#35423a', lineHeight: 1.7 }}>
              אם הכתובת רשומה כמנהלת באתר — נשלח אליה כעת מייל עם קישור לאיפוס הסיסמה.
              <br />בדקי גם את תיקיית הספאם.
            </div>
            <a href="/admin/login" style={{
              display: 'inline-block', marginTop: 24, fontSize: 17,
              color: '#4d7c60', fontWeight: 600, textDecoration: 'none',
            }}>← חזרה לכניסה</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ fontSize: 16, color: '#577066', lineHeight: 1.7, marginBottom: 20 }}>
              הזיני את כתובת הדוא״ל של חשבון הניהול, ונשלח אלייך קישור לבחירת סיסמה חדשה.
            </div>
            <label style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#577066', marginBottom: 7 }}>דוא״ל</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="כתובת דוא״ל" required autoComplete="username" style={inputStyle} />

            {error && <div style={{ fontSize: 16, color: '#c0392b', marginTop: 4 }}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 18, width: '100%', padding: '17px',
                background: loading ? '#8aaa98' : '#4d7c60',
                color: '#fff', border: 'none', borderRadius: 6,
                fontSize: 19, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
                fontFamily: 'Heebo, sans-serif',
              }}
            >
              {loading ? 'שולח...' : 'שליחת קישור איפוס →'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 18 }}>
              <a href="/admin/login" style={{ fontSize: 16, color: '#8aaa98', textDecoration: 'none' }}>חזרה לכניסה</a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
