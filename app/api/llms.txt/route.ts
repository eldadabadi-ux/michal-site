import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const LLMS_TXT = `# משרד עו"ד מיכל גלר-עבאדי

> ייעוץ משפטי מקצועי, אישי ומסור לפרטיים ועסקים בישראל.

## שירותים עיקריים

- דיני מקרקעין: רכישה, מכירה, חוזים, רישום ותמ"א 38
- דיני עסקים: הקמת חברות, חוזים מסחריים, ליטיגציה
- דיני משפחה: גירושים, מזונות, משמורת, הסכמי ממון
- צוואות וירושות: עריכת צוואות, צווי ירושה, ניהול עיזבון
- ליטיגציה אזרחית: ייצוג בבתי משפט, גישור, בוררות
- ייעוץ משפטי כללי: בדיקת חוזים, ייצוג מול רשויות

## יצירת קשר

- טלפון: XX-XXXXXXX
- דוא"ל: michal@law.co.il
- כתובת: רחוב הרצל 1, תל אביב
- שעות קבלה: ראשון–חמישי 09:00–18:00

## Optional

- [llms-full.txt](/llms-full.txt)
`

export function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
