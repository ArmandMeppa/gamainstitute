interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  const body = new FormData()
  body.append('secret', secret)
  body.append('response', token)
  body.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const data: TurnstileResponse = await res.json()
  return data.success
}
