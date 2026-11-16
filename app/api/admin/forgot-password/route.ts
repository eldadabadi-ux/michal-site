import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { siteUrl } from '@/lib/site-url'
import { graphConfigured, sendGraphMail } from '@/lib/graph-mailer'

/**
 * A.5.17 — self-service password reset for the admin panel, step 1.
 *
 * Takes an email, and when it belongs to an admin of this site, mails a
 * single-use recovery link (Supabase generateLink, delivered through the
 * office's own mailbox via Graph). The response is `{ ok: true }` regardless
 * of whether the account exists, so the endpoint cannot be used to enumerate
 * admin emails. Recovery links are single-use and expire per the Supabase
 * project's OTP expiry.
 *
 * Body: { email }   Returns: { ok: true } | { error } (config/send failures only)
 */

// A.8.12 — best-effort per-instance rate limit (3 / 15 min per IP and per
// email). For a hard, distributed limit add a platform rate-limit rule.
const RL = new Map<string, { n: number; resetAt: number }>()
function rateLimited(key: string): boolean {
  const now = Date.now(), windowMs = 15 * 60 * 1000, max = 3
  const e = RL.get(key)
  if (!e || now > e.resetAt) { RL.set(key, { n: 1, resetAt: now + windowMs }); return false }
  if (e.n >= max) return true
  e.n++
  return false
}

/**
 * The reset link must point at the host the admin is actually using (the
 * canonical domain once connected, the *.vercel.app host before that), but a
 * raw Host header cannot be trusted for password-reset links — so the request
 * origin is honored only when it is on this allowlist, and anything else
 * falls back to the canonical site URL.
 */
function resetBaseUrl(req: NextRequest): string {
  const allowed = new Set([
    siteUrl(),
    'https://michal-website.vercel.app',
    'https://michal-law.vercel.app',
    'http://localhost:3000',
  ])
  const origin = req.nextUrl.origin
  return allowed.has(origin) ? origin : siteUrl()
}

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}))
  const normalized = typeof email === 'string' ? email.trim().toLowerCase() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 })
  }

  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown'
  if (rateLimited(`ip:${ip}`) || rateLimited(`em:${normalized}`)) {
    return NextResponse.json({ error: 'יותר מדי בקשות, נסי שוב מאוחר יותר' }, { status: 429 })
  }

  if (!graphConfigured()) {
    console.error('[forgot-password] Graph mailer not configured (MS_* env vars)')
    return NextResponse.json({ error: 'server config error' }, { status: 500 })
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  // Only accounts that can actually use the panel get a reset mail; everyone
  // else gets the same `ok` so nothing is revealed.
  const { data: prof } = await admin
    .from('profiles')
    .select('id, role')
    .eq('email', normalized)
    .maybeSingle()
  const isAdmin = prof?.role === 'admin' || prof?.role === 'superadmin'
  if (!isAdmin) return NextResponse.json({ ok: true })

  const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email: normalized,
  })
  const tokenHash = link?.properties?.hashed_token
  if (linkErr || !tokenHash) {
    console.error('[forgot-password] generateLink failed:', linkErr?.message)
    return NextResponse.json({ ok: true }) // still no enumeration signal
  }

  const resetUrl = `${resetBaseUrl(req)}/admin/reset-password?token_hash=${encodeURIComponent(tokenHash)}`

  const html = `<div dir="rtl" style="font-family:Heebo,Arial,sans-serif;background:#f5f8f6;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #dde5e1">
    <div style="background:#35423a;color:#fff;padding:18px 22px;font-size:19px;font-weight:700">איפוס סיסמה — פאנל הניהול</div>
    <div style="padding:22px;color:#35423a;font-size:16px;line-height:1.7">
      התקבלה בקשה לאיפוס הסיסמה של חשבון הניהול באתר.<br>
      ללחיצה על הכפתור ולבחירת סיסמה חדשה:
      <div style="text-align:center;margin:24px 0">
        <a href="${resetUrl}" style="display:inline-block;background:#4d7c60;color:#fff;text-decoration:none;padding:14px 34px;border-radius:6px;font-size:17px;font-weight:600">איפוס סיסמה</a>
      </div>
      הקישור חד-פעמי ותקף לזמן מוגבל. אם לא ביקשת איפוס — אפשר להתעלם מהודעה זו; הסיסמה הקיימת נשארת בתוקף.
    </div>
    <div style="padding:14px 22px;background:#f5f8f6;color:#8aaa98;font-size:13px">
      הודעה אוטומטית ממערכת ניהול האתר.
    </div>
  </div>
</div>`

  const sent = await sendGraphMail({ to: normalized, subject: 'איפוס סיסמה לפאנל הניהול', html })
  if (!sent) {
    console.error('[forgot-password] mail send failed')
    return NextResponse.json({ error: 'send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
