import { T } from '../tokens'
import { Eyebrow, GoldRule, Placeholder } from '../Shared'
import { SiteHeader, SiteFooter } from '../Shared'
import { ScrollTopFab } from '../ScrollTopFab'

const TIMELINE = [
  { year: '1998', event: 'הקמת המשרד בתל אביב — התמחות ראשונית במשפט מסחרי' },
  { year: '2002', event: 'קבלת רישוי New York State Bar — הרחבה לעסקאות חוצות גבולות' },
  { year: '2010', event: 'פתיחת מחלקת היי-טק — ליווי גיוסי הון בסדר גודל של מיליארד ₪' },
  { year: '2018', event: 'הכרה ב-Chambers Global Tier 1 — ראשונה למשרד בגודלנו' },
  { year: '2024', event: 'Dun\'s 100 — מובחר · Legal500 Top Tier · 38 עורכי דין' },
]

const AWARDS = ['Chambers Global', 'Legal 500', 'Dun\'s 100', 'IFLR1000', 'Best Lawyers']

const PARTNERS = [
  { name: 'עו״ד יונתן אורבך', role: 'שותף מייסד · ראש מחלקת M&A', spec: 'עסקאות חוצות גבולות, מיזוגים ורכישות' },
  { name: 'עו״ד מיכל ירדן', role: 'שותפה מייסדת · ראש מחלקת חברות', spec: 'דיני חברות, ממשל תאגידי' },
  { name: 'עו״ד רון שפירא', role: 'שותף · ראש מחלקת היי-טק', spec: 'גיוסי הון, ESOP, Delaware' },
  { name: 'עו״ד נועה לביא', role: 'שותפה · ראש מחלקת ליטיגציה', spec: 'בוררות בינלאומית, בתי משפט כלכליים' },
]

export function FirmScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans }}>
      <SiteHeader current="firm" />

      {/* HERO */}
      <section style={{ padding: '80px 56px 90px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', borderBottom: `1px solid ${T.rule}` }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <GoldRule length={28} />
            <Eyebrow>Index · 01 — המשרד</Eyebrow>
          </div>
          <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 72, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
            רבע מאה של<br />
            <em style={{ color: T.goldDeep }}>ייצוג בשיקול דעת.</em>
          </h1>
          <p style={{ marginTop: 28, maxWidth: 520, fontSize: 17, lineHeight: 1.75, color: T.inkSoft }}>
            משרד בוטיק שהוקם ב-1998 עם אמונה אחת: לקוח אחד ראוי לתשומת הלב של שותף — לא של עוזר. כיום 38 עורכי דין ו-4 שותפים מובילים מייצגים יחידים, מנהלים בכירים, קרנות ותאגידים בעסקאות ובסכסוכים בעלי משמעות.
          </p>
        </div>
        <Placeholder label="firm exterior · 4:3" height={460} tone="cool" />
      </section>

      {/* METRICS */}
      <section style={{ padding: '36px 56px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${T.rule}`, background: T.paperCool }}>
        {[
          { n: '26', l: 'שנות פעילות' },
          { n: '38', l: 'עורכי דין במשרד' },
          { n: '4.2B₪', l: 'בהיקף עסקאות 2025' },
          { n: 'Tier 1', l: 'Chambers Global · 2025' },
        ].map((m, i) => (
          <div key={i} style={{ paddingInlineStart: 20, borderInlineStart: i === 0 ? 'none' : `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: T.serif, fontSize: 36, color: T.ink, letterSpacing: '-0.02em' }}>{m.n}</div>
            <div style={{ fontSize: 12, color: T.inkMute, marginTop: 4, letterSpacing: '0.02em' }}>{m.l}</div>
          </div>
        ))}
      </section>

      {/* PHILOSOPHY */}
      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${T.rule}`, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
        <div>
          <Eyebrow>Index · 02 — פילוסופיה</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 36, margin: '16px 0 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            בוטיק, לא קונגלומרט.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {[
            { t: 'שותף בכל עסקה', b: 'אין העברות לעוזרים. השותף הרלוונטי נוכח בכל ישיבה, קורא כל חוזה.' },
            { t: 'עומק, לא רוחב', b: 'שישה תחומים בלבד — כולם בדרגת הביצוע הגבוהה ביותר בישראל.' },
            { t: 'שקיפות מחירים', b: 'תמחור ברור מראש. ללא הפתעות. ללא חשבוניות שמגיעות אחרי.' },
            { t: 'ניגוד עניינים אפס', b: 'בוחרים לקוחות, לא צוברים. זה מה שמאפשר לנו לייצג אתכם בעוצמה.' },
          ].map(p => (
            <div key={p.t} style={{ paddingInlineStart: 16, borderInlineStart: `2px solid ${T.goldSoft}` }}>
              <div style={{ fontFamily: T.serif, fontSize: 20, color: T.ink, marginBottom: 10 }}>{p.t}</div>
              <div style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.7 }}>{p.b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '80px 56px', background: T.ink, color: '#f1ecdf', borderBottom: `1px solid ${T.rule}` }}>
        <Eyebrow color={T.goldSoft}>Index · 03 — ציר הזמן</Eyebrow>
        <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 36, margin: '16px 0 48px', letterSpacing: '-0.02em', color: '#f1ecdf' }}>
          26 שנה של <em style={{ color: T.goldSoft }}>צמיחה עקבית.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {TIMELINE.map((t, i) => (
            <div key={t.year} style={{
              display: 'grid', gridTemplateColumns: '96px 1fr',
              gap: 32, paddingBottom: 32,
              borderInlineStart: i < TIMELINE.length - 1 ? `1px solid rgba(232,217,182,0.2)` : 'none',
              paddingInlineStart: 32, marginInlineStart: 96,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', insetInlineStart: -9, top: 4,
                width: 16, height: 16, borderRadius: '50%',
                background: T.gold, border: `2px solid ${T.ink}`,
              }} />
              <div style={{ fontFamily: T.serif, fontSize: 22, color: T.goldSoft, letterSpacing: '-0.01em', position: 'absolute', insetInlineStart: -96, top: 0 }}>{t.year}</div>
              <div style={{ fontSize: 15, color: 'rgba(241,236,223,0.8)', lineHeight: 1.65, gridColumn: '1 / -1' }}>{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section style={{ padding: '56px', background: T.paperCool, borderBottom: `1px solid ${T.rule}` }}>
        <Eyebrow>Index · 04 — הוקרה ודירוגים</Eyebrow>
        <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          {AWARDS.map(a => (
            <div key={a} style={{
              fontFamily: T.serif, fontSize: 22, color: T.inkSoft, fontStyle: 'italic',
              paddingInlineEnd: 32, borderInlineEnd: `1px solid ${T.rule}`,
            }}>{a}</div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section style={{ padding: '80px 56px 90px', borderTop: `1px solid ${T.rule}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <Eyebrow>Index · 05 — השותפים</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 40, margin: '14px 0 0', letterSpacing: '-0.02em' }}>
              ארבעה שותפים. <em style={{ color: T.goldDeep }}>נקודת מבט אחת.</em>
            </h2>
          </div>
          <a href="/team" style={{ fontSize: 13, color: T.ink, borderBottom: `1px solid ${T.gold}`, textDecoration: 'none', paddingBottom: 4 }}>
            כל הצוות →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
          {PARTNERS.map(p => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0, border: `1px solid ${T.rule}`, overflow: 'hidden' }}>
              <Placeholder label="portrait" height={220} tone="cool" />
              <div style={{ padding: '24px 22px', background: T.paperCool, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                <div style={{ fontFamily: T.serif, fontSize: 22, color: T.ink }}>{p.name}</div>
                <Eyebrow color={T.goldDeep}>{p.role}</Eyebrow>
                <div style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.6, marginTop: 4 }}>{p.spec}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  )
}
