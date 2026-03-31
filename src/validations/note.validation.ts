import { z } from 'zod'

export const CreateNoteSchema = z.object({
    content: z.string().min(1),
    customerId: z.number().optional()
})

export const UpdateNoteSchema = z.object({
    content: z.string()
})

export type CreateNoteInput = z.infer<typeof CreateNoteSchema>
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>