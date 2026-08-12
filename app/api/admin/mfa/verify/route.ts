import { NextRequest, NextResponse } from 'next/server'
import { requireAdminPreMfa } from '../../../../../lib/admin-guard'

/**
 * Verifies the first TOTP code, which completes enrolment and upgrades the
 * session to aal2. The SSR client writes the refreshed cookies on the way out,
 * so the next request passes the proxy's aal2 check.
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdminPreMfa()
  if (!auth.ok) return auth.res

  const { supabase } = auth
  const { factorId, code } = await req.json().catch(() => ({}))
  if (!factorId || !code) {
    return NextResponse.json({ error: 'missing_params' }, { status: 400 })
  }

  const { data: ch, error: chErr } = await supabase.auth.mfa.challenge({ factorId })
  if (chErr || !ch) {
    return NextResponse.json({ error: 'challenge_failed', detail: chErr?.message }, { status: 400 })
  }

  const { error: vErr } = await supabase.auth.mfa.verify({ factorId, challengeId: ch.id, code })
  if (vErr) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
