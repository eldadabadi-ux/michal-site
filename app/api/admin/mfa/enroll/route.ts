import { NextResponse } from 'next/server'
import { requireAdminPreMfa } from '../../../../../lib/admin-guard'

/**
 * Starts TOTP enrolment for the signed-in admin and returns the QR payload.
 *
 * Runs server-side on purpose: the session lives in cookies written by
 * /api/admin/login, and doing this here avoids depending on the browser being
 * able to read them (or on NEXT_PUBLIC_* being inlined into the client bundle).
 */
/**
 * Supabase hands back the QR as `data:image/svg+xml;utf-8,<svg …>` with literal
 * '#' characters in the fill attributes. A browser reads the first '#' as the
 * start of a URL fragment, truncates the payload, and the image fails to load —
 * so re-encode it as base64, which has no such delimiter.
 */
function toRenderableDataUri(qr: string): string {
  if (!qr || qr.startsWith('data:image/svg+xml;base64,')) return qr

  let svg = qr.startsWith('data:') ? qr.slice(qr.indexOf(',') + 1) : qr
  try {
    svg = decodeURIComponent(svg)
  } catch {
    // Payload was already literal, not percent-encoded — keep it as is.
  }
  if (!svg.trimStart().startsWith('<svg')) return qr

  return 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64')
}

export async function POST() {
  const auth = await requireAdminPreMfa()
  if (!auth.ok) return auth.res

  const { supabase } = auth

  const { data: factors, error: listErr } = await supabase.auth.mfa.listFactors()
  if (listErr) {
    return NextResponse.json({ error: 'list_failed', detail: listErr.message }, { status: 500 })
  }

  // Already enrolled: this session only has to clear the code challenge. Do NOT
  // send the caller on to /admin/content — the proxy would bounce an aal1
  // session straight back here, and the two would redirect at each other
  // forever.
  const verified = (factors?.totp || []).find(f => f.status === 'verified')
  if (verified) {
    return NextResponse.json({ mode: 'verify', factorId: verified.id })
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
    mode: 'enroll',
    factorId: data.id,
    qr: toRenderableDataUri(data.totp.qr_code),
    secret: data.totp.secret,
    uri: data.totp.uri,
  })
}
