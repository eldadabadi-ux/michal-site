'use client'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { getBrowserSupabase } from '../../../lib/supabase/client'

/**
 * /admin/mfa — one-time TOTP enrolment for the admin panel.
 *
 * Reachable only with a signed-in (aal1) session; the proxy pins any
 * non-aal2 admin session here. Verifying the first code upgrades the session
 * to aal2, which is what lib/admin-guard.ts requires for every admin API route.
 */
export default function AdminMfa() {
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState('')
  const [factorId, setFactorId] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [preparing, setPreparing] = useState(true)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return // React StrictMode mounts effects twice in dev
    started.current = true

    ;(async () => {
      const supabase = getBrowserSupabase()
      const { data: factors, error: listErr } = await supabase.auth.mfa.listFactors()
      if (listErr) {
        setError('לא הצלחנו לטעון את פרטי האימות. רענני את העמוד.')
        setPreparing(false)
        return
      }

      // Already fully set up — nothing to enrol, just finish signing in.
      if ((factors?.totp || []).some(f => f.status === 'verified')) {
        window.location.href = '/admin/content'
        return
      }

      // Drop half-finished factors from an abandoned attempt, then start clean.
      for (const f of factors?.totp || []) {
        await supabase.auth.mfa.unenroll({ factorId: f.id })
      }

      const { data, error: enrollErr } = await supabase.auth.mfa.enroll({ factorType: 'totp' })
      if (enrollErr || !data) {
        setError('לא הצלחנו ליצור קוד אימות. רענני את העמוד ונסי שוב.')
        setPreparing(false)
        return
      }

      setFactorId(data.id)
      setQr(data.totp.qr_code)
      setSecret(data.totp.secret)
      setPreparing(false)
    })()
  }, [])

  async function handleVerify(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = getBrowserSupabase()
    const { data: ch, error: chErr } = await supabase.auth.mfa.challenge({ factorId })
    if (chErr || !ch) {
      setError('שגיאה באימות. נסי שוב.')
      setLoading(false)
      return
    }

    const { error: vErr } = await supabase.auth.mfa.verify({ factorId, challengeId: ch.id, code })
    setLoading(false)
    if (vErr) {
      setError('הקוד שגוי או פג תוקף. הזיני את הקוד המעודכן מהאפליקציה.')
      setCode('')
      return
    }

    // Full reload so the proxy re-reads the upgraded (aal2) session cookie.
    window.location.href = '/admin/content'
  }

  const card: React.CSSProperties = {
    background: '#fff', padding: '48px 44px', borderRadius: 12,
    width: '100%', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  }
  const step: React.CSSProperties = {
    fontSize: 17, color: '#577066', lineHeight: 1.7, marginBottom: 18,
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
        ) : !qr ? (
          <div style={{ fontSize: 17, color: '#c0392b', textAlign: 'center' }}>{error}</div>
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
                  marginTop: 22, width: '100%', padding: '17px',
                  background: loading || code.length !== 6 ? '#8aaa98' : '#4d7c60',
                  color: '#fff', border: 'none', borderRadius: 6,
                  fontSize: 19, fontWeight: 600,
                  cursor: loading || code.length !== 6 ? 'default' : 'pointer',
                  fontFamily: 'Heebo, sans-serif',
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
