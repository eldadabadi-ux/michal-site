'use client'
import { useEffect, useState } from 'react'

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: 'new' | 'contacted' | 'converted' | 'archived'
  created_at: string
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  new:       { label: 'חדש',       color: '#1a6b3c', bg: '#e6f4ed' },
  contacted: { label: 'נוצר קשר', color: '#7a5c00', bg: '#fef9e6' },
  converted: { label: 'הפך ללקוח', color: '#1a4d7a', bg: '#e6f0fa' },
  archived:  { label: 'בארכיון',   color: '#666',    bg: '#f0f0f0' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/* ── Lead detail panel / mobile modal ── */
function LeadDetail({
  lead, saving, onClose, onUpdateStatus,
}: {
  lead: Lead
  saving: boolean
  onClose: () => void
  onUpdateStatus: (id: string, status: string) => void
}) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="lead-detail-backdrop"
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 400 }}
      />

      <div className="lead-detail-panel" style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f3f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#35423a' }}>{lead.name}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#8aaa98' }}>✕</button>
        </div>

        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {[
            { label: 'דוא״ל',  val: lead.email,          href: `mailto:${lead.email}`,  ltr: true },
            { label: 'טלפון',  val: lead.phone ?? '—',    href: lead.phone ? `tel:${lead.phone}` : undefined, ltr: true },
            { label: 'נושא',   val: lead.subject ?? '—',  href: undefined, ltr: false },
            { label: 'תאריך',  val: formatDate(lead.created_at), href: undefined, ltr: false },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#8aaa98', fontWeight: 600, marginBottom: 2 }}>{row.label}</div>
              {row.href ? (
                <a href={row.href} dir={row.ltr ? 'ltr' : undefined}
                  style={{ fontSize: 17, color: '#4d7c60', textDecoration: 'none', display: 'block', textAlign: 'right' }}>
                  {row.val}
                </a>
              ) : (
                <div style={{ fontSize: 17, color: '#35423a' }}>{row.val}</div>
              )}
            </div>
          ))}

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, color: '#8aaa98', fontWeight: 600, marginBottom: 6 }}>הודעה</div>
            <div style={{
              fontSize: 17, color: '#35423a', lineHeight: 1.7,
              background: '#f8faf9', padding: '12px 15px', borderRadius: 6,
            }}>
              {lead.message}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#8aaa98', fontWeight: 600, marginBottom: 9 }}>עדכון סטטוס</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {Object.entries(STATUS_LABELS).map(([key, { label, color, bg }]) => (
                <button
                  key={key}
                  disabled={saving || lead.status === key}
                  onClick={() => onUpdateStatus(lead.id, key)}
                  style={{
                    background: lead.status === key ? bg : '#f2f5f3',
                    color: lead.status === key ? color : '#577066',
                    border: lead.status === key ? `1px solid ${color}40` : '1px solid #e0e5e2',
                    borderRadius: 20, padding: '7px 15px', fontSize: 15,
                    cursor: saving || lead.status === key ? 'default' : 'pointer',
                    fontFamily: 'Assistant, sans-serif',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: '1px solid #f0f3f1' }}>
            <a href={`mailto:${lead.email}`} style={{
              flex: 1, background: '#4d7c60', color: '#fff', textAlign: 'center',
              padding: '13px 0', borderRadius: 6, textDecoration: 'none', fontSize: 17, fontWeight: 600,
            }}>שלחי מייל</a>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} style={{
                flex: 1, background: '#f2f5f3', color: '#35423a', textAlign: 'center',
                padding: '13px 0', borderRadius: 6, textDecoration: 'none', fontSize: 17, fontWeight: 600,
              }}>חייגי</a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/leads')
    if (!res.ok) {
      const d = await res.json()
      setError(d.error ?? 'שגיאה בטעינת הפניות')
    } else {
      setLeads(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: string) {
    setSaving(true)
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    await load()
    setSelected(prev => prev?.id === id ? { ...prev, status: status as Lead['status'] } : prev)
    setSaving(false)
  }

  const newCount = leads.filter(l => l.status === 'new').length

  return (
    <>
      <style>{`
        /* Desktop */
        .leads-detail-wrapper {
          width: 384px;
          position: static;
          z-index: auto;
        }
        .lead-detail-backdrop { display: none !important; }
        .lead-detail-panel {
          width: 384px;
          max-height: calc(100vh - 80px);
          position: sticky;
          top: 20px;
        }

        /* Mobile */
        @media (max-width: 767px) {
          .leads-page-pad { padding: 20px 14px !important; }
          .leads-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .leads-table th, .leads-table td { padding: 13px 12px !important; font-size: 15px !important; }
          .leads-table .col-subject { display: none; }
          .leads-table .col-date { display: none; }

          .lead-detail-backdrop { display: block !important; }
          .leads-detail-wrapper {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            z-index: 400;
            display: flex;
            align-items: flex-end;
          }
          .lead-detail-panel {
            width: 100% !important;
            max-height: 88dvh !important;
            border-radius: 16px 16px 0 0 !important;
            position: static !important;
          }
        }
      `}</style>

      <div className="leads-page-pad" style={{ padding: 38, maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#35423a', margin: 0 }}>פניות נכנסות</h1>
            {newCount > 0 && (
              <span style={{
                background: '#4d7c60', color: '#fff',
                borderRadius: 20, padding: '2px 14px', fontSize: 16, fontWeight: 700,
              }}>{newCount} חדש{newCount > 1 ? 'ות' : 'ה'}</span>
            )}
          </div>
          <p style={{ color: '#8aaa98', fontSize: 16, margin: '6px 0 0' }}>
            כל הפניות שהתקבלו דרך טופס יצירת הקשר באתר
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 60, color: '#8aaa98', fontSize: 20 }}>טוען פניות...</div>
        )}

        {error && (
          <div style={{
            background: '#fff3f3', border: '1px solid #f5c6c6', borderRadius: 8,
            padding: '20px 24px', color: '#c0392b', fontSize: 16,
          }}>
            <strong>שגיאה: </strong>{error}
          </div>
        )}

        {!loading && !error && leads.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '52px 0',
            background: '#fff', borderRadius: 12, color: '#8aaa98', fontSize: 20,
          }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            עדיין לא התקבלו פניות
          </div>
        )}

        {!loading && leads.length > 0 && (
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {/* Table */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="leads-table-wrap" style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
                <table className="leads-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 340 }}>
                  <thead>
                    <tr style={{ background: '#f2f5f3', borderBottom: '1px solid #e0e5e2' }}>
                      <th style={{ padding: '15px 18px', textAlign: 'right', fontSize: 15, fontWeight: 600, color: '#577066', whiteSpace: 'nowrap' }}>שם</th>
                      <th style={{ padding: '15px 18px', textAlign: 'right', fontSize: 15, fontWeight: 600, color: '#577066', whiteSpace: 'nowrap' }}>טלפון</th>
                      <th className="col-subject" style={{ padding: '15px 18px', textAlign: 'right', fontSize: 15, fontWeight: 600, color: '#577066', whiteSpace: 'nowrap' }}>נושא</th>
                      <th className="col-date" style={{ padding: '15px 18px', textAlign: 'right', fontSize: 15, fontWeight: 600, color: '#577066', whiteSpace: 'nowrap' }}>תאריך</th>
                      <th style={{ padding: '15px 18px', textAlign: 'right', fontSize: 15, fontWeight: 600, color: '#577066', whiteSpace: 'nowrap' }}>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l, i) => {
                      const st = STATUS_LABELS[l.status] ?? STATUS_LABELS.new
                      const isSelected = selected?.id === l.id
                      return (
                        <tr
                          key={l.id}
                          onClick={() => setSelected(isSelected ? null : l)}
                          style={{
                            borderBottom: i < leads.length - 1 ? '1px solid #f0f3f1' : 'none',
                            background: isSelected ? '#eef5f1' : l.status === 'new' ? '#fffef8' : '#fff',
                            cursor: 'pointer', transition: 'background 0.1s',
                          }}
                        >
                          <td style={{ padding: '15px 18px', fontSize: 16, fontWeight: l.status === 'new' ? 700 : 400, color: '#35423a' }}>
                            {l.name}
                            {l.status === 'new' && <span style={{ marginRight: 6, fontSize: 11, color: '#4d7c60' }}>●</span>}
                          </td>
                          <td style={{ padding: '15px 18px', fontSize: 15, color: '#577066', direction: 'ltr', textAlign: 'right' }}>
                            {l.phone ?? '—'}
                          </td>
                          <td className="col-subject" style={{ padding: '15px 18px', fontSize: 15, color: '#577066', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {l.subject ?? '—'}
                          </td>
                          <td className="col-date" style={{ padding: '15px 18px', fontSize: 14, color: '#8aaa98', whiteSpace: 'nowrap' }}>
                            {formatDate(l.created_at)}
                          </td>
                          <td style={{ padding: '15px 18px' }}>
                            <span style={{ background: st.bg, color: st.color, borderRadius: 20, padding: '3px 11px', fontSize: 14, fontWeight: 600 }}>
                              {st.label}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail panel */}
            {selected && (
              <div className="leads-detail-wrapper">
                <LeadDetail
                  lead={selected}
                  saving={saving}
                  onClose={() => setSelected(null)}
                  onUpdateStatus={updateStatus}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
