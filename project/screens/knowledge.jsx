// knowledge.jsx — Knowledge Card (AI-optimized topic page) + Contact

function KnowledgeScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans, position: 'relative' }}>
      <SiteHeader current="knowledge" />

      {/* Breadcrumb + AI signal strip */}
      <div style={{ padding: '20px 56px 0', fontSize: 12, color: T.inkMute, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span>בית</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
          <span>מאגר ידע</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
          <span>מבני התאגדות</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
          <span style={{ color: T.ink }}>Delaware C-Corp ליזם ישראלי</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Eyebrow color={T.goldDeep}>◈ Knowledge Card · K/14</Eyebrow>
          <Eyebrow color={T.inkMute}>JSON-LD ✓ &nbsp; FAQ ✓ &nbsp; AI-Ready ✓</Eyebrow>
        </div>
      </div>

      {/* Header */}
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

      {/* Body: ToC + content + meta sidebar */}
      <section style={{ padding: 56, display: 'grid', gridTemplateColumns: '200px 1fr 280px', gap: 40, alignItems: 'start' }}>
        {/* ToC */}
        <aside>
          <Eyebrow>תוכן עניינים</Eyebrow>
          <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', fontSize: 13, lineHeight: 2 }}>
            {['תשובה קצרה', 'מתי זה רלוונטי', 'יתרונות מבני', 'חסרונות ועלות', 'השוואת מס', 'דוגמא מספרית', 'שאלות נפוצות'].map((t, i) => (
              <li key={i} style={{ color: i === 0 ? T.ink : T.inkMute, borderInlineEnd: i === 0 ? `2px solid ${T.gold}` : 'none', paddingInlineEnd: 12 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, marginInlineEnd: 8, color: T.gold }}>{String(i+1).padStart(2,'0')}</span>{t}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <article>
          {/* TL;DR / AI answer block */}
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

          {/* Comparison table */}
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

          {/* FAQ */}
          <h2 style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 400, margin: '48px 0 16px' }}>שאלות נפוצות</h2>
          {[
            ['מה זה פליפ (Flip)?', 'הליך בו חברה ישראלית הופכת לחברת-בת של חברה אמריקאית חדשה. ההליך כרוך באירוע מס פוטנציאלי ועלות משפטית-חשבונאית של 35,000–80,000 $.'],
            ['האם הקמת C-Corp פוגעת בהטבות סעיף 102?', 'כן, אם המייסדים הופכים לעובדי החברה האמריקאית. יש לבחון את עיתוי המעבר ביחס לתוכנית האופציות.'],
            ['מהו מס Franchise של Delaware?', 'מס שנתי החל על כל תאגיד מואגד ב-Delaware, מינימום 175 $ ומגיע עד עשרות אלפי דולרים בהתאם למבנה ההון.'],
          ].map(([q, a], i) => (
            <div key={i} style={{ padding: '20px 0', borderTop: `1px solid ${T.rule}` }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <Eyebrow color={T.gold} style={{ flexShrink: 0, marginTop: 4 }}>Q{String(i+1).padStart(2,'0')}</Eyebrow>
                <div>
                  <div style={{ fontFamily: T.serif, fontSize: 19, color: T.ink }}>{q}</div>
                  <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.75, color: T.inkSoft }}>{a}</p>
                </div>
              </div>
            </div>
          ))}
        </article>

        {/* Right rail — semantic meta + cite */}
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
                <a key={i} style={{ display: 'block', fontSize: 13.5, color: T.ink, lineHeight: 1.5, borderTop: i === 0 ? 'none' : `1px solid ${T.ruleSoft}`, paddingTop: i === 0 ? 0 : 12 }}>
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
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function ContactScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans, position: 'relative' }}>
      <SiteHeader current="contact" />

      <section style={{ padding: '64px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <Eyebrow>Index · 06 — יצירת קשר</Eyebrow>
          <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 72, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '14px 0 0' }}>
            פגישה ראשונה,<br/>
            <em style={{ color: T.goldDeep }}>בדיסקרטיות מלאה.</em>
          </h1>
          <p style={{ marginTop: 22, maxWidth: 460, fontSize: 16, lineHeight: 1.75, color: T.inkSoft }}>
            פגישת היכרות נמשכת כשעה ומתקיימת במשרדנו בתל אביב או באמצעות שיחה
            מאובטחת. השותף הרלוונטי לנושא ילווה את הפגישה אישית.
          </p>

          {/* Contact lines */}
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              ['כתובת', 'מגדל אלרוב · רחוב ויצמן 2, קומה 32 · תל אביב 6423902'],
              ['טלפון', '03-720-1898'],
              ['דוא״ל', 'office@auerbach-yarden.co.il'],
              ['שעות', 'ימים א׳–ה׳ · 08:30–19:00'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24, alignItems: 'baseline', borderBottom: `1px solid ${T.rule}`, paddingBottom: 16 }}>
                <Eyebrow>{k}</Eyebrow>
                <div style={{ fontFamily: T.serif, fontSize: 18, color: T.ink }} dir={k === 'דוא״ל' || k === 'טלפון' ? 'ltr' : 'rtl'}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div style={{ background: T.paperCool, padding: 36, borderTop: `2px solid ${T.gold}` }}>
          <Eyebrow>בקשת ייעוץ ראשוני</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, margin: '10px 0 28px', letterSpacing: '-0.01em' }}>
            ספרו לנו במשפט מה הסוגיה.
          </h2>

          <div style={{ display: 'grid', gap: 18 }}>
            {[
              ['שם מלא', 'דנה כהן'],
              ['חברה / תפקיד', 'מייסדת ומנכ״לית · Acme.ai'],
              ['דוא״ל', 'dana@acme.ai'],
              ['טלפון', '050-0000000'],
            ].map(([l, p]) => (
              <label key={l} style={{ display: 'block' }}>
                <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
                <input defaultValue={p} style={{
                  width: '100%', marginTop: 8, padding: '12px 0',
                  background: 'transparent', border: 'none', borderBottom: `1px solid ${T.rule}`,
                  fontFamily: T.sans, fontSize: 15, color: T.ink, outline: 'none',
                  borderInlineStart: 'none', borderInlineEnd: 'none', borderTop: 'none',
                  direction: 'rtl',
                }} />
              </label>
            ))}

            <label>
              <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>תחום הסוגיה</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {['M&A', 'גיוס הון', 'דיני עבודה', 'ליטיגציה', 'נדל״ן', 'אחר'].map((t, i) => (
                  <span key={t} style={{
                    padding: '7px 14px', fontSize: 12, border: `1px solid ${T.rule}`,
                    background: i === 1 ? T.ink : 'transparent', color: i === 1 ? T.paper : T.inkSoft,
                  }}>{t}</span>
                ))}
              </div>
            </label>

            <label>
              <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>תיאור הסוגיה</span>
              <textarea defaultValue="אנחנו בעיצומו של גיוס Series A בהובלת קרן אמריקאית. נדרש ייעוץ לגבי מבנה אופציות לעובדים, פליפ אפשרי ובחינת הסכם המייסדים הקיים." style={{
                width: '100%', marginTop: 8, padding: 14, minHeight: 100,
                background: T.paper, border: `1px solid ${T.rule}`,
                fontFamily: T.sans, fontSize: 14, color: T.ink, outline: 'none', resize: 'none',
                direction: 'rtl', lineHeight: 1.65,
              }} />
            </label>

            <button style={{
              marginTop: 8, background: T.ink, color: '#fff',
              padding: '16px 24px', fontSize: 13, letterSpacing: '0.06em',
              border: 'none', cursor: 'pointer', borderInlineStart: `2px solid ${T.gold}`,
              fontFamily: T.sans,
            }}>שליחת בקשה · נחזור בתוך 24 שעות &nbsp;→</button>

            <div style={{ fontSize: 11, color: T.inkMute, lineHeight: 1.6 }}>
              שליחת הטופס אינה יוצרת יחסי עו״ד–לקוח. כל פנייה נשמרת בדיסקרטיות מלאה ומועברת לשותף הרלוונטי בלבד.
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
      <ScrollTopFab />
    </div>
  );
}

window.KnowledgeScreen = KnowledgeScreen;
window.ContactScreen = ContactScreen;
