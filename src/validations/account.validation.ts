import { z } from 'zod'

export const UpdateAccountSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    icon: z.string().min(1).optional(),
})

export const UpdatePasswordSchema = z.object({
    currentPassword: z.string().min(1).optional(),
    newPassword: z.string().min(1)
})

export const ConnectGoogleSchema = z.object({
    googleId: z.string().min(1)
})

export type UpdateAccountInput = z.infer<typeof UpdateAccountSchema>
export type UpdatePasswordInput = z.infer<typeof UpdatePasswordSchema>
export type ConnectGoogleInput = z.infer<typeof ConnectGoogleSchema>