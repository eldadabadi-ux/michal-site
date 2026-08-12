/**
 * lib/admin-guard.ts — server-side authorization for /api/admin/* routes.
 *
 * Defense in depth: even though middleware already requires an authenticated
 * Supabase session, every admin data route re-verifies here:
 *   1. a valid Supabase session (anon SSR client),
 *   2. an admin role (read via service-role key — robust regardless of profiles RLS),
 *   3. completed MFA (AAL2).
 *
 * Returns { ok: true, user } or { ok: false, res } with the proper status.
 */
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSupabase } from './supabase/server'

export async function requireAdmin() {
  const supabase = await getServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { ok: false as const, res: NextResponse.json({ error: 'unauthenticated' }, { status: 401 }) }
  }

  // Role check via service-role (does not depend on profiles RLS self-read).
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
  const { data: prof } = await admin.from('profiles').select('role').eq('id', user.id).single()
  const isAdmin = prof?.role === 'admin' || prof?.role === 'superadmin'
  if (!isAdmin) {
    return { ok: false as const, res: NextResponse.json({ error: 'forbidden' }, { status: 403 }) }
  }

  // MFA (AAL2) enforcement.
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (aal?.currentLevel !== 'aal2') {
    return { ok: false as const, res: NextResponse.json({ error: 'mfa_required' }, { status: 403 }) }
  }

  return { ok: true as const, user }
}
