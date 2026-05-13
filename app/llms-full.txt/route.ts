import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const sections: string[] = []

  sections.push(`# אורבך ירדן עורכי דין — Auerbach Yarden Law Offices
## תיאור מלא למנועי AI`)

  try {
    const [settingsRes, pagesRes] = await Promise.all([
      supabase.from('website_settings').select('key, value'),
      supabase.from('website_pages').select('slug, title_he, content, meta_desc').eq('is_enabled', true),
    ])

    if (settingsRes.data && settingsRes.data.length > 0) {
      const s: Record<string, string> = {}
      settingsRes.data.forEach(r => { s[r.key] = r.value })
      sections.push(`## פרטי המשרד
- שם: ${s.firm_name ?? 'אורבך ירדן עורכי דין'}
- נוסד: ${s.established ?? '1998'}
- טלפון: ${s.phone ?? '03-720-1898'}
- דוא״ל: ${s.email ?? 'office@auerbach-yarden.co.il'}
- כתובת: ${s.address ?? 'מגדל אלרוב, רחוב ויצמן 2, קומה 32, תל אביב'}
- שעות פעילות: ${s.hours ?? 'ימים א׳–ה׳ 08:30–19:00'}`)
    }

    if (pagesRes.data && pagesRes.data.length > 0) {
      sections.push('## תוכן דפי האתר')
      for (const page of pagesRes.data) {
        sections.push(`### ${page.title_he ?? page.slug}
${page.meta_desc ?? ''}
${typeof page.content === 'string' ? page.content : JSON.stringify(page.content ?? {})}`)
      }
    }
  } catch {
    // use minimal fallback
  }

  sections.push(`## תחומי התמחות
### דיני חברות ומסחר
ייעוץ שוטף לדירקטוריונים, ניהול מבני בעלות, עריכת חוזים מסחריים מורכבים.

### מיזוגים ורכישות (M&A)
ליווי עסקאות חוצות גבולות, Due Diligence, ניהול מו״מ מיכרזים בהיקפים של עד 1.4 מיליארד ₪.

### ליטיגציה מסחרית
ייצוג בבתי משפט כלכליים, בוררות בינלאומית, סכסוכי בעלי מניות ודירקטורים.

### היי-טק והשקעות
גיוסי הון (Seed, Series A-C), מבני ESOP, הסכמי מייסדים, Delaware C-Corp flip.

### מיסוי בינלאומי
מבני מס חוצי גבולות, ייעוץ סעיף 102, הסכמי מס דו-צדדיים.

### נדל״ן ותכנון
עסקאות קרקע, ליווי בנייה, ניהול עסקאות קומבינציה.

## צוות ושותפים
המשרד מונה 38 עורכי דין ו-4 שותפים בכירים. מייצגים 11 מתוך 50 החברות הציבוריות המובילות במדד ת״א.

## דירוגים ואישורים
- Chambers Global — Tier 1
- Legal500 — Top Tier
- Dun's 100 — מובחר
- IFLR1000 — Recommended`)

  const text = sections.join('\n\n')
  return new NextResponse(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
