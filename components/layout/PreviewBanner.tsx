import { headers } from 'next/headers'

/**
 * Shown only while the maintenance gate is on and the viewer is a signed-in
 * admin (the proxy sets x-admin-preview for exactly that case). Without it the
 * preview looks identical to the site being live, which invites the mistake of
 * telling people to visit while visitors still get the 503 page.
 */
export default async function PreviewBanner() {
  const isPreview = (await headers()).get('x-admin-preview') === '1'
  if (!isPreview) return null

  return (
    <div
      dir="rtl"
      style={{
        position: 'fixed', top: 0, insetInline: 0, zIndex: 9999,
        background: '#8a6d1f', color: '#fff',
        fontFamily: 'Heebo, sans-serif', fontSize: 15, fontWeight: 600,
        padding: '8px 16px', textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      תצוגה מוקדמת — האתר עדיין מוסתר מהציבור. מבקרים רואים דף &quot;האתר בשדרוג&quot;.
      {' '}
      <a href="/admin/content" style={{ color: '#fff', textDecoration: 'underline' }}>
        חזרה לפאנל הניהול
      </a>
    </div>
  )
}
