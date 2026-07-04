'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { DEFAULTS, type SiteSettings, type ServiceItem, type TestimonialItem, type EducationItem, type ExperienceItem } from '@/lib/site-settings'
import type { Article } from '@/lib/articles'
import { useSave } from '../save-context'

type UploadStatus = 'idle' | 'uploading' | 'done' | 'error'

const inp: React.CSSProperties = {
  width: '100%', padding: '12px 16px', fontSize: 17,
  border: '1.5px solid #D9DDE3', borderRadius: 6,
  fontFamily: 'Assistant, sans-serif', boxSizing: 'border-box', outline: 'none',
  color: '#0B2F57',
}
const ta: React.CSSProperties = {
  ...inp, resize: 'vertical', lineHeight: 1.65,
}
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 16, fontWeight: 600, color: '#4E6B8A', marginBottom: 6,
}
const btnDanger: React.CSSProperties = {
  background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 6,
  color: '#dc2626', cursor: 'pointer', padding: '10px 14px', fontSize: 16, fontWeight: 600,
  flexShrink: 0, alignSelf: 'flex-end', marginBottom: 0,
}
const btnMove: React.CSSProperties = {
  background: '#EEF1F6', border: '1px solid #D9DDE3', borderRadius: 6,
  color: '#4E6B8A', cursor: 'pointer', padding: '6px 11px', fontSize: 16,
  flexShrink: 0, alignSelf: 'flex-end', marginBottom: 0, lineHeight: 1,
}
const btnMoveDisabled: React.CSSProperties = {
  ...{ background: '#F4F5F8', border: '1px solid #D9DDE3', borderRadius: 6,
  color: '#8B9BB5', cursor: 'default', padding: '6px 11px', fontSize: 16,
  flexShrink: 0, alignSelf: 'flex-end', marginBottom: 0, lineHeight: 1 },
}
const btnAdd: React.CSSProperties = {
  background: '#EEF1F6', border: '1.5px dashed #8B9BB5', borderRadius: 6,
  color: '#0B2F57', cursor: 'pointer', padding: '12px 19px', fontSize: 16, fontWeight: 600,
  fontFamily: 'Assistant, sans-serif', width: '100%', marginTop: 4,
}

const S = (d: string, extra?: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: d + (extra ?? '') }} />
)

const ADMIN_SECTIONS = [
  { id: 'card-logo',         icon: S('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'),  label: 'לוגו' },
  { id: 'card-analytics',    icon: S('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>'), label: 'אנליטיקה' },
  { id: 'card-legal',        icon: S('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),  label: 'נגישות/פרטיות' },
  { id: 'card-home',         icon: S('<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),  label: 'עמוד הבית' },
  { id: 'card-about',        icon: S('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>'),  label: 'אודות' },
  { id: 'card-education',    icon: S('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'),  label: 'השכלה' },
  { id: 'card-experience',   icon: S('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>'),  label: 'ניסיון' },
  { id: 'card-description',  icon: S('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),  label: 'תיאור' },
  { id: 'card-services',     icon: S('<line x1="12" y1="3" x2="12" y2="20"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>'),  label: 'תחומי עיסוק' },
  { id: 'card-articles',     icon: S('<path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16z"/><line x1="9" y1="9" x2="17" y2="9"/><line x1="9" y1="13" x2="17" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>'),  label: 'מאמרים' },
  { id: 'card-testimonials', icon: S('<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>'),  label: 'המלצות' },
  { id: 'card-contact',      icon: S('<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a2 2 0 011.18-2.18l3-.82a2 2 0 012 .55l1.3 1.94a16 16 0 006.29 6.29l1.94 1.3a2 2 0 01.55 2z"/>'),  label: 'יצירת קשר' },
]

const CARD_ICONS: Record<string, React.ReactNode> = Object.fromEntries(
  ADMIN_SECTIONS.map(s => [s.id, s.icon])
)

function AdminQuickNav() {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#fff', borderBottom: '1px solid #D9DDE3',
      padding: '0 36px',
      display: 'flex', alignItems: 'center', gap: 2,
      overflowX: 'auto', flexShrink: 0,
      boxShadow: '0 2px 10px rgba(11,47,87,0.07)',
    }}>
      {ADMIN_SECTIONS.map(s => (
        <button
          key={s.id}
          type="button"
          onClick={() => {
            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          style={{
            flexShrink: 0,
            padding: '14px 16px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 17, fontFamily: 'Assistant, sans-serif',
            color: '#4E6B8A', fontWeight: 500,
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 6,
            borderBottom: '2px solid transparent',
            transition: 'color 0.12s, border-color 0.12s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#0B2F57';
            (e.currentTarget as HTMLButtonElement).style.borderBottomColor = '#0B2F57';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = '#4E6B8A';
            (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'transparent';
          }}
        >
          {s.icon}
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  )
}

function Card({ title, icon: _icon, id, children }: { title: string; icon?: string; id?: string; children: React.ReactNode }) {
  const svgIcon = id ? CARD_ICONS[id] : null
  return (
    <div id={id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(11,47,87,0.07)', marginBottom: 20, overflow: 'hidden', scrollMarginTop: 62, border: '1px solid #EEF1F6' }}>
      <div style={{ padding: '17px 26px', borderBottom: '1px solid #EEF1F6', display: 'flex', alignItems: 'center', gap: 10, background: '#F4F5F8' }}>
        {svgIcon && <span style={{ color: '#4E6B8A', display: 'flex', alignItems: 'center' }}>{svgIcon}</span>}
        <span style={{ fontSize: 22, fontWeight: 700, color: '#0B2F57', fontFamily: 'Assistant, sans-serif', letterSpacing: '0.01em' }}>{title}</span>
      </div>
      <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 19 }}>
        {children}
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={lbl}>{label}</div>
      {children}
    </label>
  )
}

function ImageUpload({
  url, status, inputRef, onPick, onRemove,
}: {
  url: string
  status: UploadStatus
  inputRef: React.RefObject<HTMLInputElement | null>
  onPick: (f: File) => void
  onRemove: () => void
}) {
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) onPick(f) }}
      />
      {url ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="תמונה" style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 6, border: '1px solid #dde5e1' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              style={{ ...btnAdd, width: 'auto', margin: 0 }}
            >
              {status === 'uploading' ? 'מעלה...' : 'החלפת תמונה'}
            </button>
            <button type="button" onClick={onRemove} style={{ ...btnDanger, alignSelf: 'flex-start' }}>
              הסרת תמונה
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              background: '#f8faf9', border: '2px dashed #a3b5ac', borderRadius: 8,
              color: '#577066', cursor: 'pointer', padding: '29px 24px', fontSize: 17,
              fontFamily: 'Assistant, sans-serif', width: '100%', textAlign: 'center',
            }}
          >
            {status === 'uploading' ? '⏳ מעלה תמונה...' : '📁 לחצי לבחירת תמונה'}
          </button>
          {status === 'error' && (
            <p style={{ fontSize: 16, color: '#dc2626', margin: '7px 0 0' }}>שגיאה בהעלאה — נסי שוב</p>
          )}
        </div>
      )}
      {status === 'done' && !url && (
        <p style={{ fontSize: 16, color: '#16a34a', margin: '7px 0 0' }}>✓ הועלה בהצלחה</p>
      )}
    </div>
  )
}

function moveArr<T>(arr: T[], from: number, to: number): T[] {
  const a = [...arr]
  const [item] = a.splice(from, 1)
  a.splice(to, 0, item)
  return a
}

function MoveButtons({ i, len, onMove }: { i: number; len: number; onMove: (dir: -1 | 1) => void }) {
  return (
    <>
      <button type="button" disabled={i === 0} onClick={() => onMove(-1)}
        style={i === 0 ? btnMoveDisabled : btnMove}>▲</button>
      <button type="button" disabled={i === len - 1} onClick={() => onMove(1)}
        style={i === len - 1 ? btnMoveDisabled : btnMove}>▼</button>
    </>
  )
}

type ArticleForm = Omit<Article, 'tenant_id' | 'created_at' | 'updated_at'>

const EMPTY_ARTICLE: ArticleForm = {
  id: '', title: '', slug: '', excerpt: '', content: '', image: '', published: true, sort_order: 0,
}

function slugify(title: string) {
  return `article-${Date.now()}-${title.slice(0, 20).replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`
}

const SETUP_SQL = `CREATE TABLE IF NOT EXISTS articles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL,
  title        TEXT NOT NULL DEFAULT '',
  slug         TEXT NOT NULL DEFAULT '',
  excerpt      TEXT DEFAULT '',
  content      TEXT DEFAULT '',
  image        TEXT DEFAULT '',
  published    BOOLEAN DEFAULT TRUE,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS articles_tenant_slug
  ON articles (tenant_id, slug);`

function ArticlesCard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [form, setForm] = useState<ArticleForm | null>(null)
  const [articleImgStatus, setArticleImgStatus] = useState<UploadStatus>('idle')
  const articleImgRef = useRef<HTMLInputElement>(null)
  const [saving, setSavingA] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoadError('')
    const r = await fetch('/api/admin/articles')
    const data = await r.json()
    if (!r.ok) {
      setLoadError(data.error ?? 'שגיאה בטעינת מאמרים')
      setArticles([])
    } else {
      setArticles(Array.isArray(data) ? data : [])
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function uploadArticleImage(file: File) {
    setArticleImgStatus('uploading')
    setUploadError('')
    const fd = new FormData(); fd.append('file', file)
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await r.json()
      if (!r.ok || !data.url) {
        setUploadError(data.error ?? 'שגיאה בהעלאה')
        setArticleImgStatus('error')
        return
      }
      setForm(f => f ? { ...f, image: data.url } : f)
      setArticleImgStatus('done')
      setUploadError('')
    } catch {
      setUploadError('שגיאת רשת — נסה שוב')
      setArticleImgStatus('error')
    }
  }

  async function saveArticle() {
    if (!form) return
    setSavingA(true)
    setSaveError('')
    const r = await fetch('/api/admin/articles', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.id ? form : { ...form, id: undefined }),
    })
    const data = await r.json()
    if (r.ok) {
      await load()
      setForm(null)
    } else {
      setSaveError(data.error ?? 'שגיאה בשמירה')
    }
    setSavingA(false)
  }

  async function deleteArticle(id: string) {
    if (!confirm('למחוק את המאמר?')) return
    setDeleting(id)
    await fetch('/api/admin/articles', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
    setDeleting(null)
  }

  async function togglePublished(a: Article) {
    await fetch('/api/admin/articles', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...a, published: !a.published }),
    })
    await load()
  }

  async function moveArticle(i: number, dir: -1 | 1) {
    const reordered = moveArr(articles, i, i + dir).map((a, idx) => ({ ...a, sort_order: idx }))
    setArticles(reordered)
    await Promise.all(reordered.map(a => fetch('/api/admin/articles', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a),
    })))
  }

  const inputStyle: React.CSSProperties = { ...inp }
  const taStyle: React.CSSProperties = { ...ta }

  const tablesMissing = loadError.toLowerCase().includes('does not exist')
    || loadError.toLowerCase().includes('relation')
    || loadError.toLowerCase().includes('schema cache')
    || loadError.toLowerCase().includes('could not find')

  return (
    <>
      {/* Hidden file input — always in DOM so ref is always valid */}
      <input
        ref={articleImgRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) { setUploadError(''); uploadArticleImage(f) }
          e.target.value = ''
        }}
      />

      {/* Table-missing banner */}
      {loadError && (
        <div style={{ background: tablesMissing ? '#fffbeb' : '#fff3f3', border: `1px solid ${tablesMissing ? '#fcd34d' : '#fca5a5'}`, borderRadius: 6, padding: '14px 16px', marginBottom: 8 }}>
          {tablesMissing ? (
            <>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#92400e', marginBottom: 10 }}>⚠️ טבלת מאמרים לא קיימת ב-Supabase</div>
              <div style={{ fontSize: 14, color: '#78350f', marginBottom: 12 }}>יש להריץ את ה-SQL הבא פעם אחת ב-Supabase SQL Editor:</div>
              <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '14px 17px', borderRadius: 6, fontSize: 13, overflowX: 'auto', whiteSpace: 'pre-wrap', margin: '0 0 12px', fontFamily: 'monospace' }}>{SETUP_SQL}</pre>
              <button type="button" onClick={() => navigator.clipboard.writeText(SETUP_SQL)}
                style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 17px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                העתק SQL
              </button>
              <button type="button" onClick={load} style={{ marginInlineStart: 10, background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 6, padding: '7px 17px', fontSize: 14, cursor: 'pointer' }}>
                נסה שוב
              </button>
            </>
          ) : (
            <div style={{ fontSize: 16, color: '#c0392b' }}>שגיאה: {loadError}</div>
          )}
        </div>
      )}

      {/* Article list */}
      {articles.map((a, i) => (
        <div key={a.id} style={{ border: '1px solid #D9DDE3', borderRadius: 8, padding: '14px 19px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 17, color: '#0B2F57', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title || '(ללא כותרת)'}</div>
          </div>
          <MoveButtons i={i} len={articles.length} onMove={dir => moveArticle(i, dir)} />
          <button type="button" onClick={() => togglePublished(a)} style={{
            fontSize: 14, padding: '6px 12px', border: '1px solid', borderRadius: 6,
            cursor: 'pointer', fontFamily: 'Assistant, sans-serif', fontWeight: 600,
            background: a.published ? '#dcfce7' : '#f1f5f9',
            color: a.published ? '#15803d' : '#64748b',
            borderColor: a.published ? '#86efac' : '#cbd5e1',
          }}>{a.published ? '✓ מפורסם' : '○ טיוטה'}</button>
          <button type="button" onClick={() => { setForm({ id: a.id, title: a.title, slug: a.slug, excerpt: a.excerpt, content: a.content, image: a.image, published: a.published, sort_order: a.sort_order }); setArticleImgStatus('idle') }}
            style={{ ...btnMove, fontSize: 16, padding: '6px 14px' }}>ערוך</button>
          <button type="button" disabled={deleting === a.id} onClick={() => deleteArticle(a.id)}
            style={btnDanger}>{deleting === a.id ? '...' : '✕'}</button>
        </div>
      ))}

      {articles.length === 0 && !form && (
        <div style={{ textAlign: 'center', color: '#8B9BB5', fontSize: 17, padding: '19px 0' }}>אין מאמרים עדיין</div>
      )}

      {/* Inline form */}
      {form && (
        <div style={{ border: '2px solid var(--gold, #0B2F57)', borderRadius: 10, padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 17 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#0B2F57', marginBottom: 5 }}>
            {form.id ? 'עריכת מאמר' : 'מאמר חדש'}
          </div>

          <label style={{ display: 'block' }}>
            <div style={lbl}>כותרת המאמר</div>
            <input dir="rtl" value={form.title} style={inputStyle}
              onChange={e => setForm(f => f ? { ...f, title: e.target.value, slug: f.slug || slugify(e.target.value) } : f)} />
          </label>

          <label style={{ display: 'block' }}>
            <div style={lbl}>מזהה URL (slug) — אנגלית, מקפים בלבד</div>
            <input dir="ltr" value={form.slug} style={inputStyle}
              onChange={e => setForm(f => f ? { ...f, slug: e.target.value } : f)} />
          </label>

          {/* Image upload */}
          <div>
            <div style={lbl}>תמונה ראשית למאמר</div>
            {form.image ? (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="" style={{ width: 140, height: 90, objectFit: 'cover', borderRadius: 6, border: '1px solid #dde5e1' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button type="button" onClick={() => articleImgRef.current?.click()} style={{ ...btnAdd, width: 'auto', margin: 0 }}>
                    {articleImgStatus === 'uploading' ? '⏳ מעלה...' : 'החלפת תמונה'}
                  </button>
                  <button type="button" onClick={() => setForm(f => f ? { ...f, image: '' } : f)} style={{ ...btnDanger, alignSelf: 'flex-start' }}>הסרה</button>
                </div>
              </div>
            ) : (
              <>
                <button type="button" onClick={() => articleImgRef.current?.click()} style={{
                  ...btnAdd,
                  background: articleImgStatus === 'error' ? '#fff3f3' : undefined,
                  borderColor: articleImgStatus === 'error' ? '#fca5a5' : undefined,
                }}>
                  {articleImgStatus === 'uploading' ? '⏳ מעלה תמונה...' : '📁 לחץ לבחירת תמונה'}
                </button>
                {uploadError && (
                  <div style={{ fontSize: 14, color: '#dc2626', marginTop: 7 }}>❌ {uploadError}</div>
                )}
              </>
            )}
          </div>

          <label style={{ display: 'block' }}>
            <div style={lbl}>תקציר קצר (מופיע בכרטיס המאמר)</div>
            <textarea rows={2} dir="rtl" value={form.excerpt} style={taStyle}
              onChange={e => setForm(f => f ? { ...f, excerpt: e.target.value } : f)} />
          </label>

          <label style={{ display: 'block' }}>
            <div style={lbl}>תוכן המאמר (שורה ריקה = פסקה חדשה)</div>
            <textarea rows={12} dir="rtl" value={form.content} style={taStyle}
              onChange={e => setForm(f => f ? { ...f, content: e.target.value } : f)} />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 17, color: '#577066' }}>
            <input type="checkbox" checked={form.published}
              onChange={e => setForm(f => f ? { ...f, published: e.target.checked } : f)}
              style={{ width: 19, height: 19, accentColor: '#0B2F57', cursor: 'pointer' }} />
            פרסם מאמר (מוצג באתר)
          </label>

          {saveError && (
            <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: 6, padding: '12px 17px', fontSize: 16, color: '#c0392b' }}>
              ❌ שגיאה בשמירה: {saveError}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" disabled={saving || !form.title || !form.slug} onClick={saveArticle}
              style={{ background: '#0B2F57', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 26px', fontSize: 17, fontWeight: 600, cursor: 'pointer', fontFamily: 'Assistant, sans-serif', opacity: saving || !form.title || !form.slug ? 0.6 : 1 }}>
              {saving ? 'שומר...' : '✓ שמור מאמר'}
            </button>
            <button type="button" onClick={() => { setForm(null); setSaveError('') }}
              style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: 6, padding: '12px 22px', fontSize: 17, cursor: 'pointer' }}>
              ביטול
            </button>
          </div>
        </div>
      )}

      {!form && (
        <button type="button"
          onClick={() => { setForm({ ...EMPTY_ARTICLE, sort_order: articles.length }); setArticleImgStatus('idle') }}
          style={btnAdd}>
          + הוספת מאמר חדש
        </button>
      )}
    </>
  )
}

export default function ContentPage() {
  const [s, setS] = useState<SiteSettings>(DEFAULTS)
  const [logoUpload, setLogoUpload] = useState<UploadStatus>('idle')
  const [heroUpload, setHeroUpload] = useState<UploadStatus>('idle')
  const [aboutUpload, setAboutUpload] = useState<UploadStatus>('idle')
  const [svcUploads, setSvcUploads] = useState<Record<number, UploadStatus>>({})
  const [svcIconUploads, setSvcIconUploads] = useState<Record<number, UploadStatus>>({})
  const logoRef = useRef<HTMLInputElement>(null)
  const heroRef = useRef<HTMLInputElement>(null)
  const aboutRef = useRef<HTMLInputElement>(null)
  const svcFileRef = useRef<HTMLInputElement>(null)
  const svcIconRef = useRef<HTMLInputElement>(null)
  const activeSvcIdx = useRef<number | null>(null)
  const activeSvcIconIdx = useRef<number | null>(null)
  const { saveRef, setSaving, setSaved, setError, error } = useSave()

  // Keep a ref to current state so the registered save fn always has fresh data
  const sRef = useRef(s)
  sRef.current = s

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then((data: Partial<SiteSettings>) => {
        if (data && typeof data === 'object' && !('error' in data)) {
          setS(prev => ({ ...prev, ...data }))
        }
      })
      .catch(() => {})
  }, [])

  // Register save function in context so sidebar button can trigger it
  useEffect(() => {
    saveRef.current = async () => {
      setSaving(true); setSaved(false); setError('')
      try {
        const res = await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sRef.current),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error ?? 'שגיאה בשמירה'); return }
        setSaved(true)
        setTimeout(() => setSaved(false), 4000)
      } catch {
        setError('שגיאת רשת')
      } finally {
        setSaving(false)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function uploadImage(file: File, field: 'logo_image' | 'hero_image' | 'about_image', setStatus: (s: UploadStatus) => void) {
    setStatus('uploading')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await r.json()
      if (!r.ok || !data.url) { setStatus('error'); return }
      setS(prev => ({ ...prev, [field]: data.url }))
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  async function uploadServiceImage(file: File, idx: number) {
    setSvcUploads(prev => ({ ...prev, [idx]: 'uploading' }))
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await r.json()
      if (!r.ok || !data.url) { setSvcUploads(prev => ({ ...prev, [idx]: 'error' })); return }
      setS(prev => {
        const arr = [...prev.services]
        arr[idx] = { ...arr[idx], image: data.url }
        return { ...prev, services: arr }
      })
      setSvcUploads(prev => ({ ...prev, [idx]: 'done' }))
    } catch {
      setSvcUploads(prev => ({ ...prev, [idx]: 'error' }))
    }
  }

  async function uploadServiceIcon(file: File, idx: number) {
    setSvcIconUploads(prev => ({ ...prev, [idx]: 'uploading' }))
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await r.json()
      if (!r.ok || !data.url) { setSvcIconUploads(prev => ({ ...prev, [idx]: 'error' })); return }
      setS(prev => {
        const arr = [...prev.services]
        arr[idx] = { ...arr[idx], icon_svg: data.url }
        return { ...prev, services: arr }
      })
      setSvcIconUploads(prev => ({ ...prev, [idx]: 'done' }))
    } catch {
      setSvcIconUploads(prev => ({ ...prev, [idx]: 'error' }))
    }
  }

  function updateEducation(i: number, key: keyof EducationItem, val: string) {
    setS(prev => {
      const arr = [...prev.education]
      arr[i] = { ...arr[i], [key]: val }
      return { ...prev, education: arr }
    })
  }

  function updateExperience(i: number, key: keyof ExperienceItem, val: string) {
    setS(prev => {
      const arr = [...prev.experience]
      arr[i] = { ...arr[i], [key]: val }
      return { ...prev, experience: arr }
    })
  }

  function updateService(i: number, key: keyof ServiceItem, val: string) {
    setS(prev => {
      const arr = [...prev.services]
      arr[i] = { ...arr[i], [key]: val }
      return { ...prev, services: arr }
    })
  }

  function updateServiceItem(svcIdx: number, itemIdx: number, val: string) {
    setS(prev => {
      const arr = [...prev.services]
      const items = [...(arr[svcIdx].items ?? [])]
      items[itemIdx] = val
      arr[svcIdx] = { ...arr[svcIdx], items }
      return { ...prev, services: arr }
    })
  }

  function removeServiceItem(svcIdx: number, itemIdx: number) {
    setS(prev => {
      const arr = [...prev.services]
      const items = (arr[svcIdx].items ?? []).filter((_, j) => j !== itemIdx)
      arr[svcIdx] = { ...arr[svcIdx], items }
      return { ...prev, services: arr }
    })
  }

  function moveServiceItem(svcIdx: number, from: number, to: number) {
    setS(prev => {
      const arr = [...prev.services]
      const items = moveArr(arr[svcIdx].items ?? [], from, to)
      arr[svcIdx] = { ...arr[svcIdx], items }
      return { ...prev, services: arr }
    })
  }

  function addServiceItem(svcIdx: number) {
    setS(prev => {
      const arr = [...prev.services]
      const items = [...(arr[svcIdx].items ?? []), '']
      arr[svcIdx] = { ...arr[svcIdx], items }
      return { ...prev, services: arr }
    })
  }

  function updateTestimonial(i: number, key: keyof TestimonialItem, val: string) {
    setS(prev => {
      const arr = [...prev.testimonials]
      arr[i] = { ...arr[i], [key]: val }
      return { ...prev, testimonials: arr }
    })
  }

  return (
    <>
    <AdminQuickNav />
    <div style={{ padding: '38px 43px', maxWidth: 960, direction: 'rtl' }}>
      <div style={{ marginBottom: 34 }}>
        <h1 style={{ fontSize: 29, fontWeight: 700, color: '#0B2F57', margin: 0, fontFamily: 'Assistant, sans-serif' }}>תוכן האתר</h1>
        <p style={{ color: '#8B9BB5', fontSize: 17, margin: '7px 0 0' }}>
          ערכי את כל התכנים שמופיעים באתר — השינויים יופיעו לאחר שמירה ורענון
        </p>
      </div>

      {error && (
        <div style={{ background: '#fff3f3', border: '1px solid #f5c6c6', borderRadius: 10, padding: '17px 24px', marginBottom: 24, fontSize: 17, color: '#c0392b' }}>
          {error}
        </div>
      )}

      {/* ── לוגו ── */}
      <Card title="לוגו — בר עליון" icon="🖼️" id="card-logo">
        <Row label="שם המשרד (כותרת הלוגו / פוטר)">
          <input dir="rtl" value={s.footer_brand_name} onChange={e => setS(p => ({ ...p, footer_brand_name: e.target.value }))} style={inp} />
        </Row>
        <Row label="כיתוב אנגלי בפוטר (תחת שם המשרד)">
          <input dir="ltr" value={s.footer_tagline_en} onChange={e => setS(p => ({ ...p, footer_tagline_en: e.target.value }))} style={inp} />
        </Row>
        <div>
          <div style={lbl}>תמונת לוגו (מוצגת בעיגול בפינה)</div>
          <ImageUpload
            url={s.logo_image}
            status={logoUpload}
            inputRef={logoRef}
            onPick={f => uploadImage(f, 'logo_image', setLogoUpload)}
            onRemove={() => setS(p => ({ ...p, logo_image: '' }))}
          />
        </div>
      </Card>

      {/* ── אנליטיקה ── */}
      <Card title="אנליטיקה ועוגיות" icon="📊" id="card-analytics">
        <Row label='Google Analytics — Measurement ID (G-XXXXXXXX)'>
          <input
            dir="ltr"
            placeholder="G-XXXXXXXXXX"
            value={s.ga_id}
            onChange={e => setS(p => ({ ...p, ga_id: e.target.value }))}
            style={inp}
          />
        </Row>
        <p style={{ fontSize: 14, color: '#8B9BB5', margin: 0 }}>
          💡 הכניסי את ה-Measurement ID מ-Google Analytics 4. הסקריפט יוזרק לאתר רק אם המבקר אישר עוגיות סטטיסטיקה בבאנר העוגיות. השאירי ריק אם אין שימוש ב-GA.
        </p>
      </Card>

      {/* ── דפי חוקי ── */}
      <Card title="הצהרת נגישות / פרטיות / תקנון" icon="📄" id="card-legal">
        <Row label="הצהרת נגישות">
          <textarea
            rows={7} dir="rtl"
            value={s.accessibility_text}
            onChange={e => setS(p => ({ ...p, accessibility_text: e.target.value }))}
            style={{ ...ta, fontFamily: 'Assistant, sans-serif', fontSize: 16 }}
          />
        </Row>
        <Row label="מדיניות פרטיות">
          <textarea
            rows={7} dir="rtl"
            value={s.privacy_text}
            onChange={e => setS(p => ({ ...p, privacy_text: e.target.value }))}
            style={{ ...ta, fontFamily: 'Assistant, sans-serif', fontSize: 16 }}
          />
        </Row>
        <Row label="תקנון האתר">
          <textarea
            rows={7} dir="rtl"
            value={s.terms_text}
            onChange={e => setS(p => ({ ...p, terms_text: e.target.value }))}
            style={{ ...ta, fontFamily: 'Assistant, sans-serif', fontSize: 16 }}
          />
        </Row>
        <p style={{ fontSize: 14, color: '#8B9BB5', margin: 0 }}>
          💡 שורה ריקה בין פסקאות = רווח. כדי להדגיש טקסט בבולד: <strong>**כתבי כך**</strong>
        </p>
      </Card>

      {/* ── עמוד הבית ── */}
      <Card title="עמוד הבית" icon="🏠" id="card-home">
        <Row label='תווית הסקציה (למשל: "01 — ייצוג משפטי אישי")'>
          <input dir="rtl" value={s.hero_label} onChange={e => setS(p => ({ ...p, hero_label: e.target.value }))} style={inp} />
        </Row>
        <Row label="כותרת ראשית">
          <textarea rows={2} dir="rtl" value={s.hero_title} onChange={e => setS(p => ({ ...p, hero_title: e.target.value }))} style={ta} />
        </Row>
        <Row label="תת-כותרת">
          <textarea rows={3} dir="rtl" value={s.hero_subtitle} onChange={e => setS(p => ({ ...p, hero_subtitle: e.target.value }))} style={ta} />
        </Row>
        <div>
          <div style={lbl}>תמונה ראשית</div>
          <ImageUpload
            url={s.hero_image}
            status={heroUpload}
            inputRef={heroRef}
            onPick={f => uploadImage(f, 'hero_image', setHeroUpload)}
            onRemove={() => setS(p => ({ ...p, hero_image: '' }))}
          />
        </div>
        {/* Hero card */}
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ ...lbl, marginBottom: 0 }}>חלונית טקסט על התמונה</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 16, color: '#577066' }}>
              <input
                type="checkbox"
                checked={s.hero_card_show}
                onChange={e => setS(p => ({ ...p, hero_card_show: e.target.checked }))}
                style={{ width: 19, height: 19, accentColor: 'var(--gold, #4d7c60)', cursor: 'pointer' }}
              />
              הצג חלונית
            </label>
          </div>
          {s.hero_card_show && (
            <>
              <Row label="כותרת החלונית">
                <input dir="rtl" value={s.hero_card_title} onChange={e => setS(p => ({ ...p, hero_card_title: e.target.value }))} style={inp} />
              </Row>
              <Row label="טקסט החלונית">
                <textarea rows={3} dir="rtl" value={s.hero_card_text} onChange={e => setS(p => ({ ...p, hero_card_text: e.target.value }))} style={ta} />
              </Row>
            </>
          )}
        </div>
      </Card>

      {/* ── אודות ── */}
      <Card title="אודות המשרד" icon="👩‍⚖️" id="card-about">
        <Row label='תווית הסקציה בעמוד הבית (למשל: "02 — אודות המשרד")'>
          <input dir="rtl" value={s.about_section_label} onChange={e => setS(p => ({ ...p, about_section_label: e.target.value }))} style={inp} />
        </Row>
        <Row label="כותרת סקציית אודות בעמוד הבית">
          <textarea rows={2} dir="rtl" value={s.about_section_heading} onChange={e => setS(p => ({ ...p, about_section_heading: e.target.value }))} style={ta} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        <Row label="פסקה ראשונה">
          <textarea rows={3} dir="rtl" value={s.about_text1} onChange={e => setS(p => ({ ...p, about_text1: e.target.value }))} style={ta} />
        </Row>
        <Row label="פסקה שנייה">
          <textarea rows={3} dir="rtl" value={s.about_text2} onChange={e => setS(p => ({ ...p, about_text2: e.target.value }))} style={ta} />
        </Row>
        <div>
          <div style={lbl}>תמונת אודות</div>
          <ImageUpload
            url={s.about_image}
            status={aboutUpload}
            inputRef={aboutRef}
            onPick={f => uploadImage(f, 'about_image', setAboutUpload)}
            onRemove={() => setS(p => ({ ...p, about_image: '' }))}
          />
        </div>
        <div>
          <div style={lbl}>נקודות בולטות</div>
          {s.about_highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input
                dir="rtl"
                value={h}
                onChange={e => {
                  const arr = [...s.about_highlights]
                  arr[i] = e.target.value
                  setS(p => ({ ...p, about_highlights: arr }))
                }}
                style={{ ...inp, flex: 1 }}
              />
              <MoveButtons i={i} len={s.about_highlights.length} onMove={dir => setS(p => ({ ...p, about_highlights: moveArr(p.about_highlights, i, i + dir) }))} />
              <button
                type="button"
                onClick={() => setS(p => ({ ...p, about_highlights: p.about_highlights.filter((_, j) => j !== i) }))}
                style={btnDanger}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setS(p => ({ ...p, about_highlights: [...p.about_highlights, ''] }))}
            style={btnAdd}
          >
            + הוספת נקודה
          </button>
        </div>
        <div>
          <div style={lbl}>ערכי המשרד (מופיעים בעמוד אודות)</div>
          {s.about_values.map((v, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input
                dir="rtl"
                value={v}
                onChange={e => {
                  const arr = [...s.about_values]
                  arr[i] = e.target.value
                  setS(p => ({ ...p, about_values: arr }))
                }}
                style={{ ...inp, flex: 1 }}
              />
              <MoveButtons i={i} len={s.about_values.length} onMove={dir => setS(p => ({ ...p, about_values: moveArr(p.about_values, i, i + dir) }))} />
              <button
                type="button"
                onClick={() => setS(p => ({ ...p, about_values: p.about_values.filter((_, j) => j !== i) }))}
                style={btnDanger}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setS(p => ({ ...p, about_values: [...p.about_values, ''] }))}
            style={btnAdd}
          >
            + הוספת ערך
          </button>
        </div>
      </Card>

      {/* ── השכלה ── */}
      <Card title="השכלה" icon="🎓" id="card-education">
        {s.education.map((e, i) => (
          <div key={i} style={{ border: '1px solid #D9DDE3', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: '0 0 80px' }}>
                <label style={lbl}>שנה</label>
                <input dir="rtl" value={e.year} onChange={ev => updateEducation(i, 'year', ev.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>תואר / השתלמות</label>
                <input dir="rtl" value={e.degree} onChange={ev => updateEducation(i, 'degree', ev.target.value)} style={inp} />
              </div>
              <MoveButtons i={i} len={s.education.length} onMove={dir => setS(p => ({ ...p, education: moveArr(p.education, i, i + dir) }))} />
              <button
                type="button"
                onClick={() => setS(p => ({ ...p, education: p.education.filter((_, j) => j !== i) }))}
                style={btnDanger}
              >✕</button>
            </div>
            <label style={lbl}>מוסד לימודים</label>
            <input dir="rtl" value={e.institution} onChange={ev => updateEducation(i, 'institution', ev.target.value)} style={{ ...inp, width: '100%' }} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setS(p => ({ ...p, education: [...p.education, { year: '', degree: '', institution: '' }] }))}
          style={btnAdd}
        >+ הוספת שורת השכלה</button>
      </Card>

      {/* ── ניסיון מקצועי ── */}
      <Card title="ניסיון מקצועי" icon="💼" id="card-experience">
        {s.experience.map((e, i) => (
          <div key={i} style={{ border: '1px solid #D9DDE3', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: '0 0 100px' }}>
                <label style={lbl}>שנים</label>
                <input dir="rtl" value={e.year} onChange={ev => updateExperience(i, 'year', ev.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>תפקיד</label>
                <input dir="rtl" value={e.role} onChange={ev => updateExperience(i, 'role', ev.target.value)} style={inp} />
              </div>
              <MoveButtons i={i} len={s.experience.length} onMove={dir => setS(p => ({ ...p, experience: moveArr(p.experience, i, i + dir) }))} />
              <button
                type="button"
                onClick={() => setS(p => ({ ...p, experience: p.experience.filter((_, j) => j !== i) }))}
                style={btnDanger}
              >✕</button>
            </div>
            <label style={lbl}>מקום עבודה / משרד</label>
            <input dir="rtl" value={e.place} onChange={ev => updateExperience(i, 'place', ev.target.value)} style={{ ...inp, width: '100%' }} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setS(p => ({ ...p, experience: [...p.experience, { year: '', role: '', place: '' }] }))}
          style={btnAdd}
        >+ הוספת שורת ניסיון</button>
      </Card>

      {/* ── תיאור המשרד ── */}
      <Card title="תיאור המשרד" icon="📝" id="card-description">
        <Row label="תיאור (מופיע בפוטר ובעמוד הבית)">
          <textarea rows={3} dir="rtl" value={s.office_description} onChange={e => setS(p => ({ ...p, office_description: e.target.value }))} style={ta} />
        </Row>
      </Card>

      {/* ── שירותים ── */}
      <Card title="תחומי עיסוק" icon="⚖️" id="card-services">
        {/* Home page section settings */}
        <div style={{ background: '#F4F5F8', borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#4E6B8A', marginBottom: 14 }}>הגדרות סקציה בעמוד הבית</div>
          <Row label='תווית הסקציה (למשל: "03 — תחומי עיסוק")'>
            <input dir="rtl" value={s.services_label} onChange={e => setS(p => ({ ...p, services_label: e.target.value }))} style={inp} />
          </Row>
          <div style={{ marginTop: 14 }}>
            <Row label="כותרת סקציית תחומי עיסוק">
              <textarea rows={2} dir="rtl" value={s.services_heading} onChange={e => setS(p => ({ ...p, services_heading: e.target.value }))} style={ta} />
            </Row>
          </div>
          <div style={{ marginTop: 14 }}>
            <Row label="תת-כותרת סקציית תחומי עיסוק">
              <textarea rows={2} dir="rtl" value={s.services_subtitle} onChange={e => setS(p => ({ ...p, services_subtitle: e.target.value }))} style={ta} />
            </Row>
          </div>
        </div>

        {/* Services page banner settings */}
        <div style={{ background: '#F4F5F8', borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#4E6B8A', marginBottom: 14 }}>הגדרות עמוד תחומי עיסוק (/services)</div>
          <Row label="תווית עמוד (מוצגת בצבע זהב מעל הכותרת הראשית)">
            <input dir="rtl" value={s.services_page_eyebrow} onChange={e => setS(p => ({ ...p, services_page_eyebrow: e.target.value }))} style={inp} />
          </Row>
          <div style={{ marginTop: 14 }}>
            <Row label="כותרת ראשית של העמוד">
              <input dir="rtl" value={s.services_page_heading} onChange={e => setS(p => ({ ...p, services_page_heading: e.target.value }))} style={inp} />
            </Row>
          </div>
          <div style={{ marginTop: 14 }}>
            <Row label='טקסט CTA בתחתית העמוד (למשל: "לא מצאתם את מה שחיפשתם?")'>
              <input dir="rtl" value={s.services_page_footer_text} onChange={e => setS(p => ({ ...p, services_page_footer_text: e.target.value }))} style={inp} />
            </Row>
          </div>
          <div style={{ marginTop: 14 }}>
            <Row label='טקסט כפתור CTA (למשל: "צרו קשר לייעוץ ראשוני ←")'>
              <input dir="rtl" value={s.services_page_button_text} onChange={e => setS(p => ({ ...p, services_page_button_text: e.target.value }))} style={inp} />
            </Row>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        {/* Hidden file inputs shared by all service cards */}
        <input
          ref={svcFileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => {
            const f = e.target.files?.[0]
            if (f && activeSvcIdx.current !== null) uploadServiceImage(f, activeSvcIdx.current)
            e.target.value = ''
          }}
        />
        <input
          ref={svcIconRef}
          type="file"
          accept="image/svg+xml,.svg"
          style={{ display: 'none' }}
          onChange={e => {
            const f = e.target.files?.[0]
            if (f && activeSvcIconIdx.current !== null) uploadServiceIcon(f, activeSvcIconIdx.current)
            e.target.value = ''
          }}
        />

        {s.services.map((svc, i) => (
          <div key={svc.id} style={{ border: '1px solid #D9DDE3', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: '0 0 60px' }}>
                <label style={lbl}>מזהה</label>
                <input value={svc.id} onChange={e => updateService(i, 'id', e.target.value)} style={{ ...inp, textAlign: 'center' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>שם השירות</label>
                <input dir="rtl" value={svc.t} onChange={e => updateService(i, 't', e.target.value)} style={inp} />
              </div>
              <MoveButtons i={i} len={s.services.length} onMove={dir => setS(p => ({ ...p, services: moveArr(p.services, i, i + dir) }))} />
              <button
                type="button"
                onClick={() => setS(p => ({ ...p, services: p.services.filter((_, j) => j !== i) }))}
                style={btnDanger}
              >
                ✕
              </button>
            </div>
            <label style={lbl}>תווית קטגוריה (מוצגת מעל הכותרת)</label>
            <input dir="rtl" value={svc.sub} onChange={e => updateService(i, 'sub', e.target.value)} style={{ ...inp, width: '100%', marginBottom: 10 }} />
            <label style={lbl}>תיאור מורחב (נחשף ב-Hover בעמוד הבית, ומוצג בעמוד /services)</label>
            <textarea rows={3} dir="rtl" value={svc.desc ?? ''} onChange={e => updateService(i, 'desc' as keyof ServiceItem, e.target.value)} style={{ ...ta, width: '100%', marginBottom: 10 }} />
            {/* Bullet items for services page */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ ...lbl, marginBottom: 8 }}>נקודות בולטות (מוצגות בעמוד /services)</div>
              {(svc.items ?? []).map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <input
                    dir="rtl"
                    value={item}
                    onChange={e => updateServiceItem(i, j, e.target.value)}
                    style={{ ...inp, flex: 1 }}
                  />
                  <MoveButtons i={j} len={(svc.items ?? []).length} onMove={dir => moveServiceItem(i, j, j + dir)} />
                  <button type="button" onClick={() => removeServiceItem(i, j)} style={btnDanger}>✕</button>
                </div>
              ))}
              <button type="button" onClick={() => addServiceItem(i)} style={{ ...btnAdd, marginTop: 0 }}>
                + הוספת נקודה
              </button>
            </div>
            {/* Service SVG icon */}
            <div style={lbl}>אייקון SVG מותאם (יחליף את ברירת המחדל)</div>
            {svc.icon_svg ? (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.icon_svg} alt={svc.t} style={{ width: 62, height: 62, objectFit: 'contain', borderRadius: 4, border: '1px solid #dde5e1', background: '#f8faf9', padding: 4 }} />
                <button type="button" onClick={() => { activeSvcIconIdx.current = i; svcIconRef.current?.click() }} style={{ ...btnAdd, width: 'auto', margin: 0 }}>
                  {svcIconUploads[i] === 'uploading' ? '⏳ מחליף...' : 'החלפת SVG'}
                </button>
                <button type="button" onClick={() => setS(p => { const arr = [...p.services]; arr[i] = { ...arr[i], icon_svg: '' }; return { ...p, services: arr } })} style={btnDanger}>
                  הסרה
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { activeSvcIconIdx.current = i; svcIconRef.current?.click() }}
                style={{ ...btnAdd, marginTop: 4 }}
              >
                {svcIconUploads[i] === 'uploading' ? '⏳ מעלה...' : '📁 העלאת SVG מותאם (לא חובה)'}
              </button>
            )}
            {svcIconUploads[i] === 'error' && (
              <p style={{ fontSize: 14, color: '#dc2626', margin: '5px 0 0' }}>שגיאה בהעלאה</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setS(p => ({ ...p, services: [...p.services, { id: String(p.services.length + 1).padStart(2, '0'), t: '', sub: '' }] }))}
          style={btnAdd}
        >
          + הוספת תחום עיסוק
        </button>
      </Card>

      {/* ── מאמרים ── */}
      <Card title="מאמרים" icon="📝" id="card-articles">
        <Row label='תווית הסקציה בעמוד הבית (למשל: "03 — מאמרים")'>
          <input dir="rtl" value={s.blog_label} onChange={e => setS(p => ({ ...p, blog_label: e.target.value }))} style={inp} />
        </Row>
        <Row label="כותרת סקציית המאמרים בעמוד הבית">
          <textarea rows={2} dir="rtl" value={s.blog_heading} onChange={e => setS(p => ({ ...p, blog_heading: e.target.value }))} style={ta} />
        </Row>
        <Row label="תת-כותרת סקציית המאמרים בעמוד הבית">
          <textarea rows={2} dir="rtl" value={s.blog_subtitle} onChange={e => setS(p => ({ ...p, blog_subtitle: e.target.value }))} style={ta} />
        </Row>
        <div style={{ borderTop: '2px solid #f0f3f1', paddingTop: 4, marginTop: 4 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#577066', marginBottom: 17 }}>ניהול מאמרים</div>
          <ArticlesCard />
        </div>
      </Card>

      {/* ── המלצות ── */}
      <Card title="המלצות לקוחות" icon="⭐" id="card-testimonials">
        <Row label='תווית הסקציה (למשל: "04 — לקוחות ממליצים")'>
          <input dir="rtl" value={s.testimonials_label} onChange={e => setS(p => ({ ...p, testimonials_label: e.target.value }))} style={inp} />
        </Row>
        <Row label="כותרת סקציית המלצות">
          <textarea rows={2} dir="rtl" value={s.testimonials_heading} onChange={e => setS(p => ({ ...p, testimonials_heading: e.target.value }))} style={ta} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        {s.testimonials.map((t, i) => (
          <div key={i} style={{ border: '1px solid #D9DDE3', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={lbl}>שם הלקוח</label>
                <input dir="rtl" value={t.name} onChange={e => updateTestimonial(i, 'name', e.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>תפקיד / רקע</label>
                <input dir="rtl" value={t.role} onChange={e => updateTestimonial(i, 'role', e.target.value)} style={inp} />
              </div>
              <div style={{ flex: '0 0 130px' }}>
                <label style={lbl}>תחום</label>
                <input dir="rtl" value={t.area} onChange={e => updateTestimonial(i, 'area', e.target.value)} style={inp} />
              </div>
              <MoveButtons i={i} len={s.testimonials.length} onMove={dir => setS(p => ({ ...p, testimonials: moveArr(p.testimonials, i, i + dir) }))} />
              <button
                type="button"
                onClick={() => setS(p => ({ ...p, testimonials: p.testimonials.filter((_, j) => j !== i) }))}
                style={btnDanger}
              >
                ✕
              </button>
            </div>
            <label style={lbl}>ציטוט (מה אמר הלקוח)</label>
            <textarea
              rows={3}
              dir="rtl"
              value={t.q}
              onChange={e => updateTestimonial(i, 'q', e.target.value)}
              style={{ ...ta, width: '100%' }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setS(p => ({ ...p, testimonials: [...p.testimonials, { name: '', role: '', q: '', area: '' }] }))}
          style={btnAdd}
        >
          + הוספת המלצה
        </button>
      </Card>

      {/* ── פרטי קשר ── */}
      <Card title="פרטי קשר" icon="📞" id="card-contact">
        <Row label='תווית הסקציה (למשל: "יצירת קשר")'>
          <input dir="rtl" value={s.contact_section_label} onChange={e => setS(p => ({ ...p, contact_section_label: e.target.value }))} style={inp} />
        </Row>
        <Row label="כותרת סקציית יצירת קשר">
          <textarea rows={2} dir="rtl" value={s.contact_section_heading} onChange={e => setS(p => ({ ...p, contact_section_heading: e.target.value }))} style={ta} />
        </Row>
        <Row label="תת-כותרת סקציית יצירת קשר">
          <textarea rows={2} dir="rtl" value={s.contact_section_subtitle} onChange={e => setS(p => ({ ...p, contact_section_subtitle: e.target.value }))} style={ta} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        <Row label="טלפון">
          <input dir="ltr" value={s.contact_phone} onChange={e => setS(p => ({ ...p, contact_phone: e.target.value }))} style={inp} />
        </Row>
        <Row label="דוא״ל">
          <input dir="ltr" type="email" value={s.contact_email} onChange={e => setS(p => ({ ...p, contact_email: e.target.value }))} style={inp} />
        </Row>
        <Row label="כתובת">
          <input dir="rtl" value={s.contact_address} onChange={e => setS(p => ({ ...p, contact_address: e.target.value }))} style={inp} />
        </Row>
        <Row label="שעות פעילות">
          <input dir="rtl" value={s.contact_hours} onChange={e => setS(p => ({ ...p, contact_hours: e.target.value }))} style={inp} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        <p style={{ fontSize: 14, color: '#8B9BB5', margin: 0 }}>טקסטים בטופס הפנייה</p>
        <Row label="תווית כרטיס הטופס (למשל: בקשת ייעוץ ראשוני)">
          <input dir="rtl" value={s.contact_form_card_title} onChange={e => setS(p => ({ ...p, contact_form_card_title: e.target.value }))} style={inp} />
        </Row>
        <Row label="כותרת כרטיס הטופס (למשל: שלחו פנייה — נחזור תוך 24 שעות)">
          <input dir="rtl" value={s.contact_form_card_subtitle} onChange={e => setS(p => ({ ...p, contact_form_card_subtitle: e.target.value }))} style={inp} />
        </Row>
        <Row label="טקסט כפתור שליחה">
          <input dir="rtl" value={s.contact_form_button} onChange={e => setS(p => ({ ...p, contact_form_button: e.target.value }))} style={inp} />
        </Row>
        <Row label="כיתוב משפטי מתחת לכפתור (disclaimer)">
          <textarea rows={2} dir="rtl" value={s.contact_form_disclaimer} onChange={e => setS(p => ({ ...p, contact_form_disclaimer: e.target.value }))} style={ta} />
        </Row>
        <Row label="כותרת הודעת הצלחה (לאחר שליחה)">
          <input dir="rtl" value={s.contact_form_success_title} onChange={e => setS(p => ({ ...p, contact_form_success_title: e.target.value }))} style={inp} />
        </Row>
        <Row label="טקסט הודעת הצלחה">
          <input dir="rtl" value={s.contact_form_success_body} onChange={e => setS(p => ({ ...p, contact_form_success_body: e.target.value }))} style={inp} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        <p style={{ fontSize: 14, color: '#8B9BB5', margin: 0 }}>טקסטי placeholder (מה שמופיע באפור בשדות הטופס לפני ההקלדה)</p>
        <Row label="Placeholder — שם מלא">
          <input dir="rtl" value={s.contact_form_name_placeholder} onChange={e => setS(p => ({ ...p, contact_form_name_placeholder: e.target.value }))} style={inp} />
        </Row>
        <Row label="Placeholder — טלפון">
          <input dir="ltr" value={s.contact_form_phone_placeholder} onChange={e => setS(p => ({ ...p, contact_form_phone_placeholder: e.target.value }))} style={inp} />
        </Row>
        <Row label="Placeholder — דוא״ל">
          <input dir="ltr" value={s.contact_form_email_placeholder} onChange={e => setS(p => ({ ...p, contact_form_email_placeholder: e.target.value }))} style={inp} />
        </Row>
        <Row label="Placeholder — נושא">
          <input dir="rtl" value={s.contact_form_subject_placeholder} onChange={e => setS(p => ({ ...p, contact_form_subject_placeholder: e.target.value }))} style={inp} />
        </Row>
        <Row label="Placeholder — הודעה">
          <textarea rows={2} dir="rtl" value={s.contact_form_message_placeholder} onChange={e => setS(p => ({ ...p, contact_form_message_placeholder: e.target.value }))} style={ta} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        <Row label='שורת זכויות יוצרים בפוטר — כתבי {year} לשנה אוטומטית (למשל: © {year} עו״ד X. כל הזכויות שמורות.)'>
          <input dir="rtl" value={s.footer_copyright_line} onChange={e => setS(p => ({ ...p, footer_copyright_line: e.target.value }))} style={inp} />
        </Row>
        <div style={{ borderTop: '1px solid #EEF1F6', paddingTop: 16 }} />
        <p style={{ fontSize: 14, color: '#8B9BB5', margin: '0 0 4px' }}>קישורי רשתות חברתיות (מוצגים בפוטר)</p>
        <Row label="קישור Facebook (השאירי ריק להסתרה)">
          <input dir="ltr" type="url" placeholder="https://facebook.com/..." value={s.footer_facebook} onChange={e => setS(p => ({ ...p, footer_facebook: e.target.value }))} style={inp} />
        </Row>
        <Row label="קישור LinkedIn (השאירי ריק להסתרה)">
          <input dir="ltr" type="url" placeholder="https://linkedin.com/in/..." value={s.footer_linkedin} onChange={e => setS(p => ({ ...p, footer_linkedin: e.target.value }))} style={inp} />
        </Row>
        <Row label="קישור WhatsApp (השאירי ריק להסתרה)">
          <input dir="ltr" type="url" placeholder="https://wa.me/972501234567" value={s.footer_whatsapp} onChange={e => setS(p => ({ ...p, footer_whatsapp: e.target.value }))} style={inp} />
        </Row>
      </Card>

      <div style={{ paddingBottom: 48 }} />
    </div>
    </>
  )
}
