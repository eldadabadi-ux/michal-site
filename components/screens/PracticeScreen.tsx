import { T } from '../tokens'
import { Placeholder, Eyebrow, GoldRule } from '../Shared'
import { SiteHeader, SiteFooter } from '../Shared'
import { ScrollTopFab } from '../ScrollTopFab'

export function PracticeScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans }}>
      <SiteHeader current="practice" />

      <div style={{ padding: '20px 56px 0', fontSize: 12, color: T.inkMute }}>
        <span>בית</span>
        <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span>תחומי התמחות</span>
        <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span style={{ color: T.ink }}>מיזוגים ורכישות</span>
      </div>

      <section style={{ padding: '36px 56px 56px', borderBottom: `1px solid ${T.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, alignItems: 'end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <Eyebrow>Service · S/02</Eyebrow>
              <GoldRule length={24} />
              <Eyebrow color={T.inkMute}>Mergers & Acquisitions</Eyebrow>
            </div>
            <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 64, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
              מיזוגים ורכישות.<br />
              <em style={{ color: T.goldDeep }}>עסקאות שמשנות חברה.</em>
            </h1>
            <p style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.75, color: T.inkSoft }}>
              ליווי מקצה לקצה בעסקאות מיזוג, רכישה ושינוי שליטה — מבדיקת נאותות וניהול
              משא ומתן, דרך מבנה המס וההסכמים המסחריים, ועד אינטגרציה לאחר הסגירה.
              צוות ייעודי בהובלת השותפים אורבך וירדן.
            </p>
          </div>
          <Placeholder label="practice cover · 4:3" height={320} />
        </div>
      </section>

      <section style={{ padding: '56px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56 }}>
        <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
          <Eyebrow>על הדף הזה</Eyebrow>
          <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', fontSize: 13.5, lineHeight: 2 }}>
            {[
              ['01', 'גישת המשרד', true],
              ['02', 'שלבי העסקה', false],
              ['03', 'מבני מס', false],
              ['04', 'עסקאות נבחרות', false],
              ['05', 'הצוות המוביל', false],
              ['06', 'שאלות נפוצות', false],
            ].map(([n, l, a]) => (
              <li key={n as string} style={{ color: a ? T.ink : T.inkMute, borderInlineEnd: a ? `2px solid ${T.gold}` : 'none', paddingInlineEnd: 12 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, marginInlineEnd: 8, color: T.gold }}>{n}</span>{l}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 32, padding: 18, background: T.paperCool, borderInlineStart: `2px solid ${T.gold}` }}>
            <Eyebrow>פנייה ישירה</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>עו״ד יונתן אורבך</div>
            <div style={{ fontSize: 12, color: T.inkMute, marginTop: 4 }}>שותף · ראש מחלקת M&A</div>
            <a href="/contact" style={{ display: 'block', marginTop: 14, fontSize: 12, color: T.goldDeep, borderBottom: `1px solid ${T.gold}`, paddingBottom: 3, textDecoration: 'none' }}>
              קביעת פגישה →
            </a>
          </div>
        </aside>

        <div>
          <Eyebrow>01 — גישת המשרד</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 32, margin: '12px 0 18px', letterSpacing: '-0.015em' }}>
            דיסקרטיות, מהירות, ושיקול דעת עסקי.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: T.inkSoft, maxWidth: 720 }}>
            עסקת M&A היא רגע שיא בחיי חברה. אנו מטפלים בעסקאות אסטרטגיות מורכבות —
            הן בצד הרוכש והן בצד הנמכר — מתוך הבנה שאחת המיומנויות החשובות של עורך
            דין בעסקה היא לדעת מתי לבלום ומתי לאפשר לעסקה להתקדם. שותפי המשרד
            מובילים את כל העסקאות באופן אישי.
          </p>

          <div style={{ marginTop: 48 }}>
            <Eyebrow>02 — שלבי העסקה</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 18 }}>
              {[
                ['01', 'מיפוי וייעוץ אסטרטגי', '2–4 שבועות'],
                ['02', 'בדיקת נאותות מלאה',     '4–8 שבועות'],
                ['03', 'משא ומתן והסכמים',      '6–12 שבועות'],
                ['04', 'סגירה ואינטגרציה',      '2–6 שבועות'],
              ].map(([n, t, d]) => (
                <div key={n} style={{ padding: 18, border: `1px solid ${T.rule}`, background: T.paper }}>
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.gold, letterSpacing: '0.18em' }}>STAGE · {n}</div>
                  <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 10 }}>{t}</div>
                  <div style={{ fontSize: 11.5, color: T.inkMute, marginTop: 8 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <Eyebrow>04 — עסקאות נבחרות</Eyebrow>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 18, fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: 'right', color: T.inkMute, fontSize: 11, letterSpacing: '0.12em' }}>
                  <th style={{ padding: '10px 0', borderBottom: `1px solid ${T.rule}`, fontWeight: 500 }}>שנה</th>
                  <th style={{ padding: '10px 0', borderBottom: `1px solid ${T.rule}`, fontWeight: 500 }}>עסקה</th>
                  <th style={{ padding: '10px 0', borderBottom: `1px solid ${T.rule}`, fontWeight: 500 }}>תפקיד המשרד</th>
                  <th style={{ padding: '10px 0', borderBottom: `1px solid ${T.rule}`, fontWeight: 500 }}>היקף</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['2025', 'מכירת חברת סייבר ישראלית לתאגיד בינ״ל', 'ייצוג המוכרים', '1.4B$'],
                  ['2025', 'מיזוג שתי קרנות הון-סיכון',               'ייצוג המתמזגות', '620M$'],
                  ['2024', 'רכישת רשת קמעונאית',                       'ייצוג הרוכש',    '410M₪'],
                  ['2024', 'גיוס Series C — חברת AI',                  'ייצוג החברה',    '85M$'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.ruleSoft}` }}>
                    <td style={{ padding: '14px 0', fontFamily: T.mono, fontSize: 12, color: T.gold }}>{r[0]}</td>
                    <td style={{ padding: '14px 0', color: T.ink }}>{r[1]}</td>
                    <td style={{ padding: '14px 0', color: T.inkSoft }}>{r[2]}</td>
                    <td style={{ padding: '14px 0', fontFamily: T.serif, color: T.ink }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  )
}
