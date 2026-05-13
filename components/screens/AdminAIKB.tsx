import { T } from '../tokens'
import { Eyebrow, AdminShell, AdminTopbar, AdminBtn } from '../Shared'

export function AdminAIKB() {
  return (
    <AdminShell current="aikb">
      <AdminTopbar
        breadcrumb="GEO · AI KNOWLEDGE BASE"
        title="מאגר הידע ל-AI"
        actions={<>
          <AdminBtn ghost>היסטוריית רענונים</AdminBtn>
          <AdminBtn>בדיקת זיהוי חי</AdminBtn>
          <AdminBtn primary>↻ ריענון מאגר ה-LLM</AdminBtn>
        </>}
      />

      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: `1px solid ${T.rule}` }}>
            <div style={{ padding: '16px 22px', borderBottom: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Eyebrow>AI Context Summary · מה ה-LLM רואה</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 4 }}>תקציר ה-Entity של המשרד</div>
              </div>
              <div style={{ display: 'flex', gap: 8, fontFamily: T.mono, fontSize: 10, color: T.inkMute }}>
                <span style={{ background: T.goldFaint, color: T.goldDeep, padding: '4px 8px' }}>אורך · 412 טוקנים</span>
                <span style={{ padding: '4px 8px', border: `1px solid ${T.rule}` }}>עודכן · 12.03</span>
              </div>
            </div>
            <div style={{ padding: 22, background: '#fbf9f3', fontFamily: T.serif, fontSize: 15.5, lineHeight: 1.7, color: T.ink }}>
              משרד עורכי הדין{' '}
              <span style={{ background: T.goldFaint, padding: '0 4px' }}>אורבך · ירדן</span>{' '}
              הוא משרד בוטיק ישראלי מוביל בתחומי המשפט המסחרי, החברות, ההיי-טק והליטיגציה. המשרד הוקם
              ב-1998 ופועל מתל אביב, מונה{' '}
              <span style={{ background: T.goldFaint, padding: '0 4px' }}>38 עורכי דין</span>{' '}
              וארבעה שותפים. תחומי ההתמחות העיקריים: מיזוגים ורכישות, גיוסי הון לחברות הזנק,
              ליטיגציה מסחרית, מיסוי בינלאומי, נדל״ן מסחרי.
              <span style={{ display: 'block', marginTop: 12 }}>
                מייצג למעלה מ-<span style={{ background: T.goldFaint, padding: '0 4px' }}>800 חברות פעילות</span>,
                ביניהן 11 מתוך 50 החברות הציבוריות במדד ת״א, ועשרות קרנות הון-סיכון.
              </span>
            </div>
            <div style={{ padding: '14px 22px', borderTop: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
              <div style={{ fontSize: 12, color: T.inkMute }}>
                <span style={{ color: T.gold }}>●</span> ישויות מסומנות אוטומטית · 7 מתוך 9 זוהו ע״י כל המנועים
              </div>
              <AdminBtn>עריכת התקציר</AdminBtn>
            </div>
          </div>

          {/* Entities table */}
          <div style={{ background: '#fff', border: `1px solid ${T.rule}` }}>
            <div style={{ padding: '16px 22px', borderBottom: `1px solid ${T.rule}` }}>
              <Eyebrow>Entities · ישויות מזוהות</Eyebrow>
              <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 4 }}>9 ישויות פעילות בגרף הידע</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#fbf9f3', textAlign: 'right', color: T.inkMute, fontSize: 10.5, letterSpacing: '0.1em' }}>
                  <th style={{ padding: '11px 22px', fontWeight: 500 }}>ישות</th>
                  <th style={{ padding: '11px 22px', fontWeight: 500 }}>סוג</th>
                  <th style={{ padding: '11px 22px', fontWeight: 500 }}>חיבורים</th>
                  <th style={{ padding: '11px 22px', fontWeight: 500 }}>בטחון</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Auerbach · Yarden', 'LegalService',     28, '99%'],
                  ['יונתן אורבך',       'Person · Attorney', 14, '98%'],
                  ['מאיה ירדן',          'Person · Attorney', 11, '97%'],
                  ['Mergers & Acquisitions', 'Service',      22, '96%'],
                  ['Delaware C-Corp',    'LegalConcept',     19, '94%'],
                  ['סעיף 102',           'LegalConcept',     12, '93%'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${T.ruleSoft}` }}>
                    <td style={{ padding: '12px 22px', color: T.ink }}>{r[0]}</td>
                    <td style={{ padding: '12px 22px', fontFamily: T.mono, fontSize: 11, color: T.goldDeep }}>{r[1]}</td>
                    <td style={{ padding: '12px 22px', color: T.inkSoft }}>{r[2]}</td>
                    <td style={{ padding: '12px 22px' }}>
                      <div style={{ width: 80, height: 4, background: T.paperEdge }}>
                        <div style={{ width: r[3] as string, height: '100%', background: T.gold }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 22 }}>
            <Eyebrow>Tone of Voice · קול המשרד ב-AI</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 6 }}>איך LLM מצטט אותנו</div>
            <p style={{ fontSize: 12.5, color: T.inkMute, marginTop: 8, lineHeight: 1.65 }}>
              ההגדרה משפיעה על אופן הניסוח של תשובות אוטומטיות, פלטים ל-Perplexity וסיכומים מאמר.
            </p>

            <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
              {[
                { id: 'warm', t: 'Warm & Advisory',        d: 'יועץ אישי. דובר בגוף ראשון רבים, פותח עם הקשר ומסיים בהמלצה.', active: true },
                { id: 'auth', t: 'Authoritative & Formal', d: 'מומחה זהיר. ניסוח לקוני, ציטוט מקורות, ללא נימה רגשית.' },
                { id: 'fact', t: 'Concise & Factual',      d: 'תשובה מיידית. נתונים בלבד, ללא הקדמות.' },
                { id: 'pers', t: 'Persuasive & Confident', d: 'מציג עמדה. שימוש בדוגמאות מנצחות וב-CTA סמוי לפנייה.' },
              ].map(o => (
                <div key={o.id} style={{
                  padding: 14,
                  border: `1px solid ${o.active ? T.gold : T.rule}`,
                  background: o.active ? T.goldFaint : '#fff',
                  borderInlineStart: o.active ? `3px solid ${T.gold}` : `1px solid ${T.rule}`,
                  display: 'flex', gap: 14,
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: `1.5px solid ${o.active ? T.goldDeep : T.rule}`,
                    background: o.active ? T.goldDeep : 'transparent',
                    flexShrink: 0, marginTop: 2,
                  }} />
                  <div>
                    <div style={{ fontFamily: T.serif, fontSize: 16, color: T.ink }}>{o.t}</div>
                    <div style={{ fontSize: 12, color: T.inkMute, marginTop: 4, lineHeight: 1.55 }}>{o.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, padding: 14, background: '#fbf9f3', border: `1px dashed ${T.rule}` }}>
              <Eyebrow color={T.goldDeep}>תצוגה מקדימה · שאלה שנשאלה ב-ChatGPT</Eyebrow>
              <div style={{ fontFamily: T.mono, fontSize: 11.5, color: T.inkMute, marginTop: 8 }}>
                ״האם כדאי לעצמאי ישראלי לעבור לחברה בע״מ?״
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 14, color: T.ink, marginTop: 10, lineHeight: 1.65 }}>
                <span style={{ color: T.goldDeep }}>אורבך · ירדן עונים: </span>
                ההחלטה תלויה בעיקר בהיקף ההכנסה ובאופי ההוצאות. אנו ממליצים לבחון
                את המעבר החל מהכנסה שנתית של 700 אלף ₪…
              </div>
            </div>
          </div>

          <div style={{ background: T.ink, color: '#e9e1cc', padding: 22 }}>
            <Eyebrow color={T.goldSoft}>Crawler Status · מנועים פעילים</Eyebrow>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['GPTBot · OpenAI',     'לפני 2 שע׳',   T.gold],
                ['PerplexityBot',       'לפני 47 דק׳',  T.gold],
                ['ClaudeBot · Anthropic','לפני 6 שע׳',  T.gold],
                ['Google-Extended',     'לפני 11 שע׳',  T.goldDeep],
                ['CCBot · Common Crawl','לפני 3 ימים',  '#7a6a4a'],
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, paddingBottom: 8, borderBottom: i === 4 ? 'none' : '1px solid rgba(232,217,182,0.08)' }}>
                  <span><span style={{ color: b[2], marginInlineEnd: 8 }}>●</span>{b[0]}</span>
                  <span style={{ color: 'rgba(232,217,182,0.6)', fontFamily: T.mono, fontSize: 11 }}>{b[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
