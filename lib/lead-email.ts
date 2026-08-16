/**
 * lib/lead-email.ts — notifies the office when a lead arrives.
 *
 * Sends through Microsoft Graph, inside the tenant the office already runs its
 * mail in, so enquiry data reaches no new sub-processor. Auth is an Entra app
 * registration using client credentials: the mailbox password is never
 * involved, and the app's Mail.Send permission is expected to be scoped to the
 * single sender mailbox by an application access policy (without that scoping
 * the permission covers every mailbox in the tenant).
 *
 * Best-effort by design: the lead is already committed to the database before
 * this runs, so every failure path logs and returns instead of throwing.
 *
 * Config:
 *   MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET  the Entra app registration
 *   MS_SENDER_UPN     mailbox to send as, e.g. michal@gellerabadi.co.il
 *   LEADS_NOTIFY_TO   optional recipient override; otherwise the panel's
 *                     site_settings.contact_email is used
 */

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

/**
 * Client-credential token, cached in module scope. A warm serverless instance
 * handling several enquiries reuses one token instead of re-authenticating per
 * send; the 60s margin keeps a token from expiring mid-request.
 */
let cachedToken: { value: string; expiresAt: number } | null = null

async function getAccessToken(tenantId: string, clientId: string, clientSecret: string): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value

  try {
    const res = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    })

    if (!res.ok) {
      // Body carries Entra's error code (bad secret, missing consent, …) and no
      // credentials, so it is safe and useful to log.
      console.error('[lead-email] token request failed:', res.status, await res.text().catch(() => ''))
      return null
    }

    const data = await res.json()
    if (!data?.access_token) {
      console.error('[lead-email] token response had no access_token')
      return null
    }

    cachedToken = {
      value: data.access_token,
      expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000,
    }
    return cachedToken.value
  } catch (e) {
    console.error('[lead-email] token request threw:', e)
    return null
  }
}

export async function sendLeadNotification(lead: LeadPayload, fallbackTo: string): Promise<void> {
  const tenantId = process.env.MS_TENANT_ID
  const clientId = process.env.MS_CLIENT_ID
  const clientSecret = process.env.MS_CLIENT_SECRET
  const sender = process.env.MS_SENDER_UPN
  const to = process.env.LEADS_NOTIFY_TO || fallbackTo

  // Not wired up yet — stay silent rather than logging on every submission.
  if (!tenantId || !clientId || !clientSecret || !sender) return
  if (!looksLikeEmail(to)) {
    console.error('[lead-email] no valid recipient; set LEADS_NOTIFY_TO or contact_email')
    return
  }

  const token = await getAccessToken(tenantId, clientId, clientSecret)
  if (!token) return

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

  const message: Record<string, unknown> = {
    subject,
    body: { contentType: 'HTML', content: html },
    toRecipients: [{ emailAddress: { address: to } }],
  }
  // Replying to the notification then goes straight back to the enquirer.
  if (looksLikeEmail(lead.email)) {
    message.replyTo = [{ emailAddress: { address: lead.email } }]
  }

  try {
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // Keep the office's Sent Items free of machine-generated notifications.
        body: JSON.stringify({ message, saveToSentItems: false }),
      }
    )

    // Graph acknowledges with 202; delivery itself happens afterwards.
    if (res.status !== 202) {
      console.error('[lead-email] sendMail failed:', res.status, await res.text().catch(() => ''))
    }
  } catch (e) {
    console.error('[lead-email] sendMail threw:', e)
  }
}
