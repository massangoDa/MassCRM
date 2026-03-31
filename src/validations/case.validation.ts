import { z } from 'zod'
import {BillingCycle, CaseStatus} from "../../generated/prisma/enums";

export const CreateCaseSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    startDate: z.coerce.date(),
    finishDate: z.coerce.date().optional(),
    amount: z.number(),
    status: z.nativeEnum(CaseStatus),
    withholdingTax: z.boolean(),
    description: z.string().optional(),
    isRecurring: z.boolean(),
    billingCycle: z.nativeEnum(BillingCycle).optional(),
    nextBillingDate: z.coerce.date().optional(),
    customerId: z.number()
})

export const UpdateCaseSchema = z.object({
    name: z.string().min(1),
    category: z.string().optional(),
    startDate: z.coerce.date(),
    finishDate: z.coerce.date().optional(),
    amount: z.number(),
    status: z.nativeEnum(CaseStatus).optional(),
    withholdingTax: z.boolean(),
    description: z.string().optional(),
    isRecurring: z.boolean(),
    billingCycle: z.nativeEnum(BillingCycle).optional(),
    nextBillingDate: z.coerce.date().optional(),
})

export type CreateCaseInput = z.infer<typeof CreateCaseSchema>
export type UpdateCaseInput = z.infer<typeof UpdateCaseSchema>