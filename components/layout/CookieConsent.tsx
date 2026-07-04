'use client'
import { useState, useEffect } from 'react'
import Script from 'next/script'

type Prefs = { analytics: boolean; marketing: boolean; decided: boolean }

const KEY = 'cookie_consent_v1'
const INIT: Prefs = { analytics: false, marketing: false, decided: false }

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...INIT, ...JSON.parse(raw) }
  } catch {}
  return INIT
}
function savePrefs(p: Prefs) {
  localStorage.setItem(KEY, JSON.stringify({ ...p, ts: Date.now() }))
}

/* ─── Toggle switch ─── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 52, height: 28,
        background: checked ? 'var(--gold)' : 'var(--paper-edge)',
        border: 'none', borderRadius: 14, cursor: 'pointer',
        position: 'relative', transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3,
        left: checked ? 26 : 3,
        width: 22, height: 22, borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.22)',
        transition: 'left 0.2s',
        display: 'block',
      }} />
    </button>
  )
}

/* ─── Single cookie category row ─── */
function CookieRow({ title, desc, checked, locked, onChange }: {
  title: string; desc: string; checked: boolean; locked?: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div style={{
      padding: '18px 0',
      borderBottom: '1px solid var(--rule)',
      display: 'flex', gap: 18, alignItems: 'flex-start',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--ink)', marginBottom: 5, fontFamily: 'var(--serif)' }}>{title}</div>
        <div style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{desc}</div>
      </div>
      <div style={{ flexShrink: 0, paddingTop: 4 }}>
        {locked
          ? <span style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 700, fontFamily: 'var(--sans)', whiteSpace: 'nowrap' }}>תמיד פעיל</span>
          : <Toggle checked={checked} onChange={onChange} />}
      </div>
    </div>
  )
}

/* ─── Preferences panel (modal) ─── */
function PrefsPanel({ prefs, onSave, onClose }: {
  prefs: Prefs
  onSave: (analytics: boolean, marketing: boolean) => void
  onClose: () => void
}) {
  const [analytics, setAnalytics] = useState(prefs.analytics)
  const [marketing, setMarketing] = useState(prefs.marketing)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'relative', background: 'var(--paper)',
        width: '100%', maxWidth: 600,
        maxHeight: '90vh', overflowY: 'auto',
        padding: '44px 48px 48px',
        direction: 'rtl', fontFamily: 'var(--sans)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <button
          onClick={onClose}
          aria-label="סגור"
          style={{ position: 'absolute', top: 18, left: 18, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--ink-mute)' }}
        >✕</button>

        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 30, color: 'var(--ink)', margin: '0 0 10px' }}>
          הגדרות עוגיות
        </h2>
        <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.7, margin: '0 0 24px' }}>
          בחרו אילו עוגיות לאפשר. עוגיות הכרחיות נדרשות לתפעול האתר ואינן ניתנות לכיבוי.
          ניתן לשנות את ההעדפות בכל עת דרך הקישור בתחתית האתר.
        </p>

        <CookieRow
          title="עוגיות הכרחיות"
          desc="נדרשות לתפעול תקין של האתר: ניווט, טפסי יצירת קשר ואבטחה. אינן מכילות מידע אישי מזהה."
          checked={true}
          locked
          onChange={() => {}}
        />
        <CookieRow
          title="עוגיות סטטיסטיקה וניתוח"
          desc="עוזרות לנו להבין כיצד מבקרים משתמשים באתר (כגון Google Analytics). המידע נאסף באופן אנונימי ומשמש לשיפור חוויית הגלישה."
          checked={analytics}
          onChange={setAnalytics}
        />
        <CookieRow
          title="עוגיות שיווק ורימרקטינג"
          desc="מאפשרות הצגת מודעות מותאמות אישית, רימרקטינג ופיקסלים של פלטפורמות פרסום (Meta Pixel, Google Ads וכדומה). פעילות רק בהסכמה מפורשת."
          checked={marketing}
          onChange={setMarketing}
        />

        <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
          <button
            onClick={() => onSave(false, false)}
            style={{
              flex: 1, minWidth: 120,
              background: 'var(--paper-cool)', border: '1px solid var(--rule)',
              color: 'var(--ink-soft)', cursor: 'pointer',
              padding: '13px 16px', fontSize: 17, fontWeight: 600,
              fontFamily: 'var(--sans)',
            }}
          >
            דחה הכל
          </button>
          <button
            onClick={() => onSave(true, true)}
            style={{
              flex: 1, minWidth: 120,
              background: 'var(--paper-cool)', border: '1px solid var(--rule)',
              color: 'var(--ink)', cursor: 'pointer',
              padding: '13px 16px', fontSize: 17, fontWeight: 600,
              fontFamily: 'var(--sans)',
            }}
          >
            קבל הכל
          </button>
          <button
            onClick={() => onSave(analytics, marketing)}
            style={{
              flex: 2, minWidth: 150,
              background: 'var(--ink)', border: 'none',
              borderInlineStart: '2px solid var(--gold)',
              color: '#fff', cursor: 'pointer',
              padding: '13px 20px', fontSize: 17, fontWeight: 700,
              fontFamily: 'var(--sans)',
            }}
          >
            שמור העדפות
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ─── */
export default function CookieConsent({ gaId }: { gaId?: string }) {
  const [prefs, setPrefs] = useState<Prefs>(INIT)
  const [banner, setBanner] = useState(false)
  const [panel, setPanel] = useState(false)

  useEffect(() => {
    // Check localStorage and show/hide banner accordingly.
    // Called on mount AND every time the user returns to the tab —
    // this handles the case where they cleared data in Chrome Settings
    // (which navigates away from the site) and then came back.
    function check() {
      const p = loadPrefs()
      setPrefs(p)
      setBanner(!p.decided)
    }

    check() // initial check on mount

    // Re-check whenever the tab becomes visible again
    // (e.g. user cleared localStorage in Chrome Settings → came back to tab)
    const onVisible = () => { if (document.visibilityState === 'visible') check() }
    document.addEventListener('visibilitychange', onVisible)

    // Footer "עוגיות" button triggers this event
    const h = () => setPanel(true)
    window.addEventListener('open-cookie-settings', h)

    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('open-cookie-settings', h)
    }
  }, [])

  function acceptAll() {
    const p: Prefs = { analytics: true, marketing: true, decided: true }
    setPrefs(p); savePrefs(p); setBanner(false)
  }
  function rejectAll() {
    const p: Prefs = { analytics: false, marketing: false, decided: true }
    setPrefs(p); savePrefs(p); setBanner(false)
  }
  function saveCustom(analytics: boolean, marketing: boolean) {
    const p: Prefs = { analytics, marketing, decided: true }
    setPrefs(p); savePrefs(p); setBanner(false); setPanel(false)
  }

  return (
    <>
      {/* ── Google Analytics — injected only when consent given ── */}
      {prefs.analytics && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${gaId}',{anonymize_ip:true});
          `}</Script>
        </>
      )}

      {/* ── Marketing / remarketing placeholder ── */}
      {/* Add Meta Pixel / Google Ads tags here conditionally when prefs.marketing === true */}

      {/* ── Consent banner ── */}
      {banner && !panel && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 500,
          background: 'var(--paper)',
          borderTop: '2px solid var(--rule)',
          boxShadow: '0 -6px 24px rgba(53,66,58,0.10)',
          padding: '20px clamp(20px, 12vw, 220px)',
          display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap',
          fontFamily: 'var(--sans)', direction: 'rtl',
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
              אנו משתמשים בעוגיות (Cookies)
            </div>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
              האתר משתמש בעוגיות לתפעול, ניתוח סטטיסטי ופרסום מותאם אישית.
              ניתן לאשר הכל, לדחות עוגיות לא הכרחיות, או להתאים את ההעדפות.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
            <button
              onClick={() => { setBanner(false); setPanel(true) }}
              style={{
                background: 'var(--paper-cool)', border: '1px solid var(--rule)',
                color: 'var(--ink)', cursor: 'pointer',
                padding: '11px 20px', fontSize: 17, fontWeight: 600,
                fontFamily: 'var(--sans)',
              }}
            >
              הגדרות
            </button>
            <button
              onClick={rejectAll}
              style={{
                background: 'var(--paper-cool)', border: '1px solid var(--rule)',
                color: 'var(--ink-soft)', cursor: 'pointer',
                padding: '11px 20px', fontSize: 17, fontWeight: 600,
                fontFamily: 'var(--sans)',
              }}
            >
              דחה הכל
            </button>
            <button
              onClick={acceptAll}
              style={{
                background: 'var(--ink)', border: 'none',
                borderInlineStart: '2px solid var(--gold)',
                color: '#fff', cursor: 'pointer',
                padding: '11px 26px', fontSize: 17, fontWeight: 700,
                fontFamily: 'var(--sans)',
              }}
            >
              קבל הכל ✓
            </button>
          </div>
        </div>
      )}

      {/* ── Preferences panel ── */}
      {panel && (
        <PrefsPanel
          prefs={prefs}
          onSave={saveCustom}
          onClose={() => setPanel(false)}
        />
      )}
    </>
  )
}
