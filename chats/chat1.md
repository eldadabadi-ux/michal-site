# Premium Legal Authority Site

_Started 2026-05-07 07:41 UTC_

---

## User

Role: You are an Elite UX/UI Designer and AI Experience Architect.
Task: Design a premium, minimalist "Image Website" inspired by lawin.co.il. The aesthetic goal is "High-End Authority" optimized for both human elite clients and AI-driven search engines (GEO).
RTL-compatible text design and orientation 
AI-Ready Information Architecture:
AI Context Management UI: In the Admin Dashboard, design a dedicated "AI Knowledge Base" view. This UI should allow the admin to see how the site's data is summarized for LLMs, including a "Tone of Voice" setting for AI responses.
Semantic Layout: Organize sections in a "Bento-grid" style that clearly separates entities (Services, Team, Expertise) to facilitate effortless data extraction by AI scrapers.
Visual SEO: Design clear "Knowledge Cards" for complex legal/professional topics to establish Topical Authority.
Design Specs:
Typography: Playfair Display for headings (Authority); Inter for body (Readability).
Color Palette: Deep Charcoal, Soft Gold accents, and generous Whitespace.
Admin Interface: Include a "SEO & AI Hub" where the user can manage Meta-tags, JSON-LD schemas, and the "AI Context Summary" text.
Deliverable: A comprehensive Design System and high-fidelity wireframes that prioritize structural clarity for machine readability without sacrificing luxury aesthetics

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- language: Hebrew (RTL only)
- firm_focus: lawyer
- screens: ALL
- aesthetic_tilt: Decide for me
- gold_use: Decide for me
- imagery: Decide for me
- interactivity: Decide for me
- admin_depth: Two screens (AI Knowledge Base + SEO/AI Hub)
- ai_tone_options: Warm & Advisory

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: write_file]_

I'll build an original, premium law-firm design (not copying lawin.co.il) — RTL Hebrew throughout, editorial/quiet-luxury aesthetic, measured gold, bento-grid IA, with all the screens you selected. Substituting Hebrew-supporting equivalents: **Frank Ruhl Libre** (the Hebrew sibling of Playfair Display) for headings and **Heebo** (the Hebrew sibling of Inter) for body — same gravitas, but actually renders Hebrew correctly.

Setting up the foundation first:

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Delivered — a single design canvas with 9 artboards across three sections:

**Public site** (RTL, editorial, bento IA)
1. Homepage — hero + 4×3 bento grid that isolates each entity (Services, Insights, Partner spotlight, Recognition) as its own semantic block, plus a Knowledge Card row for Topical Authority
2. Practice Area (M&A) — ToC sidebar + stages + representative-deals table
3. Attorney Bio — portrait + quick-facts strip + recognition
4. Knowledge Card — TL;DR answer block, comparison table, FAQ, right-rail AI metadata badge
5. Contact — split layout with bookings form

**Admin** (two-tab marquee + dashboard)
6. Dashboard — KPIs, AI Visibility Index chart, leads queue, top Knowledge Cards
7. AI Knowledge Base — editable AI Context Summary with entity highlights, entities table with confidence bars, **Tone of Voice** picker (Warm & Advisory active by default) with live ChatGPT preview, crawler status
8. SEO & AI Hub — Meta tags, JSON-LD with LegalService + FAQPage schemas, SERP preview, Perplexity citation preview, llms.txt

**Design System** — Frank Ruhl Libre (Playfair sibling) + Heebo (Inter sibling) for proper Hebrew rendering, charcoal + measured gold palette, components, spacing scale, wordmark on light + dark.

Aesthetic: editorial / quiet luxury; gold used as hairlines, CTA borders, and section markers — never as background fills. Imagery uses striped placeholders with monospace labels so you can drop in real assets later. Original work — not a clone of any existing firm.

## User

אני רוצה שתיצמד לצבעים באתר המצורף ולפונטים
https://www.lawin.co.il/

כותרות הלשוניות למעלה - בית, המשרד וכו' צריכים להיות הרבה יותר גדולים.

תוסיף בבית הבית למטה את השדות ליצירת קשר. שיהיה ב -2 המקומות.

תוסיף בצד ימין למטה כפתור צף עם חץ למעלה שמאפשר גלילה מהירה למעלה, הכפתור יופיע תמיד

## Assistant

_[tool: str_replace_edit]_

_[tool: web_fetch]_

_[tool: web_fetch]_

מצוין. אעדכן את העיצוב כדי להתאים לאסתטיקה של lawin.co.il (פונט Assistant הישראלי במקום Heebo, גוון זהב מעט יותר חם, ינוון הניווט הגדול), אוסיף טופס יצירת קשר בתחתית עמוד הבית, ואוסיף כפתור גלילה צף.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

בוצע. הנה השינויים:

**1. צבעים ופונטים — התאמה ל-lawin.co.il**
- פונט גוף: **Assistant** (הפונט הישראלי המקובל)
- פונט כותרות: **Frank Ruhl Libre** (סריף עברי אלגנטי)
- פלטה: רקע קרם חם (#f7f1e6), כחול-פחם עמוק (#1d2533), זהב-ברונזה חם (#b08a4a) — במקום הצירוף הקודם

**2. ניווט עליון מוגדל**
- גופן 18px, עובי בינוני, מודגש לפריט פעיל
- מרווחים גדולים יותר, קו זהבי תחתון של 2px לפריט פעיל
- הלוגוטייפ הוגדל בהתאם (28px)

**3. טופס יצירת קשר בתחתית עמוד הבית**
- בלוק חדש לפני ה-footer: צד שמאל פרטי קשר (כתובת, טלפון, דוא״ל, שעות), צד ימין טופס מלא
- מופיע ב-2 מקומות: בעמוד יצירת קשר הייעודי וכעת גם בעמוד הבית

**4. כפתור גלילה צף**
- כפתור עגול 56px, פחם עם זהב, חץ למעלה
- צד ימין-תחתון של כל עמוד ציבורי (בית, תחום התמחות, ביו, מאגר ידע, צור קשר)
- מיקום: 28px מהצד, 80px מהתחתית, מעל ה-footer

