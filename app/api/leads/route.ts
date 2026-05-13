import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, category, company, description } = body

  if (!name || !email || !phone || !category) {
    return NextResponse.json({ error: 'שדות חובה חסרים' }, { status: 400 })
  }

  const { error: insertError } = await supabase
    .from('website_leads')
    .insert({ name, email, phone, category, company: company || null, description: description || null })

  if (insertError) {
    console.error('Supabase insert error:', insertError)
    return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 })
  }

  const { data: templates } = await supabase
    .from('website_email_templates')
    .select('subject, body, signature')
    .eq('name', 'lead-confirmation')
    .single()

  if (templates) {
    const body = templates.body.replace(/\{\{name\}\}/g, name)
    const text = `${body}\n\n${templates.signature || ''}`
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'office@auerbach-yarden.co.il',
      to: email,
      subject: templates.subject,
      text,
    }).catch(err => console.error('Resend error:', err))
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
