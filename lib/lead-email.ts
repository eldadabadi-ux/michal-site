/**
 * lib/lead-email.ts — notifies the office when a lead arrives.
 *
 * Delivery goes through lib/graph-mailer.ts (Microsoft Graph, inside the
 * office's own M365 tenant — no new sub-processor).
 *
 * Best-effort by design: the lead is already committed to the database before
 * this runs, so every failure path logs and returns instead of throwing.
 *
 * Config (see graph-mailer for the MS_* vars):
 *   LEADS_NOTIFY_TO   optional recipient override; otherwise the panel's
 *                     site_settings.contact_email is used
 */
import { graphConfigured, sendGraphMail } from './graph-mailer'

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
  // Not wired up yet — stay silent rather than logging on every submission.
  if (!graphConfigured()) return

  const to = process.env.LEADS_NOTIFY_TO || fallbackTo
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

  // Replying to the notification then goes straight back to the enquirer.
  await sendGraphMail({
    to,
    subject,
    html,
    replyTo: looksLikeEmail(lead.email) ? lead.email : undefined,
  })
}
