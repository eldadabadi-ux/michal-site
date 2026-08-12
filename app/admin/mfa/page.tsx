'use client'
import { useEffect, useRef, useState, type FormEvent } from 'react'

/**
 * /admin/mfa — one-time TOTP enrolment for the admin panel.
 *
 * Reachable only with a signed-in (aal1) session; the proxy pins any non-aal2
 * admin session here. All Supabase work happens in /api/admin/mfa/* so this
 * page needs no browser-side session. Every failure path ends in a visible
 * message — the screen must never sit on the loading state.
 */
/** POST that always settles: a stalled network aborts instead of spinning. */
async function postJson(url: string, body?: unknown, timeoutMs = 15000) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, {
      method: 'POST',
      signal: ctrl.signal,
      ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
    })
  } finally {
    clearTimeout(timer)
  }
}

export default function AdminMfa() {
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState('')
  const [factorId, setFactorId] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [fatal, setFatal] = useState('')
  const [loading, setLoading] = useState(false)
  const [preparing, setPreparing] = useState(true)
  const started = useRef(false)

  async function prepare() {
    setPreparing(true)
    setFatal('')
    setError('')
    try {
      const res = await postJson('/api/admin/mfa/enroll')

      if (res.status === 401) {
        window.location.href = '/admin/login'
        return
      }

      const data = await res.json().catch(() => ({}))

      if (data.alreadyEnrolled) {
        window.location.href = '/admin/content'
        return
      }
      if (!res.ok || !data.qr) {
        setFatal('לא הצלחנו ליצור את קוד האימות. נסי שוב, ואם זה חוזר — פני לאלדד.')
        setPreparing(false)
        return
      }

      setFactorId(data.factorId)
      setQr(data.qr)
      setSecret(data.secret)
    } catch {
      setFatal('אין חיבור לשרת. בדקי את החיבור לאינטרנט ונסי שוב.')
    } finally {
      setPreparing(false)
    }
  }

  useEffect(() => {
    if (started.current) return // React StrictMode mounts effects twice in dev
    started.current = true
    prepare()
  }, [])

  async function handleVerify(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await postJson('/api/admin/mfa/verify', { factorId, code })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        // Full reload so the proxy re-reads the upgraded (aal2) session cookie.
        window.location.href = '/admin/content'
        return
      }
      if (data.error === 'invalid_code') {
        setError('הקוד שגוי או פג תוקף. הזיני את הקוד המעודכן מהאפליקציה.')
      } else {
        setError('האימות נכשל. נסי שוב.')
      }
      setCode('')
    } catch {
      setError('אין חיבור לשרת. נסי שוב.')
    } finally {
      setLoading(false)
    }
  }

  const card: React.CSSProperties = {
    background: '#fff', padding: '48px 44px', borderRadius: 12,
    width: '100%', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  }
  const step: React.CSSProperties = {
    fontSize: 17, color: '#577066', lineHeight: 1.7, marginBottom: 18,
  }
  const btn: React.CSSProperties = {
    marginTop: 22, width: '100%', padding: '17px',
    color: '#fff', border: 'none', borderRadius: 6,
    fontSize: 19, fontWeight: 600, fontFamily: 'Heebo, sans-serif',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#35423a', fontFamily: 'Heebo, sans-serif', direction: 'rtl', padding: '32px 16px',
    }}>
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#eef5f1', border: '2px solid #4d7c60',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 19px', fontSize: 31,
          }}>🔐</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#35423a' }}>הגדרת אימות דו־שלבי</div>
          <div style={{ fontSize: 17, color: '#8aaa98', marginTop: 4 }}>הגדרה חד־פעמית לאבטחת פאנל הניהול</div>
        </div>

        {preparing ? (
          <div style={{ ...step, textAlign: 'center' }}>רגע, מכינים את קוד האימות…</div>
        ) : fatal ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, color: '#c0392b', lineHeight: 1.7 }}>{fatal}</div>
            <button onClick={prepare} style={{ ...btn, background: '#4d7c60', cursor: 'pointer' }}>
              נסי שוב
            </button>
          </div>
        ) : (
          <>
            <div style={step}>
              <b style={{ color: '#35423a' }}>שלב 1:</b> התקיני בטלפון אפליקציית אימות —
              למשל <b>Google Authenticator</b> (חינמית, זמינה ב־App Store וב־Google Play).
            </div>

            <div style={step}>
              <b style={{ color: '#35423a' }}>שלב 2:</b> פתחי את האפליקציה, לחצי על ״+״ ובחרי
              ״סריקת קוד QR״, וסרקי את הקוד הזה:
            </div>

            <div style={{ textAlign: 'center', margin: '0 0 18px' }}>
              {/* Supabase returns the QR as an inline SVG data-URI. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="קוד QR לאימות דו־שלבי" width={200} height={200}
                   style={{ border: '1px solid #dde5e1', borderRadius: 8, padding: 8 }} />
              <div style={{ fontSize: 15, color: '#8aaa98', marginTop: 10 }}>
                לא מצליחה לסרוק? הקלידי באפליקציה את הקוד הזה:
                <div dir="ltr" style={{
                  fontFamily: 'monospace', fontSize: 15, color: '#577066',
                  background: '#f5f8f6', border: '1px solid #dde5e1', borderRadius: 6,
                  padding: '8px 10px', marginTop: 6, wordBreak: 'break-all',
                }}>{secret}</div>
              </div>
            </div>

            <form onSubmit={handleVerify}>
              <div style={step}>
                <b style={{ color: '#35423a' }}>שלב 3:</b> הזיני כאן את הקוד בן 6 הספרות
                שמופיע באפליקציה:
              </div>
              <input
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric" placeholder="______" autoComplete="one-time-code" required
                style={{
                  width: '100%', padding: '16px 17px', fontSize: 19,
                  border: '1.5px solid #dde5e1', borderRadius: 6,
                  fontFamily: 'monospace', textAlign: 'center', letterSpacing: '0.5em',
                  boxSizing: 'border-box', outline: 'none',
                }}
              />

              {error && <div style={{ fontSize: 16, color: '#c0392b', marginTop: 12 }}>{error}</div>}

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                style={{
                  ...btn,
                  background: loading || code.length !== 6 ? '#8aaa98' : '#4d7c60',
                  cursor: loading || code.length !== 6 ? 'default' : 'pointer',
                }}
              >
                {loading ? 'מאמת…' : 'סיום והמשך לניהול →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
