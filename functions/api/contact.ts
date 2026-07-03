import type { PagesFunction } from '@cloudflare/workers-types'
import { contactSchema } from '../../src/types/contact'

interface Env {
  TURNSTILE_SECRET_KEY: string
  CONTACT_EMAIL_TO: string
  RESEND_API_KEY?: string
}

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  body.append('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
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

  // In production: send email via Resend/SendGrid/etc using env.RESEND_API_KEY
  // For now: log to Cloudflare worker logs and return success
  console.log('[contact]', JSON.stringify({
    name: `${parsed.data.firstName} ${parsed.data.lastName}`,
    email: parsed.data.email,
    subject: parsed.data.subject,
    messageLength: parsed.data.message.length,
  }))

  return json({ ok: true })
}
