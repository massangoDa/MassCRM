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

export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string().nullable(),
  status: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  website: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>
export type Customer = z.infer<typeof CustomerSchema>
