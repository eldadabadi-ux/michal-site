import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service-role key bypasses RLS — safe for server-side use only
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Michal's tenant ID — set this after running the migration and identifying the tenant
const MICHAL_TENANT_ID = process.env.MICHAL_TENANT_ID ?? ''

// A.8.12 — best-effort per-instance rate limit (5 / 10 min / IP). For a hard,
// distributed limit add a Cloudflare zone rate-limit rule on /api/leads.
const RL = new Map<string, { n: number; resetAt: number }>()
function rateLimited(ip: string): boolean {
  const now = Date.now(), windowMs = 10 * 60 * 1000, max = 5
  const e = RL.get(ip)
  if (!e || now > e.resetAt) { RL.set(ip, { n: 1, resetAt: now + windowMs }); return false }
  if (e.n >= max) return true
  e.n++
  return false
}

// A.8.12 — Cloudflare Turnstile bot verification (active once TURNSTILE_SECRET_KEY is set).
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured yet → don't block existing form
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    const data = await res.json()
    return data?.success === true
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'יותר מדי בקשות, נסו שוב מאוחר יותר' }, { status: 429 })
    }

    const body = await req.json()
    const { name, email, phone, subject, message, turnstileToken, consent } = body

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'שדות חובה חסרים' }, { status: 400 })
    }

    // A.8.12 — bot protection.
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json({ error: 'אימות אנושי נכשל' }, { status: 403 })
    }

    // Privacy — explicit consent (enforced once LEADS_REQUIRE_CONSENT=true and the
    // contact form sends `consent`). Gated so the live form is not broken pre-rollout.
    if (process.env.LEADS_REQUIRE_CONSENT === 'true' && consent !== true) {
      return NextResponse.json({ error: 'נדרשת הסכמה לעיבוד הפרטים' }, { status: 400 })
    }

    if (!MICHAL_TENANT_ID) {
      console.error('[leads] MICHAL_TENANT_ID not set')
      return NextResponse.json({ error: 'server config error' }, { status: 500 })
    }

    const { error } = await supabase.from('leads').insert({
      tenant_id: MICHAL_TENANT_ID,
      name: name.trim(),
      email: email?.trim()?.toLowerCase() || null,
      phone: phone?.trim() || null,
      subject: subject?.trim() || null,
      message: message?.trim() || null,
      source: 'website',
    })

    if (error) {
      console.error('[leads] insert error:', error)
      return NextResponse.json({ error: 'database error' }, { status: 500 })
    }

    // Fire-and-forget: trigger email auto-reply via Cloudflare Worker
    const workerUrl = process.env.LEAD_NOTIFY_WORKER_URL
    if (workerUrl) {
      fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId: MICHAL_TENANT_ID, name, email, subject }),
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }
}
