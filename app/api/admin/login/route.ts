import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSupabase } from '../../../../lib/supabase/server'

/**
 * A.5.15/A.5.17/A.8.5 — real authentication for the admin panel.
 * Email + password via Supabase Auth, admin-role check (service-role), and
 * MFA (AAL2) step-up. Session cookies are managed by the SSR client.
 *
 * Body: { email, password, code? }   // code = TOTP for the MFA step-up
 * Returns: { ok: true } | { mfa: true } (needs code) | { error } with status.
 */
export async function POST(req: NextRequest) {
  const { email, password, code } = await req.json().catch(() => ({}))
  if (!email || !password) {
    return NextResponse.json({ error: 'missing credentials' }, { status: 400 })
  }

  const supabase = await getServerSupabase()

  const { data: signIn, error: signErr } = await supabase.auth.signInWithPassword({ email, password })
  if (signErr || !signIn?.user) {
    return NextResponse.json({ error: 'invalid credentials' }, { status: 401 })
  }

  // Authorize: must be an admin/superadmin (checked with the service-role key).
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
  const { data: prof } = await admin.from('profiles').select('role, is_superadmin').eq('id', signIn.user.id).single()
  const isAdmin = prof?.is_superadmin === true || prof?.role === 'admin' || prof?.role === 'superadmin'
  if (!isAdmin) {
    await supabase.auth.signOut()
    return NextResponse.json({ error: 'not authorized' }, { status: 403 })
  }

  // MFA (AAL2) step-up.
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (aal?.currentLevel !== 'aal2') {
    if (aal?.nextLevel !== 'aal2') {
      // No factor enrolled — admin must enrol MFA (do it once via the CRM /mfa page,
      // same Supabase project) before admin access is granted.
      await supabase.auth.signOut()
      return NextResponse.json({ error: 'mfa_enrollment_required' }, { status: 403 })
    }
    if (!code) {
      return NextResponse.json({ mfa: true }) // client should prompt for the TOTP code
    }
    const { data: factors } = await supabase.auth.mfa.listFactors()
    const factor = (factors?.totp || []).find(f => f.status === 'verified')
    if (!factor) {
      await supabase.auth.signOut()
      return NextResponse.json({ error: 'mfa_enrollment_required' }, { status: 403 })
    }
    const { data: ch, error: chErr } = await supabase.auth.mfa.challenge({ factorId: factor.id })
    if (chErr) return NextResponse.json({ error: 'mfa_challenge_failed' }, { status: 400 })
    const { error: vErr } = await supabase.auth.mfa.verify({ factorId: factor.id, challengeId: ch.id, code })
    if (vErr) return NextResponse.json({ error: 'invalid_code' }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
