import { z } from 'zod'

export const ContactSubject = z.enum([
  'research',
  'training',
  'partnership',
  'press',
  'other',
])
export type ContactSubject = z.infer<typeof ContactSubject>

export const contactSchema = z.object({
  firstName:      z.string().min(1, 'Required').max(100),
  lastName:       z.string().min(1, 'Required').max(100),
  email:          z.string().email('Invalid email').max(254),
  subject:        ContactSubject,
  message:        z.string().min(10, 'At least 10 characters').max(4000),
  turnstileToken: z.string().min(1, 'Required'),
})

export type ContactPayload = z.infer<typeof contactSchema>
