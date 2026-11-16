/**
 * lib/graph-mailer.ts — transactional email through Microsoft Graph.
 *
 * Shared by lead notifications (lib/lead-email.ts) and the admin
 * password-reset flow. Sends inside the tenant the office already runs its
 * mail in, so nothing reaches a new sub-processor. Auth is an Entra app
 * registration using client credentials: the mailbox password is never
 * involved, and the app's Mail.Send permission is expected to be scoped to the
 * single sender mailbox by an application access policy (without that scoping
 * the permission covers every mailbox in the tenant).
 *
 * Config:
 *   MS_TENANT_ID / MS_CLIENT_ID / MS_CLIENT_SECRET  the Entra app registration
 *   MS_SENDER_UPN     mailbox to send as, e.g. michal@gellerabadi.co.il
 */

export function graphConfigured(): boolean {
  return !!(
    process.env.MS_TENANT_ID &&
    process.env.MS_CLIENT_ID &&
    process.env.MS_CLIENT_SECRET &&
    process.env.MS_SENDER_UPN
  )
}

/**
 * Client-credential token, cached in module scope. A warm serverless instance
 * handling several sends reuses one token instead of re-authenticating per
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
      console.error('[graph-mailer] token request failed:', res.status, await res.text().catch(() => ''))
      return null
    }

    const data = await res.json()
    if (!data?.access_token) {
      console.error('[graph-mailer] token response had no access_token')
      return null
    }

    cachedToken = {
      value: data.access_token,
      expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000,
    }
    return cachedToken.value
  } catch (e) {
    console.error('[graph-mailer] token request threw:', e)
    return null
  }
}

export type GraphMail = {
  to: string
  subject: string
  html: string
  replyTo?: string
}

/** Sends one HTML mail. Never throws; returns false on any failure. */
export async function sendGraphMail({ to, subject, html, replyTo }: GraphMail): Promise<boolean> {
  const tenantId = process.env.MS_TENANT_ID
  const clientId = process.env.MS_CLIENT_ID
  const clientSecret = process.env.MS_CLIENT_SECRET
  const sender = process.env.MS_SENDER_UPN
  if (!tenantId || !clientId || !clientSecret || !sender) return false

  const token = await getAccessToken(tenantId, clientId, clientSecret)
  if (!token) return false

  const message: Record<string, unknown> = {
    subject,
    body: { contentType: 'HTML', content: html },
    toRecipients: [{ emailAddress: { address: to } }],
  }
  if (replyTo) {
    message.replyTo = [{ emailAddress: { address: replyTo } }]
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
        // Keep the office's Sent Items free of machine-generated mail.
        body: JSON.stringify({ message, saveToSentItems: false }),
      }
    )

    // Graph acknowledges with 202; delivery itself happens afterwards.
    if (res.status !== 202) {
      console.error('[graph-mailer] sendMail failed:', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (e) {
    console.error('[graph-mailer] sendMail threw:', e)
    return false
  }
}
