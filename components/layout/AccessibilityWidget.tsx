'use client'
import { useState, useEffect, useCallback } from 'react'

type ColorMode = 'none' | 'grayscale' | 'monochrome'

interface A11yState {
  underlineLinks: boolean
  keyboardFocus: boolean
  readableFont: boolean
  colorMode: ColorMode
  fontScale: number   // -2 to 3
  zoom: number        // -2 to 2
}

const DEFAULT: A11yState = {
  underlineLinks: false,
  keyboardFocus: false,
  readableFont: false,
  colorMode: 'none',
  fontScale: 0,
  zoom: 0,
}

const FONT_ZOOM: Record<number, number> = { '-2': 0.80, '-1': 0.90, 0: 1, 1: 1.15, 2: 1.30, 3: 1.50 }
const PAGE_ZOOM: Record<number, number> = { '-2': 0.80, '-1': 0.90, 0: 1, 1: 1.10, 2: 1.20 }

function applyState(s: A11yState) {
  const html = document.documentElement
  html.classList.toggle('a11y-underline-links', s.underlineLinks)
  html.classList.toggle('a11y-keyboard-focus', s.keyboardFocus)
  html.classList.toggle('a11y-readable-font', s.readableFont)
  html.classList.toggle('a11y-grayscale', s.colorMode === 'grayscale')
  html.classList.toggle('a11y-monochrome', s.colorMode === 'monochrome')

  // Apply combined font+page zoom directly on content root (works with hardcoded px values)
  const total = (FONT_ZOOM[s.fontScale] ?? 1) * (PAGE_ZOOM[s.zoom] ?? 1)
  const root = document.getElementById('rtl-root')
  if (root) root.style.zoom = total === 1 ? '' : total.toFixed(3)
}

function IconSize({ children }: { children: React.ReactNode }) {
  return <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</span>
}

const ICON = {
  underline: (
    <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
      <text x="3" y="16" fontFamily="serif" fontSize="16" fontWeight="700" style={{ textDecoration: 'underline' }} fill="currentColor">U</text>
      <line x1="2" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  keyboard: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>
    </svg>
  ),
  fontPlus: (
    <svg width="28" height="28" viewBox="0 0 22 22" fill="currentColor">
      <text x="1" y="17" fontFamily="serif" fontSize="18" fontWeight="700">A</text>
      <text x="14" y="11" fontFamily="sans-serif" fontSize="13" fontWeight="700">+</text>
    </svg>
  ),
  fontMinus: (
    <svg width="28" height="28" viewBox="0 0 22 22" fill="currentColor">
      <text x="1" y="17" fontFamily="serif" fontSize="18" fontWeight="700">A</text>
      <text x="14" y="11" fontFamily="sans-serif" fontSize="13" fontWeight="700">-</text>
    </svg>
  ),
  fontReadable: (
    <svg width="28" height="28" viewBox="0 0 22 22" fill="currentColor">
      <text x="1" y="17" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700">A</text>
    </svg>
  ),
  grayscale: (
    <svg width="28" height="28" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M11 2a9 9 0 0 1 0 18" fill="currentColor"/></svg>
  ),
  monochrome: (
    <svg width="28" height="28" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" fill="currentColor"/><circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M11 2a9 9 0 0 0 0 18" fill="white"/></svg>
  ),
  resetColor: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>
    </svg>
  ),
  zoomIn: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M9 10h6M12 7v6"/>
    </svg>
  ),
  zoomOut: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M9 10h6"/>
    </svg>
  ),
  resetZoom: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<A11yState>(DEFAULT)

  const update = useCallback((patch: Partial<A11yState>) => {
    setState(prev => {
      const next = { ...prev, ...patch }
      applyState(next)
      try { localStorage.setItem('a11y2', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    applyState(DEFAULT)
    setState(DEFAULT)
    try { localStorage.removeItem('a11y2') } catch {}
  }, [])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('a11y2') ?? 'null')
      if (saved) { setState(saved); applyState(saved) }
    } catch {}
  }, [])

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-accessibility-widget', handler)
    return () => window.removeEventListener('open-accessibility-widget', handler)
  }, [])

  const BtnStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 6, padding: '12px 8px', border: '1.5px solid',
    borderColor: active ? 'var(--gold)' : '#dde5e1',
    background: active ? 'var(--gold)' : '#fff',
    color: active ? '#fff' : 'var(--ink)',
    cursor: 'pointer', fontSize: 14, fontFamily: 'var(--sans)',
    textAlign: 'center', lineHeight: 1.3, borderRadius: 6,
    transition: 'all 0.15s',
  })

  const TopBtn = (active: boolean): React.CSSProperties => ({
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 16, fontFamily: 'var(--sans)',
    color: active ? 'var(--gold-deep)' : 'var(--ink-soft)',
    textDecoration: active ? 'underline' : 'none',
    padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8,
  })

  return (
    <>
      {/* Trigger — wheelchair icon (desktop only; mobile trigger is in FloatingFab) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="תפריט נגישות"
        className="a11y-trigger-btn"
        style={{
          position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)',
          zIndex: 301, background: 'none', border: 'none', outline: 'none', cursor: 'pointer',
          padding: '8px 4px', boxShadow: 'none',
        }}
      >
        <span style={{ fontSize: 50, lineHeight: 1 }}>&#9855;</span>
      </button>
      <style>{`
        @media (max-width: 768px) { .a11y-trigger-btn { display: none !important; } }
      `}</style>

      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 300 }} />
      )}

      {/* Panel — limited height, not full screen */}
      <div
        role="dialog"
        aria-label="סייען נגישות"
        style={{
          position: 'fixed', left: 30, top: 80, bottom: 80,
          width: 300, zIndex: 302,
          background: '#fff', boxShadow: '2px 0 24px rgba(0,0,0,0.18)',
          transform: open ? 'translateX(0)' : 'translateX(calc(-100% - 60px))',
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          fontFamily: 'var(--sans)',
          borderRadius: '0 12px 12px 0',
        }}
      >
        {/* Header */}
        <div style={{ background: 'var(--gold)', color: '#fff', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>סייען נגישות</span>
          <button onClick={() => setOpen(false)} aria-label="סגור" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>&#x2715;</button>
        </div>

        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, overflowY: 'auto' }}>
          {/* Top toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button style={TopBtn(state.underlineLinks)} onClick={() => update({ underlineLinks: !state.underlineLinks })}>
              <span style={{ fontWeight: 700, textDecoration: 'underline', fontSize: 16 }}>U</span>
              קו תחתון לקישורים
            </button>
            <button style={TopBtn(state.keyboardFocus)} onClick={() => update({ keyboardFocus: !state.keyboardFocus })}>
              <span style={{ fontSize: 16 }}>&#9733;</span>
              הדגשת ניווט מקלדת
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e5e2' }} />

          {/* Font size */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <button style={BtnStyle(state.fontScale > 0)} onClick={() => update({ fontScale: Math.min(3, state.fontScale + 1) })}>
              <IconSize>{ICON.fontPlus}</IconSize><span>הגדלת גופן</span>
            </button>
            <button style={BtnStyle(state.fontScale < 0)} onClick={() => update({ fontScale: Math.max(-2, state.fontScale - 1) })}>
              <IconSize>{ICON.fontMinus}</IconSize><span>הקטנת גופן</span>
            </button>
            <button style={BtnStyle(state.readableFont)} onClick={() => update({ readableFont: !state.readableFont })}>
              <IconSize>{ICON.fontReadable}</IconSize><span>גופן קריא</span>
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e5e2' }} />

          {/* Color modes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <button style={BtnStyle(state.colorMode === 'grayscale')} onClick={() => update({ colorMode: state.colorMode === 'grayscale' ? 'none' : 'grayscale' })}>
              <IconSize>{ICON.grayscale}</IconSize><span>גווני אפור</span>
            </button>
            <button style={BtnStyle(state.colorMode === 'monochrome')} onClick={() => update({ colorMode: state.colorMode === 'monochrome' ? 'none' : 'monochrome' })}>
              <IconSize>{ICON.monochrome}</IconSize><span>מונוכרום</span>
            </button>
            <button style={BtnStyle(false)} onClick={() => update({ colorMode: 'none' })}>
              <IconSize>{ICON.resetColor}</IconSize><span>איפוס צבעים</span>
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e0e5e2' }} />

          {/* Zoom */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <button style={BtnStyle(state.zoom < 0)} onClick={() => update({ zoom: Math.max(-2, state.zoom - 1) })}>
              <IconSize>{ICON.zoomOut}</IconSize><span>הקטנת תצוגה</span>
            </button>
            <button style={BtnStyle(state.zoom > 0)} onClick={() => update({ zoom: Math.min(2, state.zoom + 1) })}>
              <IconSize>{ICON.zoomIn}</IconSize><span>הגדלת תצוגה</span>
            </button>
            <button style={BtnStyle(false)} onClick={() => update({ zoom: 0 })}>
              <IconSize>{ICON.resetZoom}</IconSize><span>איפוס תצוגה</span>
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div style={{ borderTop: '1px solid #e0e5e2', padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 0, flexShrink: 0 }}>
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', padding: '10px 0', fontSize: 15, color: 'var(--ink-soft)', borderBottom: '1px solid #e0e5e2' }}
            onClick={() => { setOpen(false); window.dispatchEvent(new Event('open-accessibility-statement')) }}
          >
            הצהרת נגישות
          </button>
          <button
            onClick={resetAll}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', padding: '10px 0', fontSize: 15, color: '#c0392b' }}
          >
            ביטול נגישות
          </button>
        </div>
      </div>

    </>
  )
}
