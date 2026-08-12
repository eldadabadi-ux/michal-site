/**
 * lib/supabase/client.ts — Supabase SSR client for Client Components.
 * Shares the session cookies written by the server client (lib/supabase/server.ts),
 * so a session opened by /api/admin/login is visible here and any token refresh
 * (e.g. the AAL2 upgrade after MFA verification) is written back to those cookies.
 */
import { createBrowserClient } from '@supabase/ssr'

export function getBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
