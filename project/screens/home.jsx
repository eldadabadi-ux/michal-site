// home.jsx — Public homepage with hero + bento grid
// Bento is structured so each entity (Services, Team, Expertise, Insights)
// reads as a discrete semantic block for AI scrapers.

function HomeScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans, position: 'relative' }}>
      <SiteHeader current="home" />

      {/* ── HERO ── */}
      <section style={{
        padding: '90px 56px 100px',
        display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64,
        alignItems: 'end', borderBottom: `1px solid ${T.rule}`,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <GoldRule length={28} />
            <Eyebrow>Index · 01 — מי אנחנו</Eyebrow>
          </div>
          <h1 style={{
            fontFamily: T.serif, fontWeight: 400, fontSize: 86, lineHeight: 1.02,
            letterSpacing: '-0.025em', margin: 0, color: T.ink,
          }}>
            ייצוג משפטי<br />
            ב<em style={{ color: T.goldDeep, fontStyle: 'italic' }}>שיקול דעת</em><br />
            של רבע מאה.
          </h1>
          <p style={{
            marginTop: 32, maxWidth: 540, fontSize: 17, lineHeight: 1.7,
            color: T.inkSoft,
          }}>
            משרד בוטיק הפועל בצומת שבין משפט מסחרי, חברות והיי-טק. מלווים יזמים,
            מנהלים בכירים, קרנות ותאגידים בעסקאות חוצות גבולות, מבני מס מורכבים
            וסכסוכים בעלי משמעות.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <a style={{
              background: T.ink, color: '#fff', padding: '16px 26px',
              fontSize: 13, letterSpacing: '0.06em', textDecoration: 'none',
              borderInlineStart: `2px solid ${T.gold}`,
            }}>קביעת ייעוץ ראשוני &nbsp;&nbsp;→</a>
            <a style={{
              color: T.ink, padding: '16px 8px', fontSize: 13, letterSpacing: '0.06em',
              textDecoration: 'none', borderBottom: `1px solid ${T.ink}`,
            }}>צפו בתחומי ההתמחות</a>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Placeholder label="firm portrait · 4:5" height={560} />
          <div style={{
            position: 'absolute', bottom: 24, insetInlineStart: -28,
            background: T.paper, padding: '18px 22px', maxWidth: 280,
            boxShadow: T.shadowMd, borderInlineStart: `2px solid ${T.gold}`,
          }}>
            <Eyebrow>קליינטל</Eyebrow>
            <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: T.inkSoft }}>
              מייצגים 11 מתוך 50 החברות הציבוריות המובילות במדד ת״א ועשרות קרנות הון-סיכון.
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section style={{
        padding: '36px 56px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: `1px solid ${T.rule}`, background: T.paperCool,
      }}>
        {[
          { n: '26', l: 'שנות פעילות' },
          { n: '38', l: 'עורכי דין במשרד' },
          { n: '4.2B₪', l: 'בהיקף עסקאות 2025' },
          { n: 'Tier 1', l: 'Chambers Global · 2025' },
        ].map((m, i) => (
          <div key={i} style={{
            paddingInlineStart: 20, borderInlineStart: i === 0 ? 'none' : `1px solid ${T.rule}`,
          }}>
            <div style={{ fontFamily: T.serif, fontSize: 36, color: T.ink, letterSpacing: '-0.02em' }}>{m.n}</div>
            <div style={{ fontSize: 12, color: T.inkMute, marginTop: 4, letterSpacing: '0.02em' }}>{m.l}</div>
          </div>
        ))}
      </section>

      {/* ── BENTO ── */}
      <section style={{ padding: '90px 56px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <Eyebrow>Index · 02 — מפת המשרד</Eyebrow>
            <h2 style={{
              fontFamily: T.serif, fontWeight: 400, fontSize: 44, margin: '14px 0 0',
              letterSpacing: '-0.02em',
            }}>
              ארבעה תחומים. <em style={{ color: T.goldDeep }}>נקודת מבט אחת.</em>
            </h2>
          </div>
          <a style={{ fontSize: 13, color: T.ink, borderBottom: `1px solid ${T.gold}`, textDecoration: 'none', paddingBottom: 4 }}>
            כל תחומי ההתמחות &nbsp;→
          </a>
        </div>

        {/* Bento grid — each tile is one semantic entity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridAutoRows: '180px',
          gap: 14,
        }}>
          {/* Big — Services overview */}
          <BentoTile span="span 3 / span 3" rows="span 2" dark>
            <BentoIdx>S/01</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 32, lineHeight: 1.15, marginTop: 8, color: '#f1ecdf' }}>
              דיני חברות,<br/>מסחר ועסקאות
            </div>
            <p style={{ color: 'rgba(241,236,223,0.65)', fontSize: 14, lineHeight: 1.65, marginTop: 14 }}>
              ליווי שוטף של דירקטוריונים, מבני בעלות ועסקאות חוצות גבולות —
              משלב המו״מ ועד הסגירה.
            </p>
            <BentoFoot color={T.goldSoft}>4 שותפים · 12 עו״ד · מחלקה</BentoFoot>
          </BentoTile>

          {/* M&A */}
          <BentoTile span="span 2 / span 2" rows="span 1" tone="cream">
            <BentoIdx>S/02</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 22, marginTop: 8 }}>מיזוגים ורכישות</div>
            <p style={{ fontSize: 13, color: T.inkSoft, marginTop: 6, lineHeight: 1.6 }}>
              עסקאות אסטרטגיות בהיקפים של עד 1.4 מיליארד ש״ח.
            </p>
          </BentoTile>

          {/* Litigation */}
          <BentoTile span="span 1 / span 1" rows="span 1">
            <BentoIdx>S/03</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>ליטיגציה<br/>מסחרית</div>
          </BentoTile>

          {/* Insight — single article */}
          <BentoTile span="span 2 / span 2" rows="span 2" gold>
            <BentoIdx color={T.goldDeep}>K/14</BentoIdx>
            <Eyebrow color={T.goldDeep} style={{ marginTop: 8 }}>מאגר ידע — Knowledge Card</Eyebrow>
            <div style={{ fontFamily: T.serif, fontSize: 24, lineHeight: 1.25, marginTop: 12, color: T.ink }}>
              מתי כדאי ליזם ישראלי להקים <em>Delaware C-Corp</em> בשלב הסיד?
            </div>
            <p style={{ fontSize: 13, color: T.inkSoft, marginTop: 12, lineHeight: 1.6 }}>
              ניתוח השלכות המס, הציפיות של משקיעים בארה״ב, ועלות התחזוקה ביחס להתאגדות ישראלית.
            </p>
            <BentoFoot color={T.goldDeep}>קריאה · 9 דק׳ &nbsp;&nbsp;→</BentoFoot>
          </BentoTile>

          {/* Hi-tech */}
          <BentoTile span="span 1 / span 1" rows="span 1">
            <BentoIdx>S/04</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>היי-טק<br/>והשקעות</div>
          </BentoTile>

          {/* Real estate */}
          <BentoTile span="span 1 / span 1" rows="span 1">
            <BentoIdx>S/05</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>נדל״ן<br/>ותכנון</div>
          </BentoTile>

          {/* Partner spotlight */}
          <BentoTile span="span 2 / span 2" rows="span 1" image>
            <Placeholder label="partner portrait" height={180} style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'relative', padding: 8 }}>
              <Eyebrow color={T.goldSoft}>שותף · ראש מחלקה</Eyebrow>
              <div style={{ fontFamily: T.serif, fontSize: 22, color: '#fff', marginTop: 8 }}>
                עו״ד יונתן אורבך
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                M&A · עסקאות חוצות גבולות
              </div>
            </div>
          </BentoTile>

          {/* Press / Recognition */}
          <BentoTile span="span 2 / span 2" rows="span 1" tone="cream">
            <Eyebrow>הוקרה</Eyebrow>
            <div style={{ display: 'flex', gap: 22, marginTop: 14, flexWrap: 'wrap' }}>
              {['Chambers', 'Legal500', 'Dun’s 100', 'IFLR'].map(p => (
                <div key={p} style={{ fontFamily: T.serif, fontSize: 18, color: T.inkSoft, fontStyle: 'italic' }}>{p}</div>
              ))}
            </div>
          </BentoTile>
        </div>
      </section>

      {/* ── EXPERTISE / TOPICAL AUTHORITY KNOWLEDGE CARDS ── */}
      <section style={{
        padding: '60px 56px 100px', background: T.paperCool,
        borderTop: `1px solid ${T.rule}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <Eyebrow>Index · 03 — מאגר ידע</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 38, margin: '14px 0 0', letterSpacing: '-0.02em' }}>
              שאלות שמוכרעות אצלנו, בלי לשלם.
            </h2>
            <p style={{ maxWidth: 560, fontSize: 15, color: T.inkSoft, marginTop: 10, lineHeight: 1.7 }}>
              מאגר ממוקם ומפותח עבור קוראים וגם עבור מנועי חיפוש מבוססי-AI. כל מאמר עומד כיחידת ידע עצמאית, סכמטית, ניתנת לציטוט.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
            { id: 'K/12', topic: 'מיסוי אופציות לעובדים', q: 'מהו סעיף 102 הוני, ולמי הוא מתאים?', read: '6 דק׳' },
            { id: 'K/14', topic: 'מבני התאגדות', q: 'מתי כדאי להקים Delaware C-Corp לעומת חברה ישראלית?', read: '9 דק׳' },
            { id: 'K/17', topic: 'הסכמי הקמה', q: 'אילו סעיפי Vesting להכניס להסכם מייסדים?', read: '5 דק׳' },
          ].map(k => (
            <article key={k.id} style={{
              background: T.paper, padding: '28px 26px 24px', borderTop: `2px solid ${T.gold}`,
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 260,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Eyebrow>{k.topic}</Eyebrow>
                <Eyebrow color={T.inkMute}>{k.id}</Eyebrow>
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1.3, color: T.ink, flex: 1 }}>
                {k.q}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: T.inkMute }}>
                <span>קריאה · {k.read}</span>
                <span style={{ color: T.goldDeep, borderBottom: `1px solid ${T.gold}`, paddingBottom: 2 }}>אל המאמר →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CONTACT BLOCK — mirrored at homepage bottom ── */}
      <section style={{
        padding: '80px 56px 90px', background: T.paper,
        borderTop: `1px solid ${T.rule}`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          {/* Left — invitation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <GoldRule length={28} />
              <Eyebrow>Index · 04 — יצירת קשר</Eyebrow>
            </div>
            <h2 style={{
              fontFamily: T.serif, fontWeight: 400, fontSize: 56, lineHeight: 1.05,
              letterSpacing: '-0.025em', margin: 0,
            }}>
              נציג אתכם<br />
              <em style={{ color: T.goldDeep }}>למשרד המתאים.</em>
            </h2>
            <p style={{ marginTop: 22, maxWidth: 460, fontSize: 17, lineHeight: 1.75, color: T.inkSoft }}>
              פגישת היכרות נמשכת כשעה ומתקיימת במשרדנו בתל אביב
              או בשיחה מאובטחת. השותף הרלוונטי לנושא ילווה את הפגישה אישית.
            </p>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                ['כתובת',  'מגדל אלרוב · רחוב ויצמן 2, קומה 32 · תל אביב'],
                ['טלפון',  '03-720-1898'],
                ['דוא״ל',   'office@auerbach-yarden.co.il'],
                ['שעות',   'ימים א׳–ה׳ · 08:30–19:00'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr', gap: 22,
                  alignItems: 'baseline',
                  borderBottom: `1px solid ${T.rule}`, paddingBottom: 14,
                }}>
                  <Eyebrow>{k}</Eyebrow>
                  <div
                    style={{ fontFamily: T.serif, fontSize: 17, color: T.ink }}
                    dir={k === 'דוא״ל' || k === 'טלפון' ? 'ltr' : 'rtl'}
                  >{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: T.paperCool, padding: 36, borderTop: `2px solid ${T.gold}` }}>
            <Eyebrow>בקשת ייעוץ ראשוני</Eyebrow>
            <h3 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 26, margin: '10px 0 24px', letterSpacing: '-0.01em' }}>
              שלחו פנייה — נחזור תוך 24 שעות.
            </h3>
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['שם מלא', 'שם לדוגמה'], ['טלפון', '050-0000000']].map(([l, p]) => (
                  <label key={l} style={{ display: 'block' }}>
                    <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
                    <input placeholder={p} style={{
                      width: '100%', marginTop: 8, padding: '12px 0',
                      background: 'transparent', border: 'none', borderBottom: `1px solid ${T.rule}`,
                      fontFamily: T.sans, fontSize: 15, color: T.ink, outline: 'none', direction: 'rtl',
                    }} />
                  </label>
                ))}
              </div>
              {[
                ['דוא״ל',           'name@company.com'],
                ['תחום הסוגיה',     'בחרו מהרשימה'],
              ].map(([l, p]) => (
                <label key={l} style={{ display: 'block' }}>
                  <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
                  <input placeholder={p} style={{
                    width: '100%', marginTop: 8, padding: '12px 0',
                    background: 'transparent', border: 'none', borderBottom: `1px solid ${T.rule}`,
                    fontFamily: T.sans, fontSize: 15, color: T.ink, outline: 'none', direction: 'rtl',
                  }} />
                </label>
              ))}
              <label>
                <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>במשפט אחד — תארו את הסוגיה</span>
                <textarea placeholder="מליו בקצרה — מה הסיתואצה ומה צריך להתרחש הלאה..." style={{
                  width: '100%', marginTop: 8, padding: 14, minHeight: 92,
                  background: T.paper, border: `1px solid ${T.rule}`,
                  fontFamily: T.sans, fontSize: 14, color: T.ink, outline: 'none', resize: 'none',
                  direction: 'rtl', lineHeight: 1.65,
                }} />
              </label>
              <button style={{
                marginTop: 8, background: T.ink, color: '#fff',
                padding: '15px 24px', fontSize: 14, letterSpacing: '0.05em',
                border: 'none', cursor: 'pointer', borderInlineStart: `2px solid ${T.gold}`,
                fontFamily: T.sans, fontWeight: 500,
              }}>שליחת בקשה →</button>
              <div style={{ fontSize: 11, color: T.inkMute, lineHeight: 1.6 }}>
                שליחת הטופס אינה יוצרת יחסי עו״ד–לקוח. כל פנייה נשמרת בדיסקרטיות מלאה.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  );
}

// Bento helpers ──────────────────────────────────────────────────────────────
function BentoTile({ children, span, rows, dark, gold, tone, image }) {
  const bg = dark ? T.ink : gold ? T.goldFaint : tone === 'cream' ? T.paperCool : T.paper;
  const fg = dark ? '#f1ecdf' : T.ink;
  return (
    <div style={{
      gridColumn: span, gridRow: rows,
      background: bg, color: fg, padding: image ? 0 : '22px 22px 20px',
      position: 'relative', overflow: 'hidden',
      border: dark || gold ? 'none' : `1px solid ${T.rule}`,
      display: 'flex', flexDirection: 'column',
    }}>
      {children}
    </div>
  );
}
function BentoIdx({ children, color = T.gold }) {
  return <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.2em', color }}>{children}</span>;
}
function BentoFoot({ children, color = T.inkMute }) {
  return (
    <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 11.5, letterSpacing: '0.04em', color }}>
      {children}
    </div>
  );
}

window.HomeScreen = HomeScreen;
