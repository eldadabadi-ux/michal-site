import { createClient } from '@supabase/supabase-js'
import { unstable_noStore as noStore } from 'next/cache'

export type ServiceItem    = { id: string; t: string; sub: string; desc?: string; items?: string[]; image?: string; icon_svg?: string }
export type TestimonialItem = { name: string; role: string; q: string; area: string }
export type EducationItem   = { year: string; degree: string; institution: string }
export type ExperienceItem  = { year: string; role: string; place: string }

export type SiteSettings = {
  logo_image: string
  ga_id: string
  privacy_text: string
  accessibility_text: string
  terms_text: string
  contact_phone: string
  contact_email: string
  contact_address: string
  contact_hours: string
  hero_label: string
  hero_title: string
  hero_subtitle: string
  hero_image: string
  hero_card_show: boolean
  hero_card_title: string
  hero_card_text: string
  about_section_label: string
  about_section_heading: string
  about_text1: string
  about_text2: string
  about_highlights: string[]
  about_image: string
  about_values: string[]
  education: EducationItem[]
  experience: ExperienceItem[]
  services_label: string
  services_heading: string
  services_subtitle: string
  office_description: string
  services: ServiceItem[]
  blog_label: string
  blog_heading: string
  blog_subtitle: string
  testimonials_label: string
  testimonials_heading: string
  testimonials: TestimonialItem[]
  contact_section_label: string
  contact_section_heading: string
  contact_section_subtitle: string
  contact_form_card_title: string
  contact_form_card_subtitle: string
  contact_form_button: string
  contact_form_disclaimer: string
  contact_form_success_title: string
  contact_form_success_body: string
  contact_form_name_placeholder: string
  contact_form_phone_placeholder: string
  contact_form_email_placeholder: string
  contact_form_subject_placeholder: string
  contact_form_message_placeholder: string
  footer_brand_name: string
  footer_tagline_en: string
  footer_copyright_line: string
  footer_facebook: string
  footer_linkedin: string
  footer_whatsapp: string
  services_page_eyebrow: string
  services_page_heading: string
  services_page_footer_text: string
  services_page_button_text: string
}

export const DEFAULTS: SiteSettings = {
  logo_image:       '',
  ga_id:            '',
  privacy_text:     'משרד עו״ד מיכל גלר-עבאדי מכבד את פרטיות המבקרים באתר.\n\nמידע שנאסף\nאנו אוספים מידע שמוסרים לנו המבקרים מרצונם דרך טופס יצירת הקשר: שם, כתובת דוא״ל, מספר טלפון ותוכן הפנייה.\n\nשימוש במידע\nהמידע משמש אך ורק למטרות יצירת קשר ומתן שירות. אנו לא מוכרים או מעבירים מידע אישי לצדדים שלישיים.\n\nיצירת קשר\nלכל שאלה בנושא פרטיות ניתן לפנות אלינו בדוא״ל או בטלפון.',
  accessibility_text: 'משרד עו״ד מיכל גלר-עבאדי מחויב להנגשת האתר לאנשים עם מוגבלות, בהתאם לתקן הישראלי (ת"י 5568).\n\nתכונות נגישות זמינות באתר\n• הגדלה והקטנה של גופן\n• גופן קריא (Arial)\n• הגדלה והקטנה של תצוגה\n• קו תחתון לקישורים\n• הדגשת ניווט מקלדת\n• מצב גווני אפור\n• מצב מונוכרום\n\nפנייה בנושא נגישות\nנתקלתם בבעיית נגישות? נשמח לשמוע ולשפר. ניתן לפנות אלינו בדוא״ל או בטלפון.',
  terms_text:       'ברוכים הבאים לאתר משרד עו״ד מיכל גלר-עבאדי. השימוש באתר כפוף לתנאים המפורטים להלן.\n\nאין ביצירת קשר משום ייעוץ משפטי\nהמידע המופיע באתר נועד למטרות מידע כלליות בלבד ואינו מהווה ייעוץ משפטי. אין להסתמך על המידע ללא התייעצות עם עורך דין.\n\nקניין רוחני\nכל התכנים באתר מוגנים בזכויות יוצרים. אין להעתיק או לעשות שימוש מסחרי בתכנים ללא אישור בכתב מהמשרד.\n\nדין חל\nתקנון זה כפוף לדיני מדינת ישראל. סמכות השיפוט הבלעדית לבתי המשפט במחוז תל אביב.',
  contact_phone:    '050-7771484',
  contact_email:    'michal@gellerabadi.co.il',
  contact_address:  'רחוב הרצל 1, תל אביב',
  contact_hours:    'א׳–ה׳ · 09:00–18:00',
  hero_label:       '01 — ייצוג משפטי אישי',
  hero_title:       'ייעוץ משפטי במקצועיות ובאכפתיות.',
  hero_subtitle:    'משרד עורכי דין בוטיק המתמחה בדיני מקרקעין, משפחה, צוואות וליטיגציה אזרחית. כל לקוח מקבל ליווי אישי, מסור ומקצועי — מהפגישה הראשונה ועד סיום התיק.',
  hero_image:       '',
  hero_card_show:  true,
  hero_card_title: 'הלקוחות שלנו',
  hero_card_text:  'מלווים לקוחות פרטיים ועסקיים בכל רחבי הארץ עם ניסיון רב שנים.',
  about_section_label:   '02 — אודות המשרד',
  about_section_heading: 'ייצוג אישי\nבכל שלב.',
  about_text1:      'בוגרת הפקולטה למשפטים, בעלת ניסיון עשיר בייצוג לקוחות פרטיים ועסקיים בתחומי המשפט האזרחי, המסחרי ודיני המשפחה.',
  about_text2:      'אני מאמינה שכל לקוח ראוי לייצוג מקצועי ומסור. גישתי משלבת הבנה עמוקה של החוק עם רגישות לצרכים האנושיים של כל תיק.',
  about_highlights: [
    'ניסיון של מעל 15 שנים בתחום המשפטי',
    'ייצוג אישי ומסור לכל לקוח',
    'זמינות וקשב מלאים לצרכי הלקוח',
    'שקיפות מלאה לאורך כל ההליך המשפטי',
  ],
  about_image:       '',
  about_values: [
    'ייצוג אישי ומסור לכל לקוח',
    'שקיפות מלאה לאורך ההליך',
    'זמינות וקשב לצרכים',
    'תוצאות מוכחות ורקורד עשיר',
    'מחירים הוגנים ושקופים',
  ],
  education: [
    { year: 'XX', degree: 'תואר ראשון במשפטים (LL.B)', institution: 'אוניברסיטת XX' },
    { year: 'XX', degree: 'השתלמויות מקצועיות שוטפות', institution: 'לשכת עורכי הדין' },
  ],
  experience: [
    { year: 'XX–היום', role: 'מייסדת ושותפה', place: 'משרד עו"ד מיכל גלר-עבאדי' },
    { year: 'XX–XX',   role: 'עורכת דין',      place: "משרד XX ושות'" },
  ],
  services_label:   '03 — תחומי עיסוק',
  services_heading: 'ליווי משפטי לאורך כל מחזור החיים.',
  services_subtitle:'כל לקוח מקבל ליווי אישי ומסור. אנו מאמינים שמאחורי כל מסמך עומדים אנשים, צרכים וערכים.',
  office_description: 'משרד עורכי דין בוטיק המעניק שירות משפטי מקצועי, אישי ומסור בתחומי המקרקעין, דיני המשפחה, הליטיגציה האזרחית ועריכת חוזים.',
  services: [
    { id: '01', t: 'מקרקעין ונדל״ן',  sub: 'נדל״ן',  desc: 'ליווי מקצועי בעסקאות רכישה ומכירה, עריכת חוזים, רישום בטאבו וטיפול במחלוקות קניין.', items: ['רכישה ומכירה של דירות ונכסים', 'עסקאות מסחריות בנדל"ן', 'חוזים לרכישת קרקע ובנייה', 'רישום בטאבו ובמינהל מקרקעי ישראל', 'ייצוג בסכסוכי שכנים ושיתוף', 'תמ"א 38 ופינוי-בינוי'] },
    { id: '02', t: 'דיני משפחה',       sub: 'משפחה', desc: 'טיפול מקיף בגירושים, הסדרי משמורת, מזונות והסכמי ממון — בגישה אנושית ומקצועית.', items: ['הסכמי גירושין וגט', 'מזונות ילדים ואישה', 'הסדרי משמורת וזמני שהייה', 'הסכמי ממון וגירושין', 'ירושות ועיזבונות', 'אימוץ ואפוטרופסות'] },
    { id: '03', t: 'צוואות וירושות',   sub: 'ירושה', desc: 'עריכת צוואות, הגשת צווי ירושה וניהול עיזבון — תכנון נכון שישמור על עתיד משפחתכם.', items: ['עריכת צוואות', 'הגשת בקשות לצו ירושה וקיום צוואה', 'ניהול עיזבון', 'ייצוג בסכסוכי ירושה', 'נאמנויות', 'מתנות ומעברי רכוש'] },
    { id: '04', t: 'ליטיגציה אזרחית', sub: 'ייצוג', desc: 'ייצוג מנוסה ואסרטיבי בבית המשפט, גישור ובוררות — להשגת התוצאה הטובה ביותר.', items: ['ייצוג בבית משפט השלום והמחוזי', 'תביעות אזרחיות ורכושיות', 'סכסוכי חוזים', 'גישור ובוררות', 'צווי מניעה ועיכוב יציאה מהארץ', 'הוצאה לפועל'] },
    { id: '05', t: 'חוזים ועסקאות',   sub: 'חוזים', desc: 'עריכה, בדיקה וניהול משא ומתן על חוזים עסקיים ואישיים — הגנה מלאה על האינטרסים שלכם.', items: ['ייעוץ משפטי שוטף', 'בדיקת חוזים ומסמכים', 'ייעוץ לפני חתימה', 'ייצוג מול רשויות', 'ליווי עסקאות'] },
    { id: '06', t: 'ייעוץ עסקי',       sub: 'עסקים', desc: 'ייעוץ משפטי שוטף לעסקים קטנים ובינוניים — ליווי מקצועי מהקמה ועד צמיחה.', items: ['הקמה ורישום חברות, שותפויות ועמותות', 'עריכת חוזים מסחריים', 'הסכמי שיתוף פעולה ומיזמים', 'ליטיגציה עסקית', 'הסכמי עבודה ותעסוקה', 'גיוס הון וייעוץ לסטארטאפים'] },
  ],
  blog_label:   '03 — מאגר ידע',
  blog_heading: 'תשובות לשאלות שחשוב לדעת.',
  blog_subtitle:'מאמרים משפטיים ממוקדים, כתובים בשפה פשוטה וברורה לכל אחד.',
  testimonials_label:   '04 — לקוחות ממליצים',
  testimonials_heading: 'מה אומרים הלקוחות שלנו.',
  testimonials: [
    { name: 'רחל כהן',   role: 'לקוחה פרטית · מקרקעין',   q: 'מיכל ליוותה אותנו בעסקת נדל"ן מורכבת ברמת מקצועיות גבוהה ביותר. היא זמינה, קשובה ואדיבה. הרגשנו שאנחנו בידיים הטובות ביותר לאורך כל התהליך.',  area: 'דיני מקרקעין' },
    { name: 'יוסף לוי',  role: 'בעל עסק · ייעוץ עסקי',    q: 'שנים רבות שמיכל מייצגת את העסק שלי. היא תמיד מוצאת פתרונות יצירתיים ומעשיים. הדיסקרטיות, המהירות והמקצועיות שלה הן ברמה שלא מצאתי בשום מקום אחר.', area: 'ייעוץ עסקי' },
    { name: 'שרה אברהם', role: 'לקוחה פרטית · דיני משפחה', q: 'בתקופה קשה של גירושין, מיכל הייתה לצידי בכל שלב. היא לא רק עורכת דין מצוינת — היא גם אנושית ורגישה. ממליצה בחום לכל אחד.',                           area: 'דיני משפחה' },
  ],
  contact_section_label:    'יצירת קשר',
  contact_section_heading:  'נשמח\nלשמוע מכם.',
  contact_section_subtitle: 'פגישת ייעוץ ראשונית ללא התחייבות. נחזור אליכם תוך 24 שעות ביום עסקים.',
  contact_form_card_title:   'בקשת ייעוץ ראשוני',
  contact_form_card_subtitle: 'שלחו פנייה — נחזור תוך 24 שעות',
  contact_form_button:       'שליחת פנייה ←',
  contact_form_disclaimer:   'שליחת הטופס אינה יוצרת יחסי עו״ד–לקוח. כל פנייה נשמרת בדיסקרטיות מלאה.',
  contact_form_success_title: 'פנייתך התקבלה',
  contact_form_success_body:  'ניצור אתך קשר בהקדם.',
  contact_form_name_placeholder:    'שם מלא',
  contact_form_phone_placeholder:   '050-0000000',
  contact_form_email_placeholder:   'name@example.com',
  contact_form_subject_placeholder: 'נושא הפנייה',
  contact_form_message_placeholder: 'תארו בקצרה את הסיטואציה ומה נדרש...',
  footer_brand_name: 'עו״ד מיכל גלר-עבאדי',
  footer_tagline_en: 'Michal Galer-Abadi · Law Office',
  footer_copyright_line: '© {year} עו״ד מיכל גלר-עבאדי. כל הזכויות שמורות.',
  footer_facebook: '',
  footer_linkedin: '',
  footer_whatsapp: '',
  services_page_eyebrow: 'שירותים',
  services_page_heading: 'תחומי עיסוק',
  services_page_footer_text: 'לא מצאתם את מה שחיפשתם?',
  services_page_button_text: 'צרו קשר לייעוץ ראשוני ←',
}

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore()
  const url      = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key      = process.env.SUPABASE_SERVICE_ROLE_KEY
  const tenantId = process.env.MICHAL_TENANT_ID
  if (!url || !key || !tenantId) return { ...DEFAULTS }

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } })
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .eq('tenant_id', tenantId)

    const settings: SiteSettings = { ...DEFAULTS }
    for (const row of data ?? []) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (settings as any)[row.key] = JSON.parse(row.value)
      } catch {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (settings as any)[row.key] = row.value
      }
    }
    return settings
  } catch {
    return { ...DEFAULTS }
  }
}
