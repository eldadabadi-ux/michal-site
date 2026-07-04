import { createClient } from '@supabase/supabase-js'
import { unstable_noStore as noStore } from 'next/cache'

export type Article = {
  id: string
  tenant_id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

const TENANT_ID = process.env.MICHAL_TENANT_ID ?? ''

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function getArticles(limit?: number): Promise<Article[]> {
  noStore()
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !TENANT_ID) return []
  const supabase = adminClient()
  let q = supabase
    .from('articles')
    .select('*')
    .eq('tenant_id', TENANT_ID)
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (limit) q = (q as typeof q).limit(limit)
  const { data } = await q
  return (data ?? []) as Article[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  noStore()
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !TENANT_ID) return null
  const supabase = adminClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('tenant_id', TENANT_ID)
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return (data ?? null) as Article | null
}
