import type { PagesFunction } from '@cloudflare/workers-types'
import { z } from 'zod'

interface Env {
  TURNSTILE_SECRET_KEY?: string
}

const schema = z.object({
  email: z.string().email().max(254),
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return json({ error: 'validation_failed', details: parsed.error.flatten() }, 422)
  }

  // Stub: always returns success without storing the email.
  // TODO: integrate Mailchimp / ConvertKit / etc.
  console.log('[newsletter] stub subscribe:', parsed.data.email)

  return json({ ok: true })
}
