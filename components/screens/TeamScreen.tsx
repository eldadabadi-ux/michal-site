import { T } from '../tokens'
import { Placeholder, Eyebrow } from '../Shared'
import { SiteHeader, SiteFooter } from '../Shared'
import { ScrollTopFab } from '../ScrollTopFab'

export function TeamScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans }}>
      <SiteHeader current="team" />

      <section style={{ padding: '40px 56px 0', fontSize: 12, color: T.inkMute }}>
        <span>בית</span>
        <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span>הצוות</span>
        <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span style={{ color: T.ink }}>עו״ד יונתן אורבך</span>
      </section>

      <section style={{ padding: '36px 56px 64px', display: 'grid', gridTemplateColumns: '420px 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <Placeholder label="portrait · 4:5" height={520} />
          <div style={{ padding: '24px 0', borderBottom: `1px solid ${T.rule}` }}>
            <Eyebrow>קליק לפנייה ישירה</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              <span dir="ltr" style={{ color: T.ink, alignSelf: 'flex-end' }}>+972 3 720 1898</span>
              <span dir="ltr" style={{ color: T.goldDeep, alignSelf: 'flex-end' }}>j.auerbach@auerbach-yarden.co.il</span>
            </div>
          </div>
        </div>

        <div>
          <Eyebrow>שותף מייסד · ראש מחלקת M&A</Eyebrow>
          <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 64, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '12px 0 6px' }}>
            עו״ד יונתן<br />אורבך
          </h1>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 18, color: T.inkMute }}>
            Jonathan Auerbach · Founding Partner
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40, paddingTop: 24, borderTop: `1px solid ${T.rule}` }}>
            {[
              ['חברות', 'לשכת עוה״ד · 1998'],
              ['הסמכה', 'NY Bar · 2002'],
              ['השכלה', 'LL.B תל אביב · LL.M NYU'],
              ['שפות', 'עברית · אנגלית · צרפתית'],
            ].map(([k, v]) => (
              <div key={k}>
                <Eyebrow>{k}</Eyebrow>
                <div style={{ marginTop: 6, fontSize: 13.5, color: T.ink, lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 26, margin: '48px 0 14px', letterSpacing: '-0.01em' }}>
            תחומי עיסוק
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: T.inkSoft, maxWidth: 640 }}>
            מוביל את מחלקת המיזוגים והרכישות של המשרד מאז הקמתו. ליווה למעלה
            מ-200 עסקאות אסטרטגיות בהיקפים של מאות מיליוני ועד מיליארדי דולרים,
            מול קרנות בינלאומיות, תאגידים מובילים וחברות פורטפוליו של קרנות הון-סיכון.
            מומחה במבני מס בינ״ל ובעסקאות חוצות גבולות.
          </p>

          <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 22, margin: '40px 0 14px' }}>הוקרה</h2>
          <div style={{ display: 'flex', gap: 28, fontSize: 13, color: T.inkSoft, flexWrap: 'wrap' }}>
            <span><span style={{ color: T.gold, fontFamily: T.mono, fontSize: 11 }}>★</span> Chambers · Band 1, M&A 2024–2025</span>
            <span><span style={{ color: T.gold, fontFamily: T.mono, fontSize: 11 }}>★</span> Legal 500 · Leading Individual</span>
            <span><span style={{ color: T.gold, fontFamily: T.mono, fontSize: 11 }}>★</span> Dun&apos;s 100 · Hall of Fame 2023</span>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  )
}
