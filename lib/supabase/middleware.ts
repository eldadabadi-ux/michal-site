/**
 * lib/supabase/middleware.ts — refresh the Supabase session in Next middleware
 * and expose the authenticated user. Standard @supabase/ssr pattern.
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // AAL is read from the access-token claims (no extra network round-trip).
  //
  // `currentLevel` is what this session has reached; `nextLevel` is what it
  // COULD reach, which is 'aal2' only when the account has a verified factor.
  // That difference is the whole policy: MFA is required of an account that has
  // enrolled one, and not imposed on an account that has not.
  let aal: string | null = null
  let mfaRequired = false
  if (user) {
    const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    aal = data?.currentLevel ?? null
    mfaRequired = data?.nextLevel === 'aal2'
  }

  return { supabaseResponse, user, aal, mfaRequired }
}
