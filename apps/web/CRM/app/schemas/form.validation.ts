import { z } from 'zod'

export const FIELD_TYPES = ['text', 'number', 'phone', 'website', 'textarea', 'select', 'email'] as const

export const FormSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(FIELD_TYPES),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(false).optional()
})

export type FormType = z.infer<typeof FormSchema>
