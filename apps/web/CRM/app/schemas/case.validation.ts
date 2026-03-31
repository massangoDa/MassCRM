import { z } from 'zod'

enum CaseStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  UNBILLED = "UNBILLED",
  BILLED = "BILLED"
}

enum BillingCycle {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY"
}

export const CreateCaseSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    startDate: z.coerce.date(),
    finishDate: z.coerce.date().optional(),
    amount: z.number(),
    status: z.enum(CaseStatus),
    withholdingTax: z.boolean(),
    description: z.string().optional(),
    isRecurring: z.boolean(),
    billingCycle: z.enum(BillingCycle).optional(),
    nextBillingDate: z.coerce.date().optional(),
    customerId: z.number()
})

export const UpdateCaseSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    startDate: z.coerce.date(),
    finishDate: z.coerce.date().optional(),
    amount: z.number(),
    status: z.enum(CaseStatus).optional(),
    withholdingTax: z.boolean(),
    description: z.string().optional(),
    isRecurring: z.boolean(),
    billingCycle: z.enum(BillingCycle).optional(),
    nextBillingDate: z.coerce.date().optional(),
})

export type CreateCaseInput = z.infer<typeof CreateCaseSchema>
export type UpdateCaseInput = z.infer<typeof UpdateCaseSchema>
