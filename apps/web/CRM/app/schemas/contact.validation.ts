import { z } from 'zod'

export const CreateContactSchema = z.object({
    lastName: z.string().min(1),
    firstName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    description: z.string().optional()
})

export const UpdateContactSchema = z.object({
    lastName: z.string().min(1),
    firstName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    description: z.string().optional()
})

export type CreateContactInput = z.infer<typeof CreateContactSchema>
export type UpdateContactInput = z.infer<typeof UpdateContactSchema>