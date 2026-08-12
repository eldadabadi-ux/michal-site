/**
 * lib/lead-email.ts — notifies the office when a lead arrives.
 *
 * Deliberately best-effort: a mail failure must never cost us the lead, which
 * is already committed to the database by the time this runs. Every path
 * returns instead of throwing, and an unconfigured mailer is a no-op rather
 * than an error.
 *
 * Config:
 *   RESEND_API_KEY    required — without it nothing is sent
 *   LEADS_FROM_EMAIL  sender, must sit on a Resend-verified domain
 *                     (e.g. "אתר מיכל גלר-עבאדי <noreply@send.example.co.il>")
 *   LEADS_NOTIFY_TO   optional override; otherwise site_settings.contact_email
 */
import { Resend } from 'resend'

export type LeadPayload = {
  name: string
  email?: string | null
  phone?: string | null
  subject?: string | null
  message?: string | null
}

/** Lead fields are visitor-supplied, so they are escaped before entering HTML. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function looksLikeEmail(s: string | null | undefined): s is string {
  return !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function row(label: string, value: string | null | undefined): string {
  if (!value?.trim()) return ''
  return `<tr>
    <td style="padding:8px 12px;color:#8aaa98;font-size:14px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
    <td style="padding:8px 12px;color:#35423a;font-size:16px">${esc(value.trim()).replace(/\n/g, '<br>')}</td>
  </tr>`
}

export async function sendLeadNotification(lead: LeadPayload, fallbackTo: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEADS_FROM_EMAIL
  const to = process.env.LEADS_NOTIFY_TO || fallbackTo

  // Not configured yet — stay silent rather than logging on every submission.
  if (!apiKey || !from) return
  if (!looksLikeEmail(to)) {
    console.error('[lead-email] no valid recipient; set LEADS_NOTIFY_TO or contact_email')
    return
  }

  const subject = lead.subject?.trim()
    ? `פנייה חדשה מהאתר: ${lead.subject.trim()}`
    : 'פנייה חדשה מהאתר'

  const html = `<div dir="rtl" style="font-family:Heebo,Arial,sans-serif;background:#f5f8f6;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #dde5e1">
    <div style="background:#35423a;color:#fff;padding:18px 22px;font-size:19px;font-weight:700">פנייה חדשה מהאתר</div>
    <table style="width:100%;border-collapse:collapse">
      ${row('שם', lead.name)}
      ${row('טלפון', lead.phone)}
      ${row('דוא"ל', lead.email)}
      ${row('נושא', lead.subject)}
      ${row('הודעה', lead.message)}
    </table>
    <div style="padding:14px 22px;background:#f5f8f6;color:#8aaa98;font-size:13px">
      הפנייה נשמרה גם בפאנל הניהול, תחת "פניות נכנסות".
    </div>
  </div>
</div>`

  const text = [
    'פנייה חדשה מהאתר',
    '',
    `שם: ${lead.name}`,
    lead.phone   ? `טלפון: ${lead.phone}` : '',
    lead.email   ? `דוא"ל: ${lead.email}` : '',
    lead.subject ? `נושא: ${lead.subject}` : '',
    lead.message ? `\nהודעה:\n${lead.message}` : '',
  ].filter(Boolean).join('\n')

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject,
      html,
      text,
      // Replying to the notification goes straight back to the person.
      ...(looksLikeEmail(lead.email) ? { replyTo: lead.email } : {}),
    })
    if (error) console.error('[lead-email] send failed:', error)
  } catch (e) {
    console.error('[lead-email] send threw:', e)
  }
}
