import { T } from '../tokens'
import { GoldRule, Eyebrow } from '../Shared'

export function DesignSystemScreen() {
  const colors = [
    ['ink',        T.ink,        '#1d2533'],
    ['ink soft',   T.inkSoft,    '#2c3447'],
    ['ink mute',   T.inkMute,    '#5c6276'],
    ['paper',      T.paper,      '#f7f1e6'],
    ['paper cool', T.paperCool,  '#efe7d6'],
    ['paper edge', T.paperEdge,  '#e4dac3'],
    ['gold',       T.gold,       '#b08a4a'],
    ['gold deep',  T.goldDeep,   '#8a6a30'],
    ['gold soft',  T.goldSoft,   '#d9c184'],
    ['gold faint', T.goldFaint,  '#f1e8cf'],
  ]

  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: T.sans, padding: 56 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 8 }}>
        <Eyebrow>Design System · v1.0</Eyebrow>
        <GoldRule length={32} />
        <Eyebrow color={T.inkMute}>Auerbach · Yarden</Eyebrow>
      </div>
      <h1 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 64, letterSpacing: '-0.025em', margin: '8px 0 0' }}>
        מערכת העיצוב.<br /><em style={{ color: T.goldDeep }}>טוקנים, טיפוגרפיה, רכיבים.</em>
      </h1>
      <p style={{ fontSize: 15, color: T.inkSoft, maxWidth: 620, marginTop: 16, lineHeight: 1.7 }}>
        חוקי הביטוי החזותי של המשרד. אסתטיקה: מינימליזם עריכותי, סמכות שקטה, זהב מדוד.
      </p>

      {/* Typography */}
      <section style={{ marginTop: 56, borderTop: `1px solid ${T.rule}`, paddingTop: 32 }}>
        <Eyebrow>01 — Typography · טיפוגרפיה</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 24 }}>
          <div style={{ padding: 28, background: T.paperCool }}>
            <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.gold, letterSpacing: '0.2em' }}>HEADING · DISPLAY</div>
            <div style={{ fontFamily: T.sans, fontSize: 14, color: T.inkMute, marginTop: 6 }}>Frank Ruhl Libre · subs. for Playfair Display</div>
            <div style={{ fontFamily: T.serif, fontSize: 72, lineHeight: 1.05, letterSpacing: '-0.025em', marginTop: 18 }}>אורבך</div>
            <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 32, color: T.goldDeep, marginTop: 4 }}>Auerbach</div>
          </div>
          <div style={{ padding: 28, background: T.paperCool }}>
            <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.gold, letterSpacing: '0.2em' }}>BODY · UI</div>
            <div style={{ fontFamily: T.sans, fontSize: 14, color: T.inkMute, marginTop: 6 }}>Assistant · subs. for Heebo/Inter</div>
            <div style={{ fontFamily: T.sans, fontSize: 32, marginTop: 18, fontWeight: 500 }}>ייצוג משפטי</div>
            <div style={{ fontFamily: T.sans, fontSize: 15, color: T.inkSoft, marginTop: 8, lineHeight: 1.7 }}>
              גוף הטקסט הראשי, רגיל 400, גובה שורה 1.7. תומך RTL וניקוד.
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
          {[
            ['Display L', 86, 400, T.serif],
            ['Display',   64, 400, T.serif],
            ['H1',        44, 400, T.serif],
            ['H2',        28, 400, T.serif],
            ['Eyebrow',   10, 500, T.mono],
            ['Body',      15, 400, T.sans],
            ['Small',     12, 400, T.sans],
            ['Mono',      11, 500, T.mono],
          ].map(([n, s, w, f]) => (
            <div key={n as string} style={{ padding: 16, border: `1px solid ${T.rule}` }}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.inkMute, letterSpacing: '0.15em' }}>{(n as string).toUpperCase()} · {s}px</div>
              <div style={{ fontFamily: f as string, fontSize: s as number, fontWeight: w as number, marginTop: 8, letterSpacing: f === T.mono ? '0.18em' : '-0.01em', textTransform: f === T.mono ? 'uppercase' : 'none' }}>Aa אא</div>
            </div>
          ))}
        </div>
      </section>

      {/* Color */}
      <section style={{ marginTop: 56, borderTop: `1px solid ${T.rule}`, paddingTop: 32 }}>
        <Eyebrow>02 — Color · פלטה</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 24 }}>
          {colors.map(([name, val, hex]) => (
            <div key={name} style={{ border: `1px solid ${T.rule}`, background: '#fff' }}>
              <div style={{ background: val, height: 96, borderBottom: `1px solid ${T.rule}` }} />
              <div style={{ padding: 12 }}>
                <div style={{ fontFamily: T.serif, fontSize: 14 }}>{name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10.5, color: T.inkMute, letterSpacing: '0.08em', marginTop: 2 }}>{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section style={{ marginTop: 56, borderTop: `1px solid ${T.rule}`, paddingTop: 32 }}>
        <Eyebrow>03 — Components · רכיבים</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 24 }}>
          <div style={{ padding: 22, background: T.paperCool }}>
            <Eyebrow>כפתורים</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              <button style={{ background: T.ink, color: '#fff', padding: '12px 20px', border: 'none', fontFamily: T.sans, fontSize: 13, borderInlineStart: `2px solid ${T.gold}`, cursor: 'pointer' }}>פעולה ראשית →</button>
              <button style={{ background: 'transparent', color: T.ink, padding: '12px 20px', border: `1px solid ${T.ink}`, fontFamily: T.sans, fontSize: 13, cursor: 'pointer' }}>פעולה משנית</button>
              <button style={{ background: 'transparent', color: T.ink, padding: '12px 0', border: 'none', borderBottom: `1px solid ${T.gold}`, fontFamily: T.sans, fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start' }}>קישור · Underline</button>
            </div>
          </div>
          <div style={{ padding: 22, background: T.paperCool }}>
            <Eyebrow>Eyebrows</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
              <Eyebrow>Index · 01 — Section</Eyebrow>
              <Eyebrow color={T.goldDeep}>K/14 · Knowledge Card</Eyebrow>
              <Eyebrow color={T.inkMute}>Updated · 14.03.26</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <GoldRule length={28} /><Eyebrow>Rule + label</Eyebrow>
              </div>
            </div>
          </div>
          <div style={{ padding: 22, background: T.paperCool }}>
            <Eyebrow>Knowledge Card</Eyebrow>
            <div style={{ marginTop: 14, background: T.paper, padding: 18, borderTop: `2px solid ${T.gold}` }}>
              <Eyebrow color={T.inkMute}>K/14</Eyebrow>
              <div style={{ fontFamily: T.serif, fontSize: 18, marginTop: 8, lineHeight: 1.3 }}>Delaware C-Corp ליזם ישראלי</div>
              <div style={{ marginTop: 14, fontSize: 11.5, color: T.goldDeep }}>אל המאמר →</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, padding: 22, background: T.paperCool }}>
          <Eyebrow>Spacing · 4-base scale</Eyebrow>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'end' }}>
            {[4, 8, 12, 16, 24, 32, 48, 64, 96].map(s => (
              <div key={s} style={{ textAlign: 'center' }}>
                <div style={{ width: s, height: s, background: T.gold }} />
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.inkMute, marginTop: 6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wordmark */}
      <section style={{ marginTop: 56, borderTop: `1px solid ${T.rule}`, paddingTop: 32 }}>
        <Eyebrow>04 — Wordmark · לוגוטייפ</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 24 }}>
          <div style={{ padding: 48, background: T.paperCool, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: T.serif, fontSize: 52, color: T.ink, letterSpacing: '-0.01em' }}>אורבך · ירדן</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <GoldRule length={40} />
                <Eyebrow>EST · 1998 · TEL AVIV</Eyebrow>
                <GoldRule length={40} />
              </div>
            </div>
          </div>
          <div style={{ padding: 48, background: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: T.serif, fontSize: 52, color: T.paper, letterSpacing: '-0.01em' }}>אורבך · ירדן</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <GoldRule length={40} />
                <Eyebrow color={T.goldSoft}>EST · 1998 · TEL AVIV</Eyebrow>
                <GoldRule length={40} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
