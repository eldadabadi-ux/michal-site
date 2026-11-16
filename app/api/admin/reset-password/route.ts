import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSupabase } from '../../../../lib/supabase/server'

/**
 * A.5.17 — self-service password reset for the admin panel, step 2.
 *
 * Verifies the single-use recovery token from the email link, then sets the
 * new password with the service-role admin API. Verifying the token proves
 * control of the mailbox, so the password change is applied server-side even
 * when the account has TOTP enrolled (a recovery session is only AAL1 and
 * could not change it itself) — MFA still guards the actual login afterwards.
 *
 * Body: { token_hash, password }
 * Returns: { ok: true } | { error: 'invalid_token' | ... }
 */
export async function POST(req: NextRequest) {
  const { token_hash, password } = await req.json().catch(() => ({}))
  if (typeof token_hash !== 'string' || !token_hash) {
    return NextResponse.json({ error: 'missing token' }, { status: 400 })
  }
  if (typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: 'weak_password' }, { status: 400 })
  }

  const supabase = await getServerSupabase()
  const { data: verified, error: verErr } = await supabase.auth.verifyOtp({
    type: 'recovery',
    token_hash,
  })
  const userId = verified?.user?.id
  if (verErr || !userId) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
  const { error: updErr } = await admin.auth.admin.updateUserById(userId, { password })
  if (updErr) {
    console.error('[reset-password] update failed:', updErr.message)
    return NextResponse.json({ error: 'update_failed' }, { status: 500 })
  }

  // Drop the AAL1 recovery session everywhere; the admin signs in cleanly
  // with the new password (and MFA, when enrolled).
  await supabase.auth.signOut({ scope: 'global' })

  return NextResponse.json({ ok: true })
}
