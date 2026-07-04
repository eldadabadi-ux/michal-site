import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '../../../../lib/admin-guard'

const TENANT_ID = process.env.MICHAL_TENANT_ID ?? ''

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.ok) return auth.res
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !TENANT_ID) {
    return NextResponse.json({})
  }
  const supabase = adminClient()
  const { data } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('tenant_id', TENANT_ID)

  const map: Record<string, unknown> = {}
  for (const row of data ?? []) {
    try { map[row.key] = JSON.parse(row.value) }
    catch { map[row.key] = row.value }
  }
  return NextResponse.json(map)
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.ok) return auth.res
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not set' }, { status: 503 })
  }
  if (!TENANT_ID) {
    return NextResponse.json({ error: 'MICHAL_TENANT_ID not set' }, { status: 503 })
  }
  const body: Record<string, unknown> = await req.json()
  const supabase = adminClient()

  const upserts = Object.entries(body).map(([key, value]) => ({
    tenant_id: TENANT_ID,
    key,
    value: JSON.stringify(value),
    updated_at: new Date().toISOString(),
  }))

  const { error } = await supabase
    .from('site_settings')
    .upsert(upserts, { onConflict: 'tenant_id,key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
