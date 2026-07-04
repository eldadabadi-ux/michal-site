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
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !TENANT_ID)
    return NextResponse.json({ error: 'env vars missing' }, { status: 503 })
  const supabase = adminClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('tenant_id', TENANT_ID)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.ok) return auth.res
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !TENANT_ID)
    return NextResponse.json({ error: 'not configured' }, { status: 503 })
  const body = await req.json()
  const supabase = adminClient()
  const now = new Date().toISOString()
  const payload = { ...body, tenant_id: TENANT_ID, updated_at: now }
  delete payload.id

  const { data, error } = body.id
    ? await supabase.from('articles').update(payload).eq('id', body.id).eq('tenant_id', TENANT_ID).select().single()
    : await supabase.from('articles').insert({ ...payload, created_at: now }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.ok) return auth.res
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !TENANT_ID)
    return NextResponse.json({ error: 'not configured' }, { status: 503 })
  const { id } = await req.json()
  const supabase = adminClient()
  const { error } = await supabase.from('articles').delete().eq('id', id).eq('tenant_id', TENANT_ID)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
