/**
 * lib/admin-guard.ts — server-side authorization for /api/admin/* routes.
 *
 * Defense in depth: even though the proxy already requires an authenticated
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

async function authenticateAdmin() {
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

  return { ok: true as const, user, supabase }
}

export async function requireAdmin() {
  const auth = await authenticateAdmin()
  if (!auth.ok) return auth

  // MFA (AAL2) enforcement, for accounts that have enrolled a factor.
  //
  // `nextLevel === 'aal2'` means this account HAS a verified factor, so a
  // session that has not completed the challenge is rejected. An account with
  // no factor reports nextLevel 'aal1' and passes on password alone — the
  // policy is "verify the second factor you registered", not "everyone must
  // register one". Keep this in step with the same rule in proxy.ts.
  const { data: aal } = await auth.supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2') {
    return { ok: false as const, res: NextResponse.json({ error: 'mfa_required' }, { status: 403 }) }
  }

  return { ok: true as const, user: auth.user, supabase: auth.supabase }
}

/**
 * Identity + role checks only, tolerating an aal1 session.
 *
 * ONLY for the MFA enrolment routes, which by definition run before the
 * session can reach aal2. It exposes no admin data — never use it for a route
 * that does.
 */
export async function requireAdminPreMfa() {
  return authenticateAdmin()
}
