'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { SaveProvider, useSave } from './save-context'

const NAV = [
  { label: 'תוכן האתר',   href: '/admin/content', icon: '✏️' },
  { label: 'פניות נכנסות', href: '/admin/leads', icon: '📩' },
]

/* ── Sidebar drawer ── */
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const { saving, saved, error, saveRef } = useSave()
  const isContent = pathname.startsWith('/admin/content')

  return (
    <aside className={`admin-sidebar${open ? ' admin-sidebar--open' : ''}`} style={{
      width: 290,
      background: '#0B2F57',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      overflowY: 'auto',
      fontFamily: 'Assistant, sans-serif',
    }}>
      {/* X close — mobile only */}
      <button
        onClick={onClose}
        className="admin-sidebar-close"
        aria-label="סגור תפריט"
        style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(255,255,255,0.12)', border: 'none',
          color: '#fff', width: 34, height: 34, borderRadius: '50%',
          cursor: 'pointer', fontSize: 16,
          alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>

      {/* Brand */}
      <div style={{ padding: '34px 26px 26px', borderBottom: '1px solid rgba(217,221,227,0.12)' }}>
        <div style={{ fontSize: 13, color: 'rgba(217,221,227,0.5)', marginBottom: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          פאנל ניהול
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: '#fff' }}>
          גלר עבאדי
        </div>
        <div style={{ fontSize: 13, color: 'rgba(217,221,227,0.45)', letterSpacing: '0.1em', marginTop: 2 }}>
          משרד עורכי דין
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '17px 14px' }}>
        {NAV.map(n => {
          const active = pathname.startsWith(n.href)
          return (
            <Link key={n.href} href={n.href} onClick={onClose} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 17px', borderRadius: 6, marginBottom: 3,
              color: active ? '#fff' : 'rgba(217,221,227,0.65)',
              background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderInlineStart: active ? '3px solid #D9DDE3' : '3px solid transparent',
              textDecoration: 'none', fontSize: 18, fontWeight: active ? 600 : 400,
              transition: 'all 0.12s',
            }}>
              <span style={{ fontSize: 20 }}>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Save button (content page) */}
      {isContent && (
        <div style={{ padding: '17px 14px', borderTop: '1px solid rgba(217,221,227,0.1)' }}>
          <button
            onClick={() => { saveRef.current?.(); onClose() }}
            disabled={saving}
            style={{
              width: '100%', padding: '16px 17px',
              background: saving ? 'rgba(255,255,255,0.12)' : '#4E6B8A',
              border: 'none', borderRadius: 6,
              color: '#fff', cursor: saving ? 'default' : 'pointer',
              fontSize: 17, fontWeight: 700,
              fontFamily: 'Assistant, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              letterSpacing: '0.04em', transition: 'background 0.15s',
            }}
          >
            {saving
              ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>שומר...</>
              : <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>שמירת שינויים</>
            }
          </button>
          {saved && <div style={{ marginTop: 10, fontSize: 16, color: '#D9DDE3', textAlign: 'center' }}>✓ נשמר בהצלחה</div>}
          {error && <div style={{ marginTop: 10, fontSize: 14, color: '#fca5a5', textAlign: 'center', lineHeight: 1.4 }}>{error}</div>}
        </div>
      )}

      {/* Bottom links */}
      <div style={{ padding: '14px 14px', borderTop: '1px solid rgba(217,221,227,0.1)' }}>
        <Link href="/" target="_blank" style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 17px',
          borderRadius: 6, color: 'rgba(217,221,227,0.55)', textDecoration: 'none', fontSize: 17,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          <span>צפייה באתר</span>
        </Link>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" style={{
            width: '100%', padding: '12px 17px',
            background: 'transparent', border: 'none', borderRadius: 6,
            color: 'rgba(217,221,227,0.55)', cursor: 'pointer', fontSize: 17,
            textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'Assistant, sans-serif',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>יציאה</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

/* ── Inner layout (inside SaveProvider) ── */
function AdminInner({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null)
  const [showTop, setShowTop] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { saving, saveRef } = useSave()
  const isContent = pathname.startsWith('/admin/content')

  return (
    <>
      <style>{`
        /* Desktop — sidebar always visible */
        .admin-sidebar {
          position: sticky;
          top: 0;
          transition: transform 0.25s ease;
        }
        .admin-sidebar-close { display: none !important; }
        .admin-topbar { display: none !important; }
        .admin-save-fab { display: none !important; }

        /* Mobile — drawer */
        @media (max-width: 767px) {
          .admin-topbar {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            height: 56px;
            min-height: 56px;
            background: #0B2F57;
            color: #fff;
            font-family: Assistant, sans-serif;
            flex-shrink: 0;
          }
          .admin-sidebar {
            position: fixed !important;
            top: 0;
            right: 0;
            height: 100dvh !important;
            z-index: 300;
            transform: translateX(110%);
          }
          .admin-sidebar--open {
            transform: translateX(0) !important;
          }
          .admin-sidebar-close {
            display: flex !important;
          }
          /* Save FAB — only on content page, mobile */
          .admin-save-fab {
            display: flex !important;
          }
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        display: 'flex', flexDirection: 'column',
        height: '100dvh', overflow: 'hidden',
        fontFamily: 'Assistant, sans-serif', direction: 'rtl',
      }}>
        {/* ── Mobile top bar ── */}
        <div className="admin-topbar">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="פתח תפריט"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span style={{ fontSize: 17, fontWeight: 700 }}>פאנל ניהול</span>
          <div style={{ width: 38 }} />
        </div>

        {/* ── Backdrop ── */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.55)',
              zIndex: 299,
            }}
          />
        )}

        {/* ── Main row ── */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main
            ref={mainRef}
            onScroll={() => setShowTop((mainRef.current?.scrollTop ?? 0) > 300)}
            style={{ flex: 1, background: '#F4F5F8', overflowY: 'auto', overflowX: 'hidden' }}
          >
            {children}
          </main>
        </div>
      </div>

      {/* Scroll-to-top */}
      {showTop && (
        <button
          onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="חזרה למעלה"
          style={{
            position: 'fixed', bottom: 28, left: 28,
            width: 53, height: 53, borderRadius: '50%',
            background: '#0B2F57', color: '#D9DDE3',
            border: 'none', cursor: 'pointer',
            fontSize: 26, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            zIndex: 200, transition: 'background 0.15s',
          }}
        >↑</button>
      )}

      {/* Mobile save FAB (content page only) */}
      {isContent && (
        <button
          onClick={() => saveRef.current?.()}
          disabled={saving}
          className="admin-save-fab"
          style={{
            position: 'fixed', bottom: 20, left: 20,
            zIndex: 250, background: saving ? '#6b8aaa' : '#4E6B8A',
            color: '#fff', border: 'none', borderRadius: 28,
            padding: '14px 22px', fontSize: 16, fontWeight: 700,
            fontFamily: 'Assistant, sans-serif',
            alignItems: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            cursor: saving ? 'default' : 'pointer',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          {saving ? 'שומר...' : 'שמירה'}
        </button>
      )}
    </>
  )
}

/* ── Root export ── */
function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Login page gets no sidebar/layout — just the raw page
  if (pathname === '/admin/login') return <>{children}</>
  return (
    <SaveProvider>
      <AdminInner>{children}</AdminInner>
    </SaveProvider>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutInner>{children}</AdminLayoutInner>
}
