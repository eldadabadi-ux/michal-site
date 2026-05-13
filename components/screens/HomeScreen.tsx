'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { T } from '../tokens'
import { Placeholder, GoldRule, Eyebrow } from '../Shared'
import { SiteHeader, SiteFooter } from '../Shared'
import { ScrollTopFab } from '../ScrollTopFab'

// ── Contact form ──────────────────────────────────────────────────────────────

const CATEGORIES = ['M&A', 'גיוס הון', 'דיני עבודה', 'ליטיגציה', 'נדל״ן', 'אחר']

const inputStyle: CSSProperties = {
  width: '100%', marginTop: 8, padding: '12px 0',
  background: 'transparent', border: 'none', borderBottom: `1px solid ${T.rule}`,
  fontFamily: T.sans, fontSize: 15, color: T.ink, outline: 'none', direction: 'rtl',
}

function HomeContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', category: '', description: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  if (status === 'ok') return (
    <div style={{ background: T.paperCool, padding: 36, borderTop: `2px solid ${T.gold}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 320 }}>
      <div style={{ fontFamily: T.serif, fontSize: 32, color: T.goldDeep }}>✓</div>
      <div style={{ fontFamily: T.serif, fontSize: 24, color: T.ink, textAlign: 'center' }}>תודה! קיבלנו את פנייתך.</div>
      <div style={{ fontSize: 14, color: T.inkSoft, textAlign: 'center', maxWidth: 320 }}>נחזור אליך בתוך 24 שעות. בינתיים תוכל לעיין במאגר הידע שלנו.</div>
    </div>
  )

  return (
    <form onSubmit={submit} style={{ background: T.paperCool, padding: 36, borderTop: `2px solid ${T.gold}` }}>
      <Eyebrow>בקשת ייעוץ ראשוני</Eyebrow>
      <h3 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 26, margin: '10px 0 24px', letterSpacing: '-0.01em' }}>
        שלחו פנייה — נחזור תוך 24 שעות.
      </h3>
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {([['שם מלא', 'name', 'שם לדוגמה'], ['טלפון', 'phone', '050-0000000']] as const).map(([l, k, p]) => (
            <label key={l} style={{ display: 'block' }}>
              <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</span>
              <input required={k === 'name'} placeholder={p} value={form[k as 'name' | 'phone']} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} style={inputStyle} />
            </label>
          ))}
        </div>
        <label style={{ display: 'block' }}>
          <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>דוא״ל</span>
          <input required type="email" placeholder="name@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>תחום הסוגיה</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {CATEGORIES.map(cat => (
              <span key={cat} onClick={() => setForm(f => ({ ...f, category: cat }))} style={{
                padding: '7px 14px', fontSize: 12, border: `1px solid ${T.rule}`, cursor: 'pointer',
                background: form.category === cat ? T.ink : 'transparent',
                color: form.category === cat ? T.paper : T.inkSoft,
              }}>{cat}</span>
            ))}
          </div>
        </label>
        <label>
          <span style={{ fontSize: 11.5, color: T.inkMute, letterSpacing: '0.06em', textTransform: 'uppercase' }}>במשפט אחד — תארו את הסוגיה</span>
          <textarea placeholder="תארו בקצרה — מה הסיטואציה ומה צריך להתרחש הלאה..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{
            width: '100%', marginTop: 8, padding: 14, minHeight: 92,
            background: T.paper, border: `1px solid ${T.rule}`,
            fontFamily: T.sans, fontSize: 14, color: T.ink, outline: 'none', resize: 'none',
            direction: 'rtl', lineHeight: 1.65,
          }} />
        </label>
        <button type="submit" disabled={status === 'sending'} style={{
          marginTop: 8, background: T.ink, color: '#fff',
          padding: '15px 24px', fontSize: 14, letterSpacing: '0.05em',
          border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
          borderInlineStart: `2px solid ${T.gold}`,
          fontFamily: T.sans, fontWeight: 500, opacity: status === 'sending' ? 0.7 : 1,
        }}>{status === 'sending' ? 'שולח...' : 'שליחת בקשה →'}</button>
        {status === 'err' && <div style={{ fontSize: 12, color: '#c0392b' }}>אירעה שגיאה. אנא נסו שנית או פנו אלינו ישירות.</div>}
        <div style={{ fontSize: 11, color: T.inkMute, lineHeight: 1.6 }}>
          שליחת הטופס אינה יוצרת יחסי עו״ד–לקוח. כל פנייה נשמרת בדיסקרטיות מלאה.
        </div>
      </div>
    </form>
  )
}

// ── Bento helpers ─────────────────────────────────────────────────────────────

function BentoTile({ children, span, rows, dark, gold, tone, image }: {
  children: ReactNode
  span?: string
  rows?: string
  dark?: boolean
  gold?: boolean
  tone?: string
  image?: boolean
}) {
  const bg = dark ? T.ink : gold ? T.goldFaint : tone === 'cream' ? T.paperCool : T.paper
  const fg = dark ? '#f1ecdf' : T.ink
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
  )
}

function BentoIdx({ children, color = T.gold }: { children: ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.2em', color }}>{children}</span>
  )
}

function BentoFoot({ children, color = T.inkMute }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 11.5, letterSpacing: '0.04em', color }}>
      {children}
    </div>
  )
}

// ── Home Screen ───────────────────────────────────────────────────────────────

export function HomeScreen() {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans }}>
      <SiteHeader current="home" />

      {/* HERO */}
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
          <p style={{ marginTop: 32, maxWidth: 540, fontSize: 17, lineHeight: 1.7, color: T.inkSoft }}>
            משרד בוטיק הפועל בצומת שבין משפט מסחרי, חברות והיי-טק. מלווים יזמים,
            מנהלים בכירים, קרנות ותאגידים בעסקאות חוצות גבולות, מבני מס מורכבים
            וסכסוכים בעלי משמעות.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <a href="/contact" style={{
              background: T.ink, color: '#fff', padding: '16px 26px',
              fontSize: 13, letterSpacing: '0.06em', textDecoration: 'none',
              borderInlineStart: `2px solid ${T.gold}`,
            }}>קביעת ייעוץ ראשוני &nbsp;&nbsp;→</a>
            <a href="/practice" style={{
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

      {/* METRICS STRIP */}
      <section style={{
        padding: '36px 56px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: `1px solid ${T.rule}`, background: T.paperCool,
      }}>
        {[
          { n: '26',     l: 'שנות פעילות' },
          { n: '38',     l: 'עורכי דין במשרד' },
          { n: '4.2B₪', l: 'בהיקף עסקאות 2025' },
          { n: 'Tier 1', l: 'Chambers Global · 2025' },
        ].map((m, i) => (
          <div key={i} style={{ paddingInlineStart: 20, borderInlineStart: i === 0 ? 'none' : `1px solid ${T.rule}` }}>
            <div style={{ fontFamily: T.serif, fontSize: 36, color: T.ink, letterSpacing: '-0.02em' }}>{m.n}</div>
            <div style={{ fontSize: 12, color: T.inkMute, marginTop: 4, letterSpacing: '0.02em' }}>{m.l}</div>
          </div>
        ))}
      </section>

      {/* BENTO */}
      <section style={{ padding: '90px 56px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <Eyebrow>Index · 02 — מפת המשרד</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 44, margin: '14px 0 0', letterSpacing: '-0.02em' }}>
              ארבעה תחומים. <em style={{ color: T.goldDeep }}>נקודת מבט אחת.</em>
            </h2>
          </div>
          <a href="/practice" style={{ fontSize: 13, color: T.ink, borderBottom: `1px solid ${T.gold}`, textDecoration: 'none', paddingBottom: 4 }}>
            כל תחומי ההתמחות &nbsp;→
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '180px', gap: 14 }}>
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

          <BentoTile span="span 2 / span 2" rows="span 1" tone="cream">
            <BentoIdx>S/02</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 22, marginTop: 8 }}>מיזוגים ורכישות</div>
            <p style={{ fontSize: 13, color: T.inkSoft, marginTop: 6, lineHeight: 1.6 }}>
              עסקאות אסטרטגיות בהיקפים של עד 1.4 מיליארד ש״ח.
            </p>
          </BentoTile>

          <BentoTile span="span 1 / span 1" rows="span 1">
            <BentoIdx>S/03</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>ליטיגציה<br/>מסחרית</div>
          </BentoTile>

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

          <BentoTile span="span 1 / span 1" rows="span 1">
            <BentoIdx>S/04</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>היי-טק<br/>והשקעות</div>
          </BentoTile>

          <BentoTile span="span 1 / span 1" rows="span 1">
            <BentoIdx>S/05</BentoIdx>
            <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8 }}>נדל״ן<br/>ותכנון</div>
          </BentoTile>

          <BentoTile span="span 2 / span 2" rows="span 1" image>
            <Placeholder label="partner portrait" height={180} style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'relative', padding: 8 }}>
              <Eyebrow color={T.goldSoft}>שותף · ראש מחלקה</Eyebrow>
              <div style={{ fontFamily: T.serif, fontSize: 22, color: '#fff', marginTop: 8 }}>עו״ד יונתן אורבך</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>M&A · עסקאות חוצות גבולות</div>
            </div>
          </BentoTile>

          <BentoTile span="span 2 / span 2" rows="span 1" tone="cream">
            <Eyebrow>הוקרה</Eyebrow>
            <div style={{ display: 'flex', gap: 22, marginTop: 14, flexWrap: 'wrap' }}>
              {['Chambers', 'Legal500', 'Dun\'s 100', 'IFLR'].map(p => (
                <div key={p} style={{ fontFamily: T.serif, fontSize: 18, color: T.inkSoft, fontStyle: 'italic' }}>{p}</div>
              ))}
            </div>
          </BentoTile>
        </div>
      </section>

      {/* KNOWLEDGE CARDS */}
      <section style={{ padding: '60px 56px 100px', background: T.paperCool, borderTop: `1px solid ${T.rule}` }}>
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
              <div style={{ fontFamily: T.serif, fontSize: 22, lineHeight: 1.3, color: T.ink, flex: 1 }}>{k.q}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: T.inkMute }}>
                <span>קריאה · {k.read}</span>
                <span style={{ color: T.goldDeep, borderBottom: `1px solid ${T.gold}`, paddingBottom: 2 }}>אל המאמר →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '90px 56px 80px', background: T.paper, borderTop: `1px solid ${T.rule}` }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Eyebrow>Index · 04 — תחומי התמחות</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 44, margin: '14px 0 0', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            ליווי משפטי לאורך כל מחזור<br />
            <em style={{ color: T.goldDeep }}>החיים העסקי.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { n: '01', title: 'דיני חברות', subs: ['דירקטוריון ועסקאות', 'מבני בעלות', 'חוזים מסחריים'] },
            { n: '02', title: 'מיזוגים ורכישות', subs: ['עסקאות חוצות גבולות', 'Due Diligence', 'מו״מ ומיכרז'] },
            { n: '03', title: 'ליטיגציה', subs: ['בתי משפט כלכליים', 'בוררות מסחרית', 'סכסוכי בעלי מניות'] },
            { n: '04', title: 'היי-טק', subs: ['גיוס הון ו-VC', 'אופציות לעובדים', 'הסכמי מייסדים'] },
            { n: '05', title: 'מיסוי בינלאומי', subs: ['מבני מס חוצי גבולות', 'Delaware & ישראל', 'הסכמי מס'] },
            { n: '06', title: 'נדל״ן', subs: ['עסקאות קרקע', 'תכנון ובנייה', 'ליווי השקעות'] },
          ].map(s => (
            <article key={s.n} style={{
              background: T.paperCool, overflow: 'hidden',
              border: `1px solid ${T.rule}`, display: 'flex', flexDirection: 'column',
            }}>
              <Placeholder label={`practice ${s.n}`} height={220} tone="cool" />
              <div style={{ padding: '22px 24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Eyebrow color={T.inkMute}>{s.n}</Eyebrow>
                  <GoldRule length={20} />
                  <h3 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, margin: 0, color: T.ink }}>{s.title}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {s.subs.map(sub => (
                    <div key={sub} style={{ fontSize: 13, color: T.inkSoft, paddingInlineStart: 10, borderInlineStart: `1px solid ${T.goldSoft}` }}>{sub}</div>
                  ))}
                </div>
                <div style={{ marginTop: 18, fontSize: 12, color: T.goldDeep, borderBottom: `1px solid ${T.gold}`, display: 'inline-block', paddingBottom: 2, cursor: 'pointer' }}>קראו עוד →</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 56px 90px', background: T.paperCool, borderTop: `1px solid ${T.rule}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -40, insetInlineEnd: 56,
          fontFamily: T.serif, fontSize: 320, color: T.ink, opacity: 0.05,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>״</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 44, position: 'relative' }}>
          <div>
            <Eyebrow>Index · 05 — המלצות לקוחות</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 40, margin: '14px 0 0', letterSpacing: '-0.02em' }}>
              מה הלקוחות <em style={{ color: T.goldDeep }}>אומרים.</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={T.gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.18em', color: T.inkMute }}>4.9/5 · 127 REVIEWS · GOOGLE + DUN&apos;S</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
          {[
            { name: 'דנה כהן', role: 'מנכ״לית · Acme.ai', text: 'הצוות של אורבך · ירדן ליווה אותנו בגיוס Series A מורכב. המקצועיות, הזמינות והיכולת לנווט בין עולמות משפטיים שונים היו יוצאות דופן.', topic: 'גיוס הון · היי-טק' },
            { name: 'רן לוי', role: 'מייסד · BuildTech', text: 'עסקת הרכישה שלנו כללה שלוש מדינות ומסגרות משפטיות שונות. הצוות ניהל הכל בצורה חלקה עם שקיפות מלאה לאורך כל הדרך.', topic: 'מיזוגים ורכישות' },
            { name: 'יעל אברהמי', role: 'שותפה · Orion Capital', text: 'כבר עשר שנים אנחנו עובדים עם המשרד על עסקאות נדל״ן. אין מקום אחר שנותן את רמת הדיוק, הניסיון וההבנה העסקית הזו.', topic: 'נדל״ן · השקעות' },
          ].map(t => (
            <blockquote key={t.name} style={{
              margin: 0, background: T.paper, padding: '28px 26px 24px',
              borderTop: `2px solid ${T.gold}`, border: `1px solid ${T.goldSoft}`,
              borderTopWidth: 2, display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <Eyebrow color={T.goldDeep}>{t.topic}</Eyebrow>
              <p style={{ fontFamily: T.serif, fontSize: 18, lineHeight: 1.6, color: T.ink, margin: 0, flex: 1 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ borderTop: `1px solid ${T.rule}`, paddingTop: 14 }}>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: T.ink }}>{t.name}</div>
                <div style={{ fontSize: 12, color: T.inkMute, marginTop: 3 }}>{t.role}</div>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CONTACT BLOCK */}
      <section style={{ padding: '80px 56px 90px', background: T.paper, borderTop: `1px solid ${T.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <GoldRule length={28} />
              <Eyebrow>Index · 06 — יצירת קשר</Eyebrow>
            </div>
            <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
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
                ['דוא״ל',  'office@auerbach-yarden.co.il'],
                ['שעות',   'ימים א׳–ה׳ · 08:30–19:00'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr', gap: 22, alignItems: 'baseline',
                  borderBottom: `1px solid ${T.rule}`, paddingBottom: 14,
                }}>
                  <Eyebrow>{k}</Eyebrow>
                  <div style={{ fontFamily: T.serif, fontSize: 17, color: T.ink }} dir={k === 'דוא״ל' || k === 'טלפון' ? 'ltr' : 'rtl'}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <HomeContactForm />
        </div>
      </section>

      <SiteFooter />
      <ScrollTopFab />
    </div>
  )
}
