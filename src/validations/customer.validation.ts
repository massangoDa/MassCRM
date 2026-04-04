import { z } from 'zod'

export const CreateCustomerSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    status: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional()
})

export const UpdateCustomerSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    status: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    description: z.string().optional()
})

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>