import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const FALLBACK = `# אורבך ירדן עורכי דין — Auerbach Yarden Law Offices

## סקירה כללית
משרד בוטיק מוביל בישראל בתחומי המשפט המסחרי, החברות, ההיי-טק והליטיגציה. פעיל מאז 1998.

## תחומי התמחות
- דיני חברות ומסחר: ייעוץ שוטף לדירקטוריונים, מבני בעלות, חוזים מסחריים
- מיזוגים ורכישות (M&A): עסקאות חוצות גבולות עד 1.4 מיליארד ₪
- ליטיגציה מסחרית: בתי משפט כלכליים, בוררות, סכסוכי בעלי מניות
- היי-טק והשקעות: גיוסי הון, ESOP, הסכמי מייסדים, Delaware C-Corp
- מיסוי בינלאומי: מבני מס חוצי גבולות, הסכמי מס, סעיף 102
- נדל״ן ותכנון: עסקאות קרקע, ליווי בנייה, השקעות נדל״ן

## פרטי קשר
- טלפון: 03-720-1898
- דוא״ל: office@auerbach-yarden.co.il
- כתובת: מגדל אלרוב, רחוב ויצמן 2, קומה 32, תל אביב 6423902
- שעות: ימים א׳–ה׳ 08:30–19:00

## דירוגים
- Chambers Global — Tier 1
- Legal500 — Top Tier
- Dun's 100 — מובחר
- IFLR1000 — Recommended`

export async function GET() {
  let text = FALLBACK

  try {
    const { data } = await supabase
      .from('website_settings')
      .select('key, value')

    if (data && data.length > 0) {
      const s: Record<string, string> = {}
      data.forEach(r => { s[r.key] = r.value })
      text = `# ${s.firm_name ?? 'אורבך ירדן עורכי דין'}

## סקירה כללית
${s.tagline ?? 'משרד בוטיק מוביל בתחומי המשפט המסחרי, החברות, ההיי-טק והליטיגציה.'}
פעיל מאז ${s.established ?? '1998'}.

## תחומי התמחות
- דיני חברות ומסחר
- מיזוגים ורכישות (M&A)
- ליטיגציה מסחרית
- היי-טק והשקעות
- מיסוי בינלאומי
- נדל״ן ותכנון

## פרטי קשר
- טלפון: ${s.phone ?? '03-720-1898'}
- דוא״ל: ${s.email ?? 'office@auerbach-yarden.co.il'}
- כתובת: ${s.address ?? 'מגדל אלרוב, רחוב ויצמן 2, קומה 32, תל אביב'}
- שעות: ${s.hours ?? 'ימים א׳–ה׳ 08:30–19:00'}`
    }
  } catch {
    // use fallback
  }

  return new NextResponse(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
