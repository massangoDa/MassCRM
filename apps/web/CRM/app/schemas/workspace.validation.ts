import { z } from "zod"

enum WorkspaceRole {
  OWNER = "OWNER",
  MEMBER = "MEMBER"
}

export const CreateWorkspaceSchema = z.object({
    name: z.string().min(1)
})

export const UpdateWorkspaceSchema = z.object({
    name: z.string().min(1)
})

export const AddMemberSchema = z.object({
    email: z.string().email(),
    role: z.enum(WorkspaceRole),
})

export const UpdateMemberRoleSchema = z.object({
    role: z.enum(WorkspaceRole)
})

export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>
export type UpdateWorkspaceInput = z.infer<typeof UpdateWorkspaceSchema>

export type AddMemberInput = z.infer<typeof AddMemberSchema>
export type UpdateMemberRoleInput = z.infer<typeof UpdateMemberRoleSchema>
