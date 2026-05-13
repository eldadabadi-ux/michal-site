'use client'

import { useState, useEffect } from 'react'
import { T } from './tokens'

type Feature = 'high-contrast' | 'inverted' | 'readable-font' | 'highlight-links' | 'no-animations' | 'grayscale' | 'big-cursor'

const FEATURES: { key: Feature; label: string }[] = [
  { key: 'high-contrast',   label: 'ניגודיות גבוהה' },
  { key: 'inverted',        label: 'ניגודיות הפוכה' },
  { key: 'readable-font',   label: 'גופן קריא' },
  { key: 'highlight-links', label: 'הדגש קישורים' },
  { key: 'no-animations',   label: 'עצור אנימציות' },
  { key: 'grayscale',       label: 'גווני אפור' },
  { key: 'big-cursor',      label: 'סמן גדול' },
]

const STORAGE_KEY = 'a11y-prefs'

function loadPrefs(): { active: Feature[]; fontSize: number } {
  if (typeof window === 'undefined') return { active: [], fontSize: 100 }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { active: [], fontSize: 100 }
  } catch {
    return { active: [], fontSize: 100 }
  }
}

function applyPrefs(active: Feature[], fontSize: number) {
  const html = document.documentElement
  FEATURES.forEach(f => html.classList.toggle(f.key, active.includes(f.key)))
  html.style.fontSize = `${fontSize}%`
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Feature[]>([])
  const [fontSize, setFontSize] = useState(100)

  useEffect(() => {
    const prefs = loadPrefs()
    setActive(prefs.active)
    setFontSize(prefs.fontSize)
    applyPrefs(prefs.active, prefs.fontSize)
  }, [])

  function toggle(key: Feature) {
    const next = active.includes(key) ? active.filter(k => k !== key) : [...active, key]
    setActive(next)
    applyPrefs(next, fontSize)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ active: next, fontSize }))
  }

  function changeFontSize(delta: number) {
    const next = Math.min(150, Math.max(90, fontSize + delta))
    setFontSize(next)
    applyPrefs(active, next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ active, fontSize: next }))
  }

  function reset() {
    setActive([])
    setFontSize(100)
    applyPrefs([], 100)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div style={{ position: 'fixed', insetInlineStart: 24, bottom: 28, zIndex: 60, fontFamily: T.sans }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 64, insetInlineStart: 0,
          background: '#fff', border: `1px solid ${T.rule}`,
          boxShadow: T.shadowMd, width: 240, borderRadius: 4,
          padding: 16, display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{ fontFamily: T.serif, fontSize: 15, color: T.ink, marginBottom: 8, borderBottom: `1px solid ${T.rule}`, paddingBottom: 8 }}>
            הגדרות נגישות
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <button onClick={() => changeFontSize(-10)} style={btnStyle}>א-</button>
            <span style={{ flex: 1, textAlign: 'center', fontSize: 12, color: T.inkMute }}>גודל גופן {fontSize}%</span>
            <button onClick={() => changeFontSize(10)} style={btnStyle}>א+</button>
          </div>

          {FEATURES.map(f => (
            <button
              key={f.key}
              onClick={() => toggle(f.key)}
              style={{
                ...btnStyle,
                width: '100%', textAlign: 'right', padding: '8px 10px',
                background: active.includes(f.key) ? T.ink : '#f7f4ed',
                color: active.includes(f.key) ? '#fff' : T.ink,
                borderColor: active.includes(f.key) ? T.gold : T.rule,
              }}
            >{f.label}</button>
          ))}

          <button onClick={reset} style={{ ...btnStyle, width: '100%', marginTop: 8, color: T.inkMute, fontSize: 11 }}>
            איפוס הכל
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        aria-label="תפריט נגישות"
        aria-expanded={open}
        style={{
          width: 52, height: 52,
          background: open ? T.ink : T.paper,
          color: open ? T.goldSoft : T.ink,
          border: `1.5px solid ${T.gold}`,
          borderRadius: '50%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: T.shadowMd,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="1.5"/>
          <path d="M8 8h8l-1 8-3 4-3-4-1-8"/>
          <path d="M8 10c-2 1-3 3-3 5"/>
          <path d="M16 10c2 1 3 3 3 5"/>
        </svg>
      </button>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: '#f7f4ed', border: `1px solid ${T.rule}`,
  borderRadius: 3, cursor: 'pointer', fontSize: 13, padding: '6px 10px',
  fontFamily: T.sans, color: T.ink,
}
