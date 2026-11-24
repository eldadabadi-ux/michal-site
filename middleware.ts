import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

// Maintenance gate: while on, the public site returns a 503 "under upgrade"
// page to visitors, while /admin and /api/admin stay reachable so content
// editing can continue and signed-in admins can preview their edits live.
//
// Controlled by the MAINTENANCE_MODE env var ('off' brings the public site
// back, 'on' takes it down) so it can be flipped from the Vercel dashboard
// without a code change. Unset falls back to the compiled-in default below.
const MAINTENANCE_DEFAULT = true
const MAINTENANCE_MODE =
  process.env.MAINTENANCE_MODE === 'off' ? false :
  process.env.MAINTENANCE_MODE === 'on'  ? true  :
  MAINTENANCE_DEFAULT

const MAINTENANCE_HTML = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>האתר בשדרוג | עו״ד מיכל גלר-עבאדי</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&display=swap">
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         background: #35423a; font-family: Heebo, sans-serif; }
  .card { background: #fff; padding: 58px 53px; border-radius: 12px; max-width: 456px; width: 90%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25); text-align: center; }
  .icon { width: 72px; height: 72px; border-radius: 50%; background: #eef5f1; border: 2px solid #4d7c60;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 19px; font-size: 31px; }
  h1 { font-size: 24px; font-weight: 700; color: #35423a; margin: 0 0 10px; }
  p { font-size: 17px; color: #577066; margin: 0; line-height: 1.6; }
</style>
</head>
<body>
  <div class="card">
    <div class="icon">⚖️</div>
    <h1>האתר בשדרוג</h1>
    <p>אנחנו מבצעים שיפורים באתר וניחזור בקרוב.<br>תודה על הסבלנות!</p>
  </div>
</body>
</html>`

/**
 * A.5.15/A.5.17/A.8.5 — gate /admin on a real, server-verified Supabase session.
 * (Replaces the previous forgeable `admin_token === 'authenticated'` cookie.)
 * Role + MFA(AAL2) are enforced in the admin API routes via lib/admin-guard.ts.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // One canonical host. www is attached to the Worker only so that old links
  // keep working; it answers with a permanent redirect to the bare domain.
  if (request.nextUrl.hostname === 'www.gellerabadi.co.il') {
    const url = request.nextUrl.clone()
    url.hostname = 'gellerabadi.co.il'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  if (pathname.startsWith('/admin')) {
    // Pages reachable without a session: login and the self-service
    // password-reset pair (A.5.17). The reset API routes validate their own
    // single-use recovery token.
    if (
      pathname === '/admin/login' ||
      pathname === '/admin/forgot-password' ||
      pathname === '/admin/reset-password'
    ) return NextResponse.next()
    const { supabaseResponse, user, aal, mfaRequired } = await updateSession(request)
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    // MFA is enforced for accounts that have enrolled a factor, and not imposed
    // on accounts that have not. An enrolled admin whose session is still aal1
    // can reach nothing but the verification screen. /admin/mfa itself stays
    // open either way, so an admin without a factor can still choose to add one.
    if (pathname !== '/admin/mfa' && mfaRequired && aal !== 'aal2') {
      return NextResponse.redirect(new URL('/admin/mfa', request.url))
    }
    return supabaseResponse
  }

  // Admin API routes enforce their own auth (lib/admin-guard.ts).
  if (pathname.startsWith('/api/admin')) return NextResponse.next()

  if (MAINTENANCE_MODE) {
    // A signed-in admin sees the real site instead of the gate, so edits made
    // in the panel can be previewed exactly as visitors will see them. Only
    // requests that actually carry a Supabase session cookie pay for the
    // verification — anonymous visitors fall straight through to the 503.
    const hasSessionCookie = request.cookies
      .getAll()
      .some(c => c.name.startsWith('sb-') && c.name.includes('auth-token'))

    if (hasSessionCookie) {
      const { user, aal, mfaRequired } = await updateSession(request)
      if (user && (!mfaRequired || aal === 'aal2')) {
        // Flag the request so the site layout can show a "hidden from the
        // public" banner — otherwise the preview is indistinguishable from
        // the site being live again.
        const headers = new Headers(request.headers)
        headers.set('x-admin-preview', '1')
        return NextResponse.next({ request: { headers } })
      }
    }

    // NOTE: an RSC request (a <Link> prefetch) gets this HTML too, which
    // derails the client router. It cannot be special-cased here — Next strips
    // both `_rsc` from the URL and the `rsc` header before Proxy runs. So the
    // rule is on the other side: never point a <Link> at a gated route. The
    // admin's "צפייה באתר" is a plain <a> for exactly this reason.
    return new Response(MAINTENANCE_HTML, {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Retry-After': '86400',
        'Cache-Control': 'no-store',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  // Everything except Next static assets and public files, so the maintenance
  // gate covers all public pages and API routes.
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
}
