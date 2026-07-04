import { Resend } from 'resend'
import type { PagesFunction } from '@cloudflare/workers-types'
import { contactSchema } from '../../src/types/contact'

interface Env {
  TURNSTILE_SECRET_KEY: string
  CONTACT_EMAIL_TO: string
  CONTACT_EMAIL_FROM: string
  RESEND_API_KEY: string
}

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

const SUBJECT_LABEL: Record<string, string> = {
  research:    'Collaboration de recherche',
  training:    'Formations & cours',
  partnership: 'Partenariat',
  press:       'Presse & médias',
  other:       'Autre',
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHtml(data: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}): string {
  const label = SUBJECT_LABEL[data.subject] ?? data.subject
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:32px 16px">
    <tr><td>
      <table width="600" cellpadding="0" cellspacing="0" align="center"
             style="background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;max-width:600px;margin:0 auto">
        <tr>
          <td style="background:linear-gradient(135deg,#B56418,#165C71);padding:28px 32px">
            <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#fff;opacity:.8">Gama Institute</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#fff">Nouveau message de contact</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 0">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;width:140px;vertical-align:top">
                  <strong style="color:#1e293b">De</strong>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#1e293b">
                  ${esc(data.firstName)} ${esc(data.lastName)}<br>
                  <a href="mailto:${esc(data.email)}" style="color:#165C71;text-decoration:none">${esc(data.email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:14px;vertical-align:top"><strong style="color:#1e293b">Sujet</strong></td>
                <td style="padding:10px 0;font-size:14px;color:#1e293b">${esc(label)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 32px">
            <p style="margin:0 0 10px;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8">Message</p>
            <div style="background:#f8fafc;border-left:3px solid #B56418;border-radius:0 6px 6px 0;padding:16px 20px;font-size:15px;line-height:1.65;color:#1e293b;white-space:pre-wrap">${esc(data.message)}</div>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0">
            <p style="margin:0;font-size:12px;color:#94a3b8">Répondez directement à ce courriel pour contacter ${esc(data.firstName)} ${esc(data.lastName)}.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  body.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const data: TurnstileResponse = await res.json()
  return data.success
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return json({ error: 'validation_failed', details: parsed.error.flatten() }, 422)
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? ''
  const verified = await verifyTurnstile(parsed.data.turnstileToken, env.TURNSTILE_SECRET_KEY, ip)
  if (!verified) {
    return json({ error: 'turnstile_failed' }, 403)
  }

  const resend = new Resend(env.RESEND_API_KEY)
  const label = SUBJECT_LABEL[parsed.data.subject] ?? parsed.data.subject
  const { error } = await resend.emails.send({
    from: env.CONTACT_EMAIL_FROM,
    to: [env.CONTACT_EMAIL_TO],
    replyTo: parsed.data.email,
    subject: `[Gama Institute] ${label} — ${parsed.data.firstName} ${parsed.data.lastName}`,
    html: buildHtml(parsed.data),
  })

  if (error) {
    console.error('[contact] Resend error', error)
    return json({ error: 'email_failed' }, 500)
  }

  return json({ ok: true })
}
