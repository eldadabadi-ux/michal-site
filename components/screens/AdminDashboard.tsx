import { T } from '../tokens'
import { Eyebrow, AdminShell, AdminTopbar, AdminBtn } from '../Shared'

export function AdminDashboard() {
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
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" x2="600" y1={40 * i + 10} y2={40 * i + 10} stroke={T.ruleSoft} />
              ))}
              <path d="M0 140 C 80 130, 140 110, 200 95 S 320 70, 400 60 S 520 35, 600 25" fill="none" stroke={T.gold} strokeWidth="2" />
              <path d="M0 160 C 80 150, 140 140, 200 130 S 320 105, 400 95 S 520 75, 600 60" fill="none" stroke={T.goldDeep} strokeWidth="2" />
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

        {/* Knowledge Cards table */}
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
                ['K/12', 'סעיף 102 הוני — מדריך',     'מיסוי',         198, 'מאומת'],
                ['K/17', 'סעיפי Vesting בהסכם מייסדים','הסכמים',        134, 'מאומת'],
                ['K/22', 'דיני פיטורין בעידן AI',       'דיני עבודה',    89,  'בבדיקה'],
                ['K/09', 'מס יציאה ליחיד',              'מיסוי בינ״ל',   71,  'מאומת'],
              ].map((r, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.ruleSoft}` }}>
                  <td style={{ padding: '14px 24px', fontFamily: T.mono, fontSize: 11, color: T.gold }}>{r[0]}</td>
                  <td style={{ padding: '14px 24px', color: T.ink }}>{r[1]}</td>
                  <td style={{ padding: '14px 24px', color: T.inkSoft }}>{r[2]}</td>
                  <td style={{ padding: '14px 24px', fontFamily: T.serif, fontSize: 16 }}>{r[3]}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{
                      fontSize: 11, padding: '3px 10px',
                      background: r[4] === 'מאומת' ? T.goldFaint : '#f5f0e3',
                      color: r[4] === 'מאומת' ? T.goldDeep : T.inkMute,
                      fontFamily: T.mono, letterSpacing: '0.05em',
                    }}>
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
  )
}
