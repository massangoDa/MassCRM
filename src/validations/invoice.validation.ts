import { z } from 'zod'
import { InvoiceStatus } from "../../generated/prisma/enums";

export const CreateInvoiceSchema = z.object({
    number: z.string(),
    subtotal: z.number(),
    tax: z.number(),
    withholdingTax: z.number().optional(),
    total: z.number(),
    date: z.coerce.date(),
    dueDate: z.coerce.date(),
    status: z.nativeEnum(InvoiceStatus).optional(),
    description: z.string().optional(),
    caseId: z.string()
})

export const UpdateInvoiceSchema = z.object({
    number: z.string(),
    subtotal: z.number(),
    tax: z.number(),
    withholdingTax: z.number().optional(),
    total: z.number(),
    date: z.coerce.date(),
    dueDate: z.coerce.date(),
    status: z.nativeEnum(InvoiceStatus).optional(),
    description: z.string().optional(),
})

export const CreateLineItemSchema = z.object({
    name: z.string(),
    amount: z.number(),
    quantity: z.number(),
    taxRate: z.number(),
    invoiceId: z.string()
})

export const UpdateLineItemSchema = z.object({
    name: z.string(),
    amount: z.number(),
    quantity: z.number(),
    taxRate: z.number()
})

export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>
export type UpdateInvoiceInput = z.infer<typeof UpdateInvoiceSchema>

export type CreateLineItemInput = z.infer<typeof CreateLineItemSchema>
export type UpdateLineItemInput = z.infer<typeof UpdateLineItemSchema>