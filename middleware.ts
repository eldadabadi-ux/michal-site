import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

/**
 * A.5.15/A.5.17/A.8.5 — gate /admin on a real, server-verified Supabase session.
 * (Replaces the previous forgeable `admin_token === 'authenticated'` cookie.)
 * Role + MFA(AAL2) are enforced in the admin API routes via lib/admin-guard.ts.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const { supabaseResponse, user } = await updateSession(request)
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return supabaseResponse
}

export const config = { matcher: ['/admin/:path*'] }
