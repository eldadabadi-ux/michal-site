import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '../../../../lib/admin-guard'

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.ok) return auth.res
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'no file' }, { status: 400 })

  // Ensure bucket exists (ignore "already exists" error)
  const { error: bucketErr } = await supabase.storage.createBucket('site-images', { public: true })
  if (bucketErr && !bucketErr.message.includes('already exists') && !bucketErr.message.includes('duplicate')) {
    return NextResponse.json({ error: `bucket error: ${bucketErr.message}` }, { status: 500 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filename = `site/${Date.now()}.${ext}`

  const bytes = await file.arrayBuffer()
  const { error: uploadErr } = await supabase.storage
    .from('site-images')
    .upload(filename, bytes, { contentType: file.type, upsert: true })

  if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage
    .from('site-images')
    .getPublicUrl(filename)

  return NextResponse.json({ url: publicUrl })
}
