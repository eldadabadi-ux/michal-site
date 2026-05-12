// practice.jsx — Practice Area / Service detail page
function PracticeScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans, position: 'relative' }}>
      <SiteHeader current="practice" />

      {/* Breadcrumb */}
      <div style={{ padding: '20px 56px 0', fontSize: 12, color: T.inkMute }}>
        <span>בית</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span>תחומי התמחות</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span style={{ color: T.ink }}>מיזוגים ורכישות</span>
      </div>

      {/* Header */}
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

      {/* Two-column body: ToC sidebar + content */}
      <section style={{ padding: '56px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56 }}>
        <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
          <Eyebrow>על הדף הזה</Eyebrow>
          <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', fontSize: 13.5, lineHeight: 2 }}>
            {[
              ['01', 'גישת המשרד', true],
              ['02', 'שלבי העסקה'],
              ['03', 'מבני מס'],
              ['04', 'עסקאות נבחרות'],
              ['05', 'הצוות המוביל'],
              ['06', 'שאלות נפוצות'],
            ].map(([n, l, a]) => (
              <li key={n} style={{ color: a ? T.ink : T.inkMute, borderInlineEnd: a ? `2px solid ${T.gold}` : 'none', paddingInlineEnd: 12 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, marginInlineEnd: 8, color: T.gold }}>{n}</span>{l}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 32, padding: 18, background: T.paperCool, borderInlineStart: `2px solid ${T.gold}` }}>
            <Eyebrow>פנייה ישירה</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>עו״ד יונתן אורבך</div>
            <div style={{ fontSize: 12, color: T.inkMute, marginTop: 4 }}>שותף · ראש מחלקת M&A</div>
            <a style={{ display: 'block', marginTop: 14, fontSize: 12, color: T.goldDeep, borderBottom: `1px solid ${T.gold}`, paddingBottom: 3 }}>
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

          {/* Stages — bento-like row */}
          <div style={{ marginTop: 48 }}>
            <Eyebrow>02 — שלבי העסקה</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 18 }}>
              {[
                ['01', 'מיפוי וייעוץ אסטרטגי', '2–4 שבועות'],
                ['02', 'בדיקת נאותות מלאה',     '4–8 שבועות'],
                ['03', 'משא ומתן והסכמים',      '6–12 שבועות'],
                ['04', 'סגירה ואינטגרציה',     '2–6 שבועות'],
              ].map(([n, t, d]) => (
                <div key={n} style={{ padding: 18, border: `1px solid ${T.rule}`, background: T.paper }}>
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.gold, letterSpacing: '0.18em' }}>STAGE · {n}</div>
                  <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 10 }}>{t}</div>
                  <div style={{ fontSize: 11.5, color: T.inkMute, marginTop: 8 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Representative deals */}
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
                  ['2025', 'מיזוג שתי קרנות הון-סיכון', 'ייצוג המתמזגות', '620M$'],
                  ['2024', 'רכישת רשת קמעונאית', 'ייצוג הרוכש', '410M₪'],
                  ['2024', 'גיוס Series C — חברת AI', 'ייצוג החברה', '85M$'],
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
  );
}

// team.jsx — Attorney bio
function TeamScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans, position: 'relative' }}>
      <SiteHeader current="team" />
      <section style={{ padding: '40px 56px 0', fontSize: 12, color: T.inkMute }}>
        <span>בית</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
        <span>הצוות</span> <span style={{ margin: '0 8px', color: T.gold }}>›</span>
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

          {/* Quick facts strip */}
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
            <span><span style={{ color: T.gold, fontFamily: T.mono, fontSize: 11 }}>★</span> Dun’s 100 · Hall of Fame 2023</span>
          </div>
        </div>
      </section>
      <SiteFooter />
      <ScrollTopFab />
    </div>
  );
}

window.PracticeScreen = PracticeScreen;
window.TeamScreen = TeamScreen;
