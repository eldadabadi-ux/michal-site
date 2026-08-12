import { NextResponse } from 'next/server'
import { requireAdminPreMfa } from '../../../../../lib/admin-guard'

/**
 * Starts TOTP enrolment for the signed-in admin and returns the QR payload.
 *
 * Runs server-side on purpose: the session lives in cookies written by
 * /api/admin/login, and doing this here avoids depending on the browser being
 * able to read them (or on NEXT_PUBLIC_* being inlined into the client bundle).
 */
export async function POST() {
  const auth = await requireAdminPreMfa()
  if (!auth.ok) return auth.res

  const { supabase } = auth

  const { data: factors, error: listErr } = await supabase.auth.mfa.listFactors()
  if (listErr) {
    return NextResponse.json({ error: 'list_failed', detail: listErr.message }, { status: 500 })
  }

  // Already set up — the caller should just proceed.
  if ((factors?.totp || []).some(f => f.status === 'verified')) {
    return NextResponse.json({ alreadyEnrolled: true })
  }

  // Clear half-finished factors from an abandoned attempt so enroll() is clean.
  for (const f of factors?.totp || []) {
    await supabase.auth.mfa.unenroll({ factorId: f.id })
  }

  const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' })
  if (error || !data) {
    return NextResponse.json({ error: 'enroll_failed', detail: error?.message }, { status: 500 })
  }

  return NextResponse.json({
    factorId: data.id,
    qr: data.totp.qr_code,
    secret: data.totp.secret,
  })
}
