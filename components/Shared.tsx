import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { T } from './tokens'

export function PhoneIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

export function MailIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

// ── Primitives ────────────────────────────────────────────────────────────────

export function Placeholder({
  label = 'image',
  style = {},
  height,
  tone = 'warm',
  children,
}: {
  label?: string
  style?: CSSProperties
  height?: number | string
  tone?: 'warm' | 'cool' | 'ink'
  children?: ReactNode
}) {
  const stripes =
    tone === 'cool'
      ? 'repeating-linear-gradient(135deg, #e6e1d6 0 8px, #ddd6c7 8px 16px)'
      : tone === 'ink'
      ? 'repeating-linear-gradient(135deg, #20211e 0 8px, #1a1b18 8px 16px)'
      : 'repeating-linear-gradient(135deg, #efe9d9 0 8px, #e6dec9 8px 16px)'
  const color = tone === 'ink' ? '#cdbf9c' : '#7a6e54'
  return (
    <div style={{ position: 'relative', background: stripes, height, overflow: 'hidden', ...style }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.mono, fontSize: 10, letterSpacing: '0.18em',
        textTransform: 'uppercase', color,
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

export function GoldRule({ length = 32, vertical = false, style = {} }: {
  length?: number
  vertical?: boolean
  style?: CSSProperties
}) {
  return (
    <span style={{
      display: 'inline-block',
      background: T.gold,
      width: vertical ? 1 : length,
      height: vertical ? length : 1,
      ...style,
    }} />
  )
}

export function Eyebrow({ children, color = T.gold, style = {} }: {
  children: ReactNode
  color?: string
  style?: CSSProperties
}) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 10, letterSpacing: '0.24em',
      textTransform: 'uppercase', color, ...style,
    }}>
      {children}
    </span>
  )
}

export function Kicker({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      fontFamily: T.sans, fontWeight: 500, fontSize: 12,
      letterSpacing: '0.04em', color: T.inkMute, ...style,
    }}>
      {children}
    </div>
  )
}

// ── Public site chrome ────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'home',      label: 'בית',           href: '/' },
  { id: 'firm',      label: 'המשרד',         href: '/firm' },
  { id: 'practice',  label: 'תחומי התמחות', href: '/practice' },
  { id: 'team',      label: 'הצוות',         href: '/team' },
  { id: 'knowledge', label: 'מאגר ידע',      href: '/knowledge' },
  { id: 'contact',   label: 'יצירת קשר',     href: '/contact' },
]

export function SiteHeader({ tone = 'light', current }: { tone?: 'light' | 'dark'; current?: string }) {
  const isDark = tone === 'dark'
  const fg    = isDark ? '#f1ecdf' : T.ink
  const muted = isDark ? 'rgba(241,236,223,0.7)' : T.inkSoft
  const ruleC = isDark ? 'rgba(241,236,223,0.14)' : T.rule

  return (
    <div>
      {/* Utility strip */}
      <div style={{
        background: T.paperCool, borderBottom: `1px solid ${T.rule}`,
        padding: '7px 56px', display: 'flex', alignItems: 'center', gap: 24,
        fontFamily: T.sans, fontSize: 12, color: T.inkSoft,
      }}>
        <span style={{ marginInlineStart: 'auto', fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.12em' }}>EN | HE</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <PhoneIcon size={13} color={T.gold} />
          <a href="tel:+97237201898" style={{ color: T.inkSoft, textDecoration: 'none', direction: 'ltr', display: 'inline-block' }}>03-720-1898</a>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <MailIcon size={13} color={T.gold} />
          <a href="mailto:office@auerbach-yarden.co.il" style={{ color: T.inkSoft, textDecoration: 'none', direction: 'ltr', display: 'inline-block' }}>office@auerbach-yarden.co.il</a>
        </span>
        <span style={{ color: T.goldDeep, fontWeight: 500 }}>פגישת היכרות ראשונה — ללא עלות</span>
        <span>ימים א׳–ה׳ · 08:30–19:00</span>
      </div>
    <header style={{
      padding: '28px 56px 22px',
      borderBottom: `1px solid ${ruleC}`,
      color: fg, fontFamily: T.sans,
      display: 'flex', alignItems: 'center', gap: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <Link href="/" style={{
          fontFamily: T.serif, fontSize: 28, fontWeight: 500,
          letterSpacing: '-0.01em', textDecoration: 'none', color: fg,
        }}>
          אורבך · ירדן
        </Link>
        <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: muted }}>
          EST 1998
        </span>
      </div>

      <nav style={{ display: 'flex', gap: 38, marginInlineStart: 'auto' }}>
        {NAV_ITEMS.map(it => {
          const active = it.id === current
          return (
            <Link key={it.id} href={it.href} style={{
              fontSize: 18, fontWeight: active ? 600 : 500,
              color: active ? fg : muted,
              textDecoration: 'none', letterSpacing: '0.005em',
              paddingBottom: 8,
              borderBottom: active ? `2px solid ${T.gold}` : '2px solid transparent',
              fontFamily: T.sans,
            }}>
              {it.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link href="/contact" style={{
          padding: '8px 20px', border: `1.5px solid ${T.gold}`,
          color: T.goldDeep, fontFamily: T.serif, fontSize: 14,
          textDecoration: 'none', letterSpacing: '0.01em',
        }}>צור קשר</Link>
        <Link href="/contact" style={{
          fontSize: 14, letterSpacing: '0.03em', fontWeight: 500,
          color: isDark ? T.ink : '#fff',
          background: isDark ? T.goldSoft : T.ink,
          padding: '13px 22px', textDecoration: 'none',
          borderInlineStart: `2px solid ${T.gold}`,
        }}>
          קביעת פגישה →
        </Link>
      </div>
    </header>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer style={{
      background: T.ink, color: '#e9e1cc', padding: '56px 56px 28px',
      fontFamily: T.sans, fontSize: 13, lineHeight: 1.7,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: T.serif, fontSize: 22, marginBottom: 10 }}>אורבך · ירדן</div>
          <Eyebrow color="rgba(232,217,182,0.7)">Auerbach · Yarden &nbsp;·&nbsp; Law Offices</Eyebrow>
          <p style={{ marginTop: 16, color: 'rgba(233,225,204,0.65)', maxWidth: 320 }}>
            משרד בוטיק מוביל בתחומי המשפט המסחרי, החברות, ההיי-טק והליטיגציה. מייצגים יחידים, מנהלים ותאגידים מאז 1998.
          </p>
        </div>
        <div>
          <div style={{ color: T.goldSoft, marginBottom: 12, fontWeight: 500 }}>תחומי התמחות</div>
          {['דיני חברות ומסחר', 'מיזוגים ורכישות', 'ליטיגציה מסחרית', 'היי-טק והשקעות', 'נדל״ן ותכנון'].map(s => (
            <div key={s} style={{ color: 'rgba(233,225,204,0.7)' }}>{s}</div>
          ))}
        </div>
        <div>
          <div style={{ color: T.goldSoft, marginBottom: 12, fontWeight: 500 }}>המשרד</div>
          {['אודות', 'שותפים', 'קריירה', 'פרסומים', 'מאגר ידע'].map(s => (
            <div key={s} style={{ color: 'rgba(233,225,204,0.7)' }}>{s}</div>
          ))}
        </div>
        <div>
          <div style={{ color: T.goldSoft, marginBottom: 12, fontWeight: 500 }}>צרו קשר</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>מגדל אלרוב, רחוב ויצמן 2</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>תל אביב 6423902</div>
          <div style={{ color: 'rgba(233,225,204,0.7)', marginTop: 8 }}>03-720-1898</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }} dir="ltr">office@auerbach-yarden.co.il</div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(232,217,182,0.12)', paddingTop: 20,
        display: 'flex', justifyContent: 'space-between', color: 'rgba(233,225,204,0.5)', fontSize: 11.5,
      }}>
        <span>© 2026 Auerbach · Yarden. כל הזכויות שמורות.</span>
        <span style={{ fontFamily: T.mono, letterSpacing: '0.2em' }}>תקנון · פרטיות · נגישות</span>
      </div>
    </footer>
  )
}

// ── Admin chrome ──────────────────────────────────────────────────────────────

const ADMIN_GROUPS = [
  { title: 'ניהול תוכן', items: [
    { id: 'dashboard', label: 'לוח ראשי',      icon: '◇', href: '/admin' },
    { id: 'pages',     label: 'עמודים',        icon: '☰' },
    { id: 'team',      label: 'צוות',          icon: '◐' },
    { id: 'knowledge', label: 'מאמרי ידע',     icon: '⌘' },
    { id: 'leads',     label: 'פניות חדשות',   icon: '↺', count: 7 },
  ]},
  { title: 'אופטימיזציה למנועי חיפוש ול-AI', items: [
    { id: 'seo',    label: 'SEO & AI Hub',      icon: '✦', href: '/admin/seo' },
    { id: 'aikb',   label: 'AI Knowledge Base', icon: '◈', href: '/admin/ai-knowledge-base' },
    { id: 'schema', label: 'סכמות JSON-LD',     icon: '{ }' },
  ]},
  { title: 'הגדרות', items: [
    { id: 'brand', label: 'מיתוג',        icon: '○' },
    { id: 'users', label: 'משתמשים',      icon: '◦' },
    { id: 'logs',  label: 'יומן פעילות',  icon: '↗' },
  ]},
]

export function AdminShell({ current, children }: { current: string; children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '256px 1fr', minHeight: '100vh', fontFamily: T.sans, background: '#f7f4ed' }}>
      <aside style={{ background: T.ink, color: '#e9e1cc', padding: '22px 0', borderInlineEnd: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ padding: '0 22px 22px', borderBottom: '1px solid rgba(232,217,182,0.10)' }}>
          <div style={{ fontFamily: T.serif, fontSize: 18 }}>אורבך · ירדן</div>
          <Eyebrow color="rgba(232,217,182,0.55)" style={{ marginTop: 4 }}>Admin Console v3.2</Eyebrow>
        </div>

        {ADMIN_GROUPS.map(g => (
          <div key={g.title} style={{ padding: '20px 14px 8px' }}>
            <div style={{
              fontFamily: T.mono, fontSize: 9.5, letterSpacing: '0.22em',
              color: 'rgba(232,217,182,0.4)', padding: '0 8px 10px',
            }}>
              {g.title.toUpperCase()}
            </div>
            {g.items.map(it => {
              const active = it.id === current
              const inner = (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 10px', borderRadius: 4, marginBottom: 2,
                  background: active ? 'rgba(184,150,90,0.14)' : 'transparent',
                  borderInlineStart: active ? `2px solid ${T.gold}` : '2px solid transparent',
                  fontSize: 13, color: active ? '#fff' : 'rgba(233,225,204,0.78)',
                  cursor: 'pointer',
                }}>
                  <span style={{ fontFamily: T.mono, fontSize: 11, color: active ? T.gold : 'rgba(232,217,182,0.5)', width: 14, textAlign: 'center' }}>
                    {it.icon}
                  </span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {'count' in it && it.count && (
                    <span style={{ background: T.gold, color: T.ink, fontSize: 10, fontWeight: 600, borderRadius: 999, padding: '1px 7px' }}>
                      {it.count}
                    </span>
                  )}
                </div>
              )

              return 'href' in it && it.href ? (
                <Link key={it.id} href={it.href} style={{ textDecoration: 'none' }}>{inner}</Link>
              ) : (
                <div key={it.id}>{inner}</div>
              )
            })}
          </div>
        ))}
      </aside>
      <main style={{ minWidth: 0 }}>{children}</main>
    </div>
  )
}

export function AdminTopbar({ title, breadcrumb, actions }: {
  title: string
  breadcrumb?: string
  actions?: ReactNode
}) {
  return (
    <div style={{
      padding: '20px 32px', borderBottom: `1px solid ${T.rule}`,
      display: 'flex', alignItems: 'center', gap: 20, background: '#fff',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.2em', color: T.inkMute, marginBottom: 6 }}>
          {breadcrumb}
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.ink, letterSpacing: '-0.01em' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{actions}</div>
    </div>
  )
}

export function AdminBtn({ children, primary, ghost, style = {} }: {
  children: ReactNode
  primary?: boolean
  ghost?: boolean
  style?: CSSProperties
}) {
  const computed: CSSProperties = {
    fontFamily: T.sans, fontSize: 13, padding: '9px 16px',
    border: `1px solid ${T.rule}`, background: '#fff', color: T.ink,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    borderRadius: 2,
    ...(primary && { background: T.ink, color: '#fff', border: `1px solid ${T.ink}`, borderInlineStart: `2px solid ${T.gold}` } as CSSProperties),
    ...(ghost && { background: 'transparent', border: 'none' } as CSSProperties),
    ...style,
  }
  return <button style={computed}>{children}</button>
}
