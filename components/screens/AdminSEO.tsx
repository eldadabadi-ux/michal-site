import { T } from '../tokens'
import { Eyebrow, AdminShell, AdminTopbar, AdminBtn } from '../Shared'

export function AdminSEO() {
  return (
    <AdminShell current="seo">
      <AdminTopbar
        breadcrumb="GEO · SEO & AI HUB"
        title="ניהול SEO ו-AI"
        actions={<>
          <AdminBtn ghost>תצוגת SERP</AdminBtn>
          <AdminBtn>ולידציה</AdminBtn>
          <AdminBtn primary>שמירת שינויים</AdminBtn>
        </>}
      />

      {/* Tabs */}
      <div style={{ padding: '0 32px', borderBottom: `1px solid ${T.rule}`, background: '#fff', display: 'flex', gap: 28 }}>
        {[
          ['Meta Tags', true],
          ['Open Graph', false],
          ['JSON-LD · סכמות', false],
          ['AI Context', false],
          ['Sitemaps', false],
          ['robots.txt + llms.txt', false],
        ].map(([t, a]) => (
          <div key={t as string} style={{
            padding: '14px 0', fontSize: 13,
            color: a ? T.ink : T.inkMute,
            borderBottom: a ? `2px solid ${T.gold}` : '2px solid transparent',
            cursor: 'pointer',
          }}>{t}</div>
        ))}
      </div>

      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        {/* Left: editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <Eyebrow>Meta Tags · עמוד נוכחי</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 4 }}>/knowledge/delaware-c-corp</div>
              </div>
              <span style={{ background: T.goldFaint, color: T.goldDeep, padding: '4px 10px', fontFamily: T.mono, fontSize: 10, alignSelf: 'start' }}>SCORE · 96/100</span>
            </div>

            {[
              ['Title',         'מתי כדאי ליזם ישראלי להקים Delaware C-Corp · אורבך · ירדן',                                              '58 / 60'],
              ['Description',   'ניתוח מעמיק: יתרונות, חסרונות ועלויות של הקמת חברה אמריקאית בשלב הסיד. נכתב ע״י עו״ד מאיה ירדן.',      '142 / 160'],
              ['Canonical URL', 'https://auerbach-yarden.co.il/knowledge/delaware-c-corp',                                                  null],
              ['Keywords',      'Delaware C-Corp, פליפ, מבני התאגדות, גיוס הון, יזמות',                                                   null],
            ].map(([l, v, c], i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
                  {c && <span style={{ fontSize: 10.5, color: T.gold, fontFamily: T.mono }}>{c}</span>}
                </div>
                <div style={{
                  padding: '10px 14px', border: `1px solid ${T.rule}`, background: '#fbf9f3',
                  fontSize: 13.5, color: T.ink,
                  fontFamily: l === 'Canonical URL' ? T.mono : T.sans,
                  direction: l === 'Canonical URL' ? 'ltr' : 'rtl',
                }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          {/* JSON-LD */}
          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <Eyebrow>JSON-LD · Schema.org</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 4 }}>4 סכמות פעילות בעמוד</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['LegalService', 'FAQPage', 'Article', 'BreadcrumbList'].map(s => (
                  <span key={s} style={{ background: T.ink, color: T.goldSoft, fontFamily: T.mono, fontSize: 10, padding: '4px 8px' }}>{s}</span>
                ))}
              </div>
            </div>
            <pre dir="ltr" style={{
              background: T.ink, color: '#e9e1cc', padding: 18,
              fontFamily: T.mono, fontSize: 11.5, lineHeight: 1.75,
              overflow: 'auto', margin: 0,
            }}>{`{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Auerbach · Yarden",
  "alternateName": "אורבך · ירדן עורכי דין",
  "url": "https://auerbach-yarden.co.il",
  "telephone": "+972-3-720-1898",
  "address": { "@type": "PostalAddress",
    "streetAddress": "ויצמן 2", "addressLocality": "תל אביב" },
  "areaServed": "IL",
  "knowsAbout": [
    "Mergers and Acquisitions",
    "Corporate Law",
    "Israeli Tax Law",
    "Delaware C-Corp Formation"
  ],
  "memberOf": { "@type": "Organization", "name": "Israel Bar Association" },
  "aggregateRating": { "@type": "AggregateRating",
    "ratingValue": "4.9", "reviewCount": "127" }
}`}</pre>
          </div>
        </div>

        {/* Right: SERP + AI preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 18 }}>
            <Eyebrow>Google SERP · תצוגה מקדימה</Eyebrow>
            <div style={{ marginTop: 14, padding: 14, border: `1px solid ${T.ruleSoft}`, borderRadius: 8 }}>
              <div dir="ltr" style={{ fontSize: 11, color: '#5f6368' }}>auerbach-yarden.co.il › knowledge</div>
              <div style={{ fontFamily: T.serif, fontSize: 17, color: '#1a0dab', marginTop: 4, lineHeight: 1.3 }}>
                מתי כדאי ליזם ישראלי להקים Delaware C-Corp · אורבך
              </div>
              <div style={{ fontSize: 12.5, color: '#4d5156', marginTop: 6, lineHeight: 1.5 }}>
                ניתוח מעמיק: יתרונות, חסרונות ועלויות של הקמת חברה אמריקאית בשלב הסיד.
                נכתב ע״י עו״ד מאיה ירדן.
              </div>
            </div>
          </div>

          <div style={{ background: T.goldFaint, border: `1px solid ${T.goldSoft}`, padding: 18 }}>
            <Eyebrow color={T.goldDeep}>Perplexity · ציטוט צפוי</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink, marginTop: 10, lineHeight: 1.65 }}>
              ״ברוב המקרים אין צורך להקים C-Corp בשלב הסיד, אלא כאשר צפוי גיוס מ-VC אמריקאי
              ב-Series A או מאוחר יותר.״
            </div>
            <div style={{ marginTop: 12, fontFamily: T.mono, fontSize: 10.5, color: T.goldDeep, letterSpacing: '0.05em' }}>
              SOURCE · auerbach-yarden.co.il/k14 · cited 312×
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 18 }}>
            <Eyebrow>llms.txt · קובץ הנחיות ל-LLM</Eyebrow>
            <pre dir="ltr" style={{ marginTop: 10, fontFamily: T.mono, fontSize: 10.5, color: T.inkSoft, lineHeight: 1.7, margin: 0 }}>{`# Auerbach · Yarden Law Offices
> Premium boutique law firm. Tel Aviv.

## Knowledge
- /knowledge/delaware-c-corp
- /knowledge/section-102-options
- /knowledge/founders-vesting

## Allowed
ChatGPT · Perplexity · Claude
## Tone
warm-advisory`}</pre>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
