// shared.jsx — tokens, primitives, header/footer used across all screens
// All artboards inherit RTL from the <html dir="rtl"> root.

// ────────────────────────────────────────────────────────────────────────────
// Design tokens (exported to window so every screen file picks them up)
// ────────────────────────────────────────────────────────────────────────────
const T = {
  // Surfaces — tuned toward lawin.co.il warm-navy-cream palette
  ink:        '#1d2533',      // deep navy-charcoal (lawin primary)
  inkSoft:    '#2c3447',
  inkMute:    '#5c6276',
  paper:      '#f7f1e6',      // warm cream (lawin background)
  paperCool:  '#efe7d6',
  paperEdge:  '#e4dac3',
  // Gold / brass accent — warmer, more bronze like lawin
  gold:       '#b08a4a',
  goldDeep:   '#8a6a30',
  goldSoft:   '#d9c184',
  goldFaint:  '#f1e8cf',
  // Functional
  rule:       'rgba(21,18,13,0.10)',
  ruleSoft:   'rgba(21,18,13,0.06)',
  shadowSm:   '0 1px 2px rgba(21,18,13,0.05), 0 0 0 1px rgba(21,18,13,0.04)',
  shadowMd:   '0 8px 30px rgba(21,18,13,0.08), 0 0 0 1px rgba(21,18,13,0.04)',
  // Type
  serif:      '"Frank Ruhl Libre", "David Libre", "Playfair Display", Georgia, serif',
  sans:       '"Assistant", "Heebo", "Open Sans Hebrew", system-ui, sans-serif',
  mono:       '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
};

// ────────────────────────────────────────────────────────────────────────────
// Striped placeholder for imagery + small primitives
// ────────────────────────────────────────────────────────────────────────────
function Placeholder({ label = 'image', style = {}, height, tone = 'warm', children }) {
  const stripes = tone === 'cool'
    ? 'repeating-linear-gradient(135deg, #e6e1d6 0 8px, #ddd6c7 8px 16px)'
    : tone === 'ink'
      ? 'repeating-linear-gradient(135deg, #20211e 0 8px, #1a1b18 8px 16px)'
      : 'repeating-linear-gradient(135deg, #efe9d9 0 8px, #e6dec9 8px 16px)';
  const color = tone === 'ink' ? '#cdbf9c' : '#7a6e54';
  return (
    <div style={{
      position: 'relative',
      background: stripes,
      height,
      borderRadius: 0,
      overflow: 'hidden',
      ...style,
    }}>
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
  );
}

// Thin gold rule
function GoldRule({ length = 32, vertical = false, style = {} }) {
  return (
    <span style={{
      display: 'inline-block',
      background: T.gold,
      width: vertical ? 1 : length,
      height: vertical ? length : 1,
      ...style,
    }} />
  );
}

// Tiny capitalised eyebrow (latin) — used sparingly on numbers/section IDs
function Eyebrow({ children, color = T.gold, style = {} }) {
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 10, letterSpacing: '0.24em',
      textTransform: 'uppercase', color, ...style,
    }}>
      {children}
    </span>
  );
}

// Hebrew label (smaller heading, no caps)
function Kicker({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: T.sans, fontWeight: 500, fontSize: 12,
      letterSpacing: '0.04em', color: T.inkMute, ...style,
    }}>
      {children}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Public-site header / footer
// ────────────────────────────────────────────────────────────────────────────
function SiteHeader({ tone = 'light', current }) {
  const isDark = tone === 'dark';
  const fg = isDark ? '#f1ecdf' : T.ink;
  const muted = isDark ? 'rgba(241,236,223,0.7)' : T.inkSoft;
  const ruleC = isDark ? 'rgba(241,236,223,0.14)' : T.rule;
  const items = [
    { id: 'home',      label: 'בית' },
    { id: 'firm',      label: 'המשרד' },
    { id: 'practice',  label: 'תחומי התמחות' },
    { id: 'team',      label: 'הצוות' },
    { id: 'knowledge', label: 'מאגר ידע' },
    { id: 'contact',   label: 'יצירת קשר' },
  ];
  return (
    <header style={{
      padding: '28px 56px 22px',
      borderBottom: `1px solid ${ruleC}`,
      color: fg, fontFamily: T.sans,
      display: 'flex', alignItems: 'center', gap: 40,
    }}>
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em' }}>
          אורבך · ירדן
        </span>
        <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: muted }}>
          EST 1998
        </span>
      </div>
      {/* Nav — enlarged per client request */}
      <nav style={{ display: 'flex', gap: 38, marginInlineStart: 'auto' }}>
        {items.map(it => {
          const active = it.id === current;
          return (
            <a key={it.id} style={{
              fontSize: 18, fontWeight: active ? 600 : 500,
              color: active ? fg : muted,
              textDecoration: 'none', letterSpacing: '0.005em',
              position: 'relative', paddingBottom: 8,
              borderBottom: active ? `2px solid ${T.gold}` : '2px solid transparent',
              fontFamily: T.sans,
            }}>
              {it.label}
            </a>
          );
        })}
      </nav>
      {/* CTA */}
      <a style={{
        fontSize: 14, letterSpacing: '0.03em', fontWeight: 500,
        color: isDark ? T.ink : '#fff',
        background: isDark ? T.goldSoft : T.ink,
        padding: '13px 22px', textDecoration: 'none',
        borderInlineStart: `2px solid ${T.gold}`,
      }}>
        קביעת פגישה →
      </a>
    </header>
  );
}

// Floating Scroll-To-Top button — always visible bottom-right (RTL).
// Inside the artboard frame we position it absolute to the page wrapper so
// it sits at the visible bottom-right of whatever screen is showing.
function ScrollTopFab({ floatTop = 80 }) {
  return (
    <button
      aria-label="גלילה למעלה"
      style={{
        position: 'absolute', insetInlineEnd: 28, bottom: floatTop,
        width: 56, height: 56,
        background: T.ink, color: T.goldSoft,
        border: `1px solid ${T.gold}`,
        borderRadius: '50%', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 12px 30px rgba(29,37,51,0.28), 0 0 0 6px rgba(247,241,230,0.5)',
        zIndex: 50,
        fontFamily: T.sans,
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

function SiteFooter() {
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
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>דיני חברות ומסחר</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>מיזוגים ורכישות</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>ליטיגציה מסחרית</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>היי-טק והשקעות</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>נדל״ן ותכנון</div>
        </div>
        <div>
          <div style={{ color: T.goldSoft, marginBottom: 12, fontWeight: 500 }}>המשרד</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>אודות</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>שותפים</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>קריירה</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>פרסומים</div>
          <div style={{ color: 'rgba(233,225,204,0.7)' }}>מאגר ידע</div>
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
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Admin chrome — sidebar + topbar shared by the 3 admin screens
// ────────────────────────────────────────────────────────────────────────────
function AdminShell({ current, children }) {
  const groups = [
    { title: 'ניהול תוכן', items: [
      { id: 'dashboard', label: 'לוח ראשי',      icon: '◇' },
      { id: 'pages',     label: 'עמודים',        icon: '☰' },
      { id: 'team',      label: 'צוות',          icon: '◐' },
      { id: 'knowledge', label: 'מאמרי ידע',     icon: '⌘' },
      { id: 'leads',     label: 'פניות חדשות',   icon: '↺', count: 7 },
    ]},
    { title: 'אופטימיזציה למנועי חיפוש ול-AI', items: [
      { id: 'seo',       label: 'SEO & AI Hub',  icon: '✦' },
      { id: 'aikb',      label: 'AI Knowledge Base', icon: '◈' },
      { id: 'schema',    label: 'סכמות JSON-LD', icon: '{ }' },
    ]},
    { title: 'הגדרות', items: [
      { id: 'brand',     label: 'מיתוג',          icon: '○' },
      { id: 'users',     label: 'משתמשים',        icon: '◦' },
      { id: 'logs',      label: 'יומן פעילות',    icon: '↗' },
    ]},
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '256px 1fr', minHeight: '100%', fontFamily: T.sans, background: '#f7f4ed' }}>
      {/* Sidebar */}
      <aside style={{
        background: T.ink, color: '#e9e1cc', padding: '22px 0',
        borderInlineEnd: `1px solid rgba(0,0,0,0.06)`,
      }}>
        <div style={{ padding: '0 22px 22px', borderBottom: '1px solid rgba(232,217,182,0.10)' }}>
          <div style={{ fontFamily: T.serif, fontSize: 18 }}>אורבך · ירדן</div>
          <Eyebrow color="rgba(232,217,182,0.55)" style={{ marginTop: 4 }}>Admin Console v3.2</Eyebrow>
        </div>
        {groups.map(g => (
          <div key={g.title} style={{ padding: '20px 14px 8px' }}>
            <div style={{
              fontFamily: T.mono, fontSize: 9.5, letterSpacing: '0.22em',
              color: 'rgba(232,217,182,0.4)', padding: '0 8px 10px',
            }}>
              {g.title.toUpperCase()}
            </div>
            {g.items.map(it => {
              const active = it.id === current;
              return (
                <div key={it.id} style={{
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
                  {it.count && (
                    <span style={{
                      background: T.gold, color: T.ink, fontSize: 10, fontWeight: 600,
                      borderRadius: 999, padding: '1px 7px',
                    }}>{it.count}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </aside>
      {/* Main */}
      <main style={{ minWidth: 0 }}>{children}</main>
    </div>
  );
}

function AdminTopbar({ title, breadcrumb, actions }) {
  return (
    <div style={{
      padding: '20px 32px', borderBottom: `1px solid ${T.rule}`,
      display: 'flex', alignItems: 'center', gap: 20, background: '#fff',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: '0.2em', color: T.inkMute, marginBottom: 6 }}>
          {breadcrumb}
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.ink, letterSpacing: '-0.01em' }}>
          {title}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {actions}
      </div>
    </div>
  );
}

function AdminBtn({ children, primary, ghost, style = {} }) {
  const base = {
    fontFamily: T.sans, fontSize: 13, padding: '9px 16px',
    border: `1px solid ${T.rule}`, background: '#fff', color: T.ink,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    borderRadius: 2,
  };
  if (primary) Object.assign(base, { background: T.ink, color: '#fff', borderColor: T.ink, borderInlineStart: `2px solid ${T.gold}` });
  if (ghost) Object.assign(base, { background: 'transparent', border: 'none' });
  return <button style={{ ...base, ...style }}>{children}</button>;
}

// ────────────────────────────────────────────────────────────────────────────
// Export to window so component files in other <script>s see them
// ────────────────────────────────────────────────────────────────────────────
Object.assign(window, {
  T, Placeholder, GoldRule, Eyebrow, Kicker,
  SiteHeader, SiteFooter, ScrollTopFab,
  AdminShell, AdminTopbar, AdminBtn,
});
