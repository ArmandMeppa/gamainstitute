import { z } from 'zod'

export const ContactSubject = z.enum([
  'research',
  'supervision',
  'university',
  'industry',
  'training',
  'weekpaper',
  'press',
  'other',
])
export type ContactSubject = z.infer<typeof ContactSubject>

// Full schema — used server-side (includes Turnstile token)
export const contactSchema = z.object({
  firstName:      z.string().min(1, 'Required').max(100),
  lastName:       z.string().min(1, 'Required').max(100),
  email:          z.string().min(1, 'Required').email('Invalid email').max(254),
  subject:        ContactSubject,
  message:        z.string().min(1, 'Message should not be empty').max(4000),
  turnstileToken: z.string().min(1, 'Required'),
})

// Client form schema — localized messages, omits turnstileToken
export function makeContactFormSchema(lang: 'fr' | 'en') {
  const m = lang === 'fr'
    ? { required: 'Requis', email: 'Courriel invalide', messageEmpty: 'Le message ne doit pas être vide' }
    : { required: 'Required', email: 'Invalid email',   messageEmpty: 'Message should not be empty' }

  return z.object({
    firstName: z.string().min(1, m.required).max(100),
    lastName:  z.string().min(1, m.required).max(100),
    email:     z.string().min(1, m.required).email(m.email).max(254),
    subject:   ContactSubject,
    message:   z.string().min(1, m.messageEmpty).max(4000),
  })
}

export type ContactPayload     = z.infer<typeof contactSchema>
export type ContactFormPayload = z.infer<ReturnType<typeof makeContactFormSchema>>
