import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

// Maintenance gate: while true, every public route returns a 503 "under
// upgrade" page, while /admin and /api/admin stay reachable so content
// editing can continue. Flip to false and redeploy to bring the site back.
const MAINTENANCE_MODE = true

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
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const { supabaseResponse, user } = await updateSession(request)
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return supabaseResponse
  }

  // Admin API routes enforce their own auth (lib/admin-guard.ts).
  if (pathname.startsWith('/api/admin')) return NextResponse.next()

  if (MAINTENANCE_MODE) {
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
