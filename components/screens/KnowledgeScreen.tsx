import { T } from '../tokens'
import { Eyebrow } from '../Shared'
import { SiteHeader, SiteFooter } from '../Shared'
import { ScrollTopFab } from '../ScrollTopFab'

export function KnowledgeScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans }}>
      <SiteHeader current="knowledge" />

      <div style={{ padding: '20px 56px 0', fontSize: 12, color: T.inkMute, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span>בית</span>
          <span style={{ margin: '0 8px', color: T.gold }}>›</span>
          <span>מאגר ידע</span>
          <span style={{ margin: '0 8px', color: T.gold }}>›</span>
          <span>מבני התאגדות</span>
          <span style={{ margin: '0 8px', color: T.gold }}>›</span>
          <span style={{ color: T.ink }}>Delaware C-Corp ליזם ישראלי</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Eyebrow color={T.goldDeep}>◈ Knowledge Card · K/14</Eyebrow>
          <Eyebrow color={T.inkMute}>JSON-LD ✓ &nbsp; FAQ ✓ &nbsp; AI-Ready ✓</Eyebrow>
        </div>
      </div>

      <section style={{ padding: '36px 56px 40px', borderBottom: `1px solid ${T.rule}` }}>
        <Eyebrow>Topic · מבני התאגדות / Delaware C-Corp</Eyebrow>
        <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 60, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '14px 0 0', maxWidth: 980 }}>
          מתי כדאי ליזם ישראלי להקים <em style={{ color: T.goldDeep }}>Delaware C-Corp</em> בשלב הסיד?
        </h1>
        <div style={{ display: 'flex', gap: 24, marginTop: 22, fontSize: 12.5, color: T.inkMute, alignItems: 'center' }}>
          <span>נכתב ע״י <span style={{ color: T.ink }}>עו״ד מאיה ירדן</span></span>
          <span>·</span>
          <span>עודכן 14.03.2026</span>
          <span>·</span>
          <span>קריאה · 9 דק׳</span>
          <span>·</span>
          <span>4 הפניות לפסיקה</span>
        </div>
      </section>

      <section style={{ padding: 56, display: 'grid', gridTemplateColumns: '200px 1fr 280px', gap: 40, alignItems: 'start' }}>
        <aside>
          <Eyebrow>תוכן עניינים</Eyebrow>
          <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', fontSize: 13, lineHeight: 2 }}>
            {['תשובה קצרה', 'מתי זה רלוונטי', 'יתרונות מבני', 'חסרונות ועלות', 'השוואת מס', 'דוגמא מספרית', 'שאלות נפוצות'].map((t, i) => (
              <li key={i} style={{ color: i === 0 ? T.ink : T.inkMute, borderInlineEnd: i === 0 ? `2px solid ${T.gold}` : 'none', paddingInlineEnd: 12 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, marginInlineEnd: 8, color: T.gold }}>{String(i + 1).padStart(2, '0')}</span>{t}
              </li>
            ))}
          </ul>
        </aside>

        <article>
          <div style={{ background: T.goldFaint, padding: '24px 28px', borderInlineStart: `3px solid ${T.gold}`, marginBottom: 36 }}>
            <Eyebrow color={T.goldDeep}>תשובה קצרה · TL;DR</Eyebrow>
            <p style={{ marginTop: 10, fontFamily: T.serif, fontSize: 19, lineHeight: 1.55, color: T.ink }}>
              ברוב המקרים — לא בשלב הסיד. הקמת C-Corp ב-Delaware הופכת לכדאית כשהחברה מצפה
              להכניס משקיע אמריקאי מוסדי בסיבוב Series A או מאוחר יותר, או כשפעילותה המהותית
              עוברת לארה״ב. הקמה מוקדמת מדי גוררת עלויות ציות גבוהות ומורכבות מס ללא תועלת מקבילה.
            </p>
          </div>

          <h2 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, margin: '40px 0 12px' }}>מתי זה רלוונטי</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: T.inkSoft }}>
            ההחלטה על מבנה ההתאגדות היא אחת ההחלטות שיש לה השפעה ארוכת-טווח על
            עלויות החברה, על אופן גיוס ההון ועל מיסוי המייסדים. בשנים האחרונות עולה
            הציפיה מצד משקיעים אמריקאים שהחברה תהיה Delaware C-Corp, אך חשוב להבחין
            בין דרישה אמיתית לבין הרגל.
          </p>

          <div style={{ marginTop: 32, border: `1px solid ${T.rule}`, background: T.paper }}>
            <div style={{ padding: '14px 20px', borderBottom: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between' }}>
              <Eyebrow>השוואה — חברה ישראלית מול Delaware C-Corp</Eyebrow>
              <Eyebrow color={T.inkMute}>טבלה 01/04</Eyebrow>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: T.paperCool, textAlign: 'right' }}>
                  <th style={{ padding: '12px 20px', fontWeight: 500, color: T.inkMute, fontSize: 11, letterSpacing: '0.1em' }}>פרמטר</th>
                  <th style={{ padding: '12px 20px', fontWeight: 500, color: T.inkMute, fontSize: 11, letterSpacing: '0.1em' }}>חברה ישראלית בע״מ</th>
                  <th style={{ padding: '12px 20px', fontWeight: 500, color: T.inkMute, fontSize: 11, letterSpacing: '0.1em' }}>Delaware C-Corp</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['עלות הקמה', '~4,000–7,000 ₪', '~3,500–6,000 $'],
                  ['ציות שנתי', 'דו״ח שנתי + מס', 'Franchise Tax + Form 1120'],
                  ['מס חברות', '23% (ישראל)', '21% (פדרלי)'],
                  ['מס דיבידנד למייסד יחיד', '25–30%', 'עד 37% + Withholding'],
                  ['מקובל למשקיעי VC אמריקאים', 'דרישה לפליפ ב-Series A', 'מבנה ברירת מחדל'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${T.ruleSoft}` }}>
                    <td style={{ padding: '12px 20px', color: T.inkSoft }}>{r[0]}</td>
                    <td style={{ padding: '12px 20px' }}>{r[1]}</td>
                    <td style={{ padding: '12px 20px' }}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, margin: '48px 0 16px' }}>שאלות נפוצות</h2>
          {[
            ['מה זה פליפ (Flip)?', 'הליך בו חברה ישראלית הופכת לחברת-בת של חברה אמריקאית חדשה. ההליך כרוך באירוע מס פוטנציאלי ועלות משפטית-חשבונאית של 35,000–80,000 $.'],
            ['האם הקמת C-Corp פוגעת בהטבות סעיף 102?', 'כן, אם המייסדים הופכים לעובדי החברה האמריקאית. יש לבחון את עיתוי המעבר ביחס לתוכנית האופציות.'],
            ['מהו מס Franchise של Delaware?', 'מס שנתי החל על כל תאגיד מואגד ב-Delaware, מינימום 175 $ ומגיע עד עשרות אלפי דולרים בהתאם למבנה ההון.'],
          ].map(([q, a], i) => (
            <div key={i} style={{ padding: '20px 0', borderTop: `1px solid ${T.rule}` }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <Eyebrow color={T.gold} style={{ flexShrink: 0, marginTop: 4 }}>Q{String(i + 1).padStart(2, '0')}</Eyebrow>
                <div>
                  <div style={{ fontFamily: T.serif, fontSize: 19, color: T.ink }}>{q}</div>
                  <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.75, color: T.inkSoft }}>{a}</p>
                </div>
              </div>
            </div>
          ))}
        </article>

        <aside style={{ position: 'sticky', top: 24 }}>
          <div style={{ background: T.ink, color: '#e9e1cc', padding: 22 }}>
            <Eyebrow color={T.goldSoft}>◈ AI Knowledge Card</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 18, color: '#fff', marginTop: 10, lineHeight: 1.3 }}>
              מאמר זה מסומן כיחידת ידע עצמאית, ניתנת לציטוט ע״י מנועי AI.
            </div>
            <div style={{ marginTop: 18, fontSize: 11.5, lineHeight: 2, color: 'rgba(233,225,204,0.7)', fontFamily: T.mono, letterSpacing: '0.04em' }}>
              <div>schema · LegalService + FAQPage</div>
              <div>entity · LegalEntityStructure</div>
              <div>tone · Warm & Advisory</div>
              <div>tier · Topical Authority L2</div>
              <div>last-crawl · 14.03.26</div>
            </div>
          </div>

          <div style={{ marginTop: 18, padding: 20, border: `1px solid ${T.rule}` }}>
            <Eyebrow>מאמרי המשך</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['פליפ ל-Delaware: מדריך מעשי', 'אופציות 102 לעובדים בארה״ב', 'מבני CFC בעידן Pillar Two'].map((t, i) => (
                <a key={i} href="/knowledge" style={{ display: 'block', fontSize: 13.5, color: T.ink, lineHeight: 1.5, borderTop: i === 0 ? 'none' : `1px solid ${T.ruleSoft}`, paddingTop: i === 0 ? 0 : 12, textDecoration: 'none' }}>
                  <span style={{ color: T.gold, fontFamily: T.mono, fontSize: 10, marginInlineEnd: 8 }}>→</span>{t}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  )
}
