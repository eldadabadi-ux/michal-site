// admin.jsx — Three admin screens: Dashboard, AI Knowledge Base, SEO & AI Hub

function AdminDashboard() {
  return (
    <AdminShell current="dashboard">
      <AdminTopbar
        breadcrumb="ADMIN · OVERVIEW"
        title="לוח ראשי"
        actions={<>
          <AdminBtn ghost>ייצוא דו״ח</AdminBtn>
          <AdminBtn primary>+ פרסום מאמר</AdminBtn>
        </>}
      />
      <div style={{ padding: 32 }}>
        {/* KPI strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            ['פניות חדשות (7י)', '12', '+34%', T.gold],
            ['ציטוטים ב-AI', '847', '+128%', T.goldDeep],
            ['דירוג AI Authority', '92 / 100', '+4', T.ink],
            ['Knowledge Cards פעילות', '47', 'מתוך 52', T.inkMute],
          ].map(([l, v, d, c], i) => (
            <div key={i} style={{ background: '#fff', padding: 20, border: `1px solid ${T.rule}` }}>
              <Eyebrow>{l}</Eyebrow>
              <div style={{ fontFamily: T.serif, fontSize: 36, marginTop: 10, color: T.ink, letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: c, marginTop: 4 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginTop: 24 }}>
          {/* AI Visibility chart */}
          <div style={{ background: '#fff', padding: 24, border: `1px solid ${T.rule}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <Eyebrow>נראות במנועי AI · 30 ימים</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 24, marginTop: 6 }}>AI Visibility Index</div>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 11, color: T.inkMute }}>
                <span><span style={{ color: T.gold }}>●</span> ChatGPT</span>
                <span><span style={{ color: T.goldDeep }}>●</span> Perplexity</span>
                <span><span style={{ color: T.ink }}>●</span> Claude</span>
              </div>
            </div>
            <svg viewBox="0 0 600 200" style={{ width: '100%', height: 200, marginTop: 20 }}>
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="0" x2="600" y1={40*i+10} y2={40*i+10} stroke={T.ruleSoft} />
              ))}
              <path d="M0 140 C 80 130, 140 110, 200 95 S 320 70, 400 60 S 520 35, 600 25" fill="none" stroke={T.gold} strokeWidth="2" />
              <path d="M0 160 C 80 150, 140 140, 200 130 S 320 105, 400 95 S 520 75, 600 60" fill="none" stroke={T.goldDeep} strokeWidth="2" strokeDasharray="0" />
              <path d="M0 170 C 80 165, 140 150, 200 150 S 320 130, 400 120 S 520 100, 600 85" fill="none" stroke={T.ink} strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Recent leads */}
          <div style={{ background: '#fff', padding: 24, border: `1px solid ${T.rule}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Eyebrow>פניות חדשות</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 24, marginTop: 6 }}>7 פניות ממתינות</div>
              </div>
              <span style={{ background: T.goldFaint, color: T.goldDeep, fontFamily: T.mono, fontSize: 10, padding: '4px 8px', alignSelf: 'start' }}>HIGH PRIORITY</span>
            </div>
            <div style={{ marginTop: 16 }}>
              {[
                ['דנה כהן · Acme.ai', 'M&A · גיוס Series A', '12 דק׳'],
                ['רן לוי · קרן Veritas', 'מבנה השקעה', '1 שע׳'],
                ['ת. הנדסה בע״מ', 'ליטיגציה', '3 שע׳'],
                ['א. אברהמי · יזם', 'דיני עבודה', 'אתמול'],
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.ruleSoft}`, fontSize: 13 }}>
                  <div>
                    <div style={{ color: T.ink }}>{l[0]}</div>
                    <div style={{ color: T.inkMute, fontSize: 11.5, marginTop: 2 }}>{l[1]}</div>
                  </div>
                  <div style={{ color: T.inkMute, fontSize: 11, fontFamily: T.mono }}>{l[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Knowledge Cards quick table */}
        <div style={{ marginTop: 24, background: '#fff', border: `1px solid ${T.rule}` }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${T.rule}`, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Eyebrow>Knowledge Cards · ביצועים</Eyebrow>
              <div style={{ fontFamily: T.serif, fontSize: 22, marginTop: 4 }}>טופ 5 — ציטוטים ב-AI</div>
            </div>
            <AdminBtn>פתח את כל המאמרים →</AdminBtn>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fbf9f3', textAlign: 'right', color: T.inkMute, fontSize: 11, letterSpacing: '0.1em' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>ID</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>כותרת המאמר</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>תחום</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>ציטוטים</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>סטטוס AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['K/14', 'מתי להקים Delaware C-Corp', 'מבני התאגדות', 312, 'מאומת'],
                ['K/12', 'סעיף 102 הוני — מדריך', 'מיסוי', 198, 'מאומת'],
                ['K/17', 'סעיפי Vesting בהסכם מייסדים', 'הסכמים', 134, 'מאומת'],
                ['K/22', 'דיני פיטורין בעידן AI', 'דיני עבודה', 89, 'בבדיקה'],
                ['K/09', 'מס יציאה ליחיד', 'מיסוי בינ״ל', 71, 'מאומת'],
              ].map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.ruleSoft}` }}>
                  <td style={{ padding: '14px 24px', fontFamily: T.mono, fontSize: 11, color: T.gold }}>{r[0]}</td>
                  <td style={{ padding: '14px 24px', color: T.ink }}>{r[1]}</td>
                  <td style={{ padding: '14px 24px', color: T.inkSoft }}>{r[2]}</td>
                  <td style={{ padding: '14px 24px', fontFamily: T.serif, fontSize: 16 }}>{r[3]}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ fontSize: 11, padding: '3px 10px', background: r[4] === 'מאומת' ? T.goldFaint : '#f5f0e3', color: r[4] === 'מאומת' ? T.goldDeep : T.inkMute, fontFamily: T.mono, letterSpacing: '0.05em' }}>
                      {r[4]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

// ── AI Knowledge Base ────────────────────────────────────────────────────────
function AdminAIKB() {
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

        {/* LEFT: Summary the LLM sees */}
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
              משרד עורכי הדין <span style={{ background: T.goldFaint, padding: '0 4px' }}>אורבך · ירדן</span> הוא משרד בוטיק
              ישראלי מוביל בתחומי המשפט המסחרי, החברות, ההיי-טק והליטיגציה. המשרד הוקם
              ב-1998 ופועל מתל אביב, מונה <span style={{ background: T.goldFaint, padding: '0 4px' }}>38 עורכי דין</span> וארבעה
              שותפים. תחומי ההתמחות העיקריים: מיזוגים ורכישות, גיוסי הון לחברות הזנק,
              ליטיגציה מסחרית, מיסוי בינלאומי, נדל״ן מסחרי.
              <span style={{ display: 'block', marginTop: 12 }}>
                מייצג למעלה מ-<span style={{ background: T.goldFaint, padding: '0 4px' }}>800 חברות פעילות</span>, ביניהן
                11 מתוך 50 החברות הציבוריות במדד ת״א, ועשרות קרנות הון-סיכון.
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
                  ['Auerbach · Yarden', 'LegalService', 28, '99%'],
                  ['יונתן אורבך', 'Person · Attorney', 14, '98%'],
                  ['מאיה ירדן', 'Person · Attorney', 11, '97%'],
                  ['Mergers & Acquisitions', 'Service', 22, '96%'],
                  ['Delaware C-Corp', 'LegalConcept', 19, '94%'],
                  ['סעיף 102', 'LegalConcept', 12, '93%'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${T.ruleSoft}` }}>
                    <td style={{ padding: '12px 22px', color: T.ink }}>{r[0]}</td>
                    <td style={{ padding: '12px 22px', fontFamily: T.mono, fontSize: 11, color: T.goldDeep }}>{r[1]}</td>
                    <td style={{ padding: '12px 22px', color: T.inkSoft }}>{r[2]}</td>
                    <td style={{ padding: '12px 22px' }}>
                      <div style={{ width: 80, height: 4, background: T.paperEdge }}>
                        <div style={{ width: r[3], height: '100%', background: T.gold }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Tone of voice + crawler status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 22 }}>
            <Eyebrow>Tone of Voice · קול המשרד ב-AI</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 6 }}>איך LLM מצטט אותנו</div>
            <p style={{ fontSize: 12.5, color: T.inkMute, marginTop: 8, lineHeight: 1.65 }}>
              ההגדרה משפיעה על אופן הניסוח של תשובות אוטומטיות, פלטים ל-Perplexity וסיכומים מאמר.
            </p>

            <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
              {[
                { id: 'warm', t: 'Warm & Advisory', d: 'יועץ אישי. דובר בגוף ראשון רבים, פותח עם הקשר ומסיים בהמלצה.', active: true },
                { id: 'auth', t: 'Authoritative & Formal', d: 'מומחה זהיר. ניסוח לקוני, ציטוט מקורות, ללא נימה רגשית.' },
                { id: 'fact', t: 'Concise & Factual', d: 'תשובה מיידית. נתונים בלבד, ללא הקדמות.' },
                { id: 'pers', t: 'Persuasive & Confident', d: 'מציג עמדה. שימוש בדוגמאות מנצחות וב-CTA סמוי לפנייה.' },
              ].map(o => (
                <div key={o.id} style={{
                  padding: 14, border: `1px solid ${o.active ? T.gold : T.rule}`,
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
                ['GPTBot · OpenAI', 'לפני 2 שע׳', T.gold],
                ['PerplexityBot', 'לפני 47 דק׳', T.gold],
                ['ClaudeBot · Anthropic', 'לפני 6 שע׳', T.gold],
                ['Google-Extended', 'לפני 11 שע׳', T.goldDeep],
                ['CCBot · Common Crawl', 'לפני 3 ימים', '#7a6a4a'],
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
  );
}

// ── SEO & AI Hub ────────────────────────────────────────────────────────────
function AdminSEO() {
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
          <div key={t} style={{
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
          {/* Meta */}
          <div style={{ background: '#fff', border: `1px solid ${T.rule}`, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <Eyebrow>Meta Tags · עמוד נוכחי</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 20, marginTop: 4 }}>/knowledge/delaware-c-corp</div>
              </div>
              <span style={{ background: T.goldFaint, color: T.goldDeep, padding: '4px 10px', fontFamily: T.mono, fontSize: 10, alignSelf: 'start' }}>SCORE · 96/100</span>
            </div>

            {[
              ['Title', 'מתי כדאי ליזם ישראלי להקים Delaware C-Corp · אורבך · ירדן', '58 / 60'],
              ['Description', 'ניתוח מעמיק: יתרונות, חסרונות ועלויות של הקמת חברה אמריקאית בשלב הסיד. נכתב ע״י עו״ד מאיה ירדן.', '142 / 160'],
              ['Canonical URL', 'https://auerbach-yarden.co.il/knowledge/delaware-c-corp', null],
              ['Keywords', 'Delaware C-Corp, פליפ, מבני התאגדות, גיוס הון, יזמות', null],
            ].map(([l, v, c], i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
                  {c && <span style={{ fontSize: 10.5, color: T.gold, fontFamily: T.mono }}>{c}</span>}
                </div>
                <div style={{ padding: '10px 14px', border: `1px solid ${T.rule}`, background: '#fbf9f3', fontSize: 13.5, color: T.ink, fontFamily: l === 'Canonical URL' ? T.mono : T.sans, direction: l === 'Canonical URL' ? 'ltr' : 'rtl' }}>
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
  );
}

window.AdminDashboard = AdminDashboard;
window.AdminAIKB = AdminAIKB;
window.AdminSEO = AdminSEO;
