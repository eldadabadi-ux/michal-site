/**
 * lib/supabase/server.ts — Supabase SSR client for Route Handlers / Server Components.
 * Uses the ANON key with the caller's session cookies (real auth), NOT the
 * service-role key. Requires env NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Called from a Server Component (read-only cookies) — safe to ignore;
            // the middleware refreshes the session cookies.
          }
        },
      },
    }
  )
}
