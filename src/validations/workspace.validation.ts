import { z } from "zod"
import {WorkspaceRole} from "../../generated/prisma/enums";

export const CreateWorkspaceSchema = z.object({
    name: z.string().min(1)
})

export const UpdateWorkspaceSchema = z.object({
    name: z.string().min(1)
})

export const AddMemberSchema = z.object({
    email: z.string().email(),
    role: z.nativeEnum(WorkspaceRole),
})

export const UpdateMemberRoleSchema = z.object({
    role: z.nativeEnum(WorkspaceRole)
})

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>

export type AddMemberInput = z.infer<typeof AddMemberSchema>
export type UpdateMemberRoleInput = z.infer<typeof UpdateMemberRoleSchema>