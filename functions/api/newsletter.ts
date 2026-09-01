import { Resend } from 'resend'
import type { PagesFunction } from '@cloudflare/workers-types'
import { z } from 'zod'

interface Env {
  RESEND_API_KEY: string
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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
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

  const resend = new Resend(env.RESEND_API_KEY)
  const { error } = await resend.contacts.create({ email: parsed.data.email })

  if (error) {
    console.error('[newsletter] Resend error', error)
    return json({ error: 'subscribe_failed' }, 500)
  }

  return json({ ok: true })
}
