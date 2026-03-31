import {prisma} from "../lib/prisma";
import {
    AddMemberInput,
    CreateWorkspaceInput,
    UpdateMemberRoleInput,
    UpdateWorkspaceInput
} from "../validations/workspace.validation";
import {WorkspaceRole} from "../../generated/prisma/enums";

export const createWorkspaceService = async (input: CreateWorkspaceInput, userId: number) => {
    const result = await prisma.workspace.create({
        data: {
            ...input,
            members: {
                create: {
                    role: WorkspaceRole.OWNER,
                    userId: userId,
                }
            }
        }
    })

    return result
}

export const getWorkspacesService = async (userId: number) => {
    const result = await prisma.workspace.findMany({
        where: {
            members: {
                some: {
                    userId,
                }
            }
        }
    })

    return result
}

export const getWorkspaceService = async (id: number) => {
    const result = await prisma.workspace.findUnique({
        where: {
            id
        }
    })

    return result
}

export const updateWorkspaceService = async (input: UpdateWorkspaceInput, id: number, userId: number) => {
    const member = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: id
            }
        }
    })
    if (member?.role !== WorkspaceRole.OWNER) {
        throw new Error('OWNERのみ実行できます')
    }

    const result = await prisma.workspace.update({
        where: {
          id
        },
        data: input
    })

    return result
}

export const deleteWorkspaceService = async (id: number, userId: number) => {
    const member = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: id
            }
        }
    })
    if (!member) {
        throw new Error("アクセス権限がありません")
    }
    if (member?.role !== WorkspaceRole.OWNER) {
        throw new Error('OWNERのみ実行できます')
    }


    const result = await prisma.workspace.delete({
        where: {
            id
        }
    })

    return result
}

// メンバー

export const getMembersService = async (id: number) => {
    const result = await prisma.workspace.findUnique({
        where: {
            id
        },
        include: {
            members: true
        }
    })

    return result
}

export const addMemberService = async (input: AddMemberInput, id: number, userId: number) => {
    const user = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: id
            }
        }
    })
    if (user?.role !== WorkspaceRole.OWNER) {
        throw new Error('OWNERのみ実行できます')
    }

    const targetUser = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    })
    if (!targetUser) {
        throw new Error("ユーザーが存在しません")
    }

    const existsMember = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: targetUser.id,
                workspaceId: id
            }
        }
    })
    if (existsMember) {
        throw new Error("既にメンバーです")
    }

    const result = await prisma.workspaceMember.create({
        data: {
            role: input.role,
            userId: targetUser.id,
            workspaceId: id
        }
    })

    return result
}

export const updateMemberRoleService = async (input: UpdateMemberRoleInput, id: number, userId: number, targetUserId: number) => {
    const user = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: id
            }
        }
    })
    if (user?.role !== WorkspaceRole.OWNER) {
        throw new Error('OWNERのみ実行できます')
    }

    if (input.role === WorkspaceRole.MEMBER) {
        const ownerCount = await prisma.workspaceMember.count({
            where: {
                workspaceId: id,
                role: WorkspaceRole.OWNER
            }
        })
        if (ownerCount <= 1) {
            throw new Error("OWNERが1人の場合、MEMBERに変更できません")
        }
    }

    const result = await prisma.workspaceMember.update({
        where: {
            userId_workspaceId: {
                userId: targetUserId,
                workspaceId: id
            }
        },
        data: input
    })

    return result
}

export const deleteMemberService = async (id: number, userId: number, targetUserId: number) => {
    const member = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId,
                workspaceId: id
            }
        }
    })
    if (member?.role !== WorkspaceRole.OWNER) {
        throw new Error('OWNERのみ実行できます')
    }

    const targetMember = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: targetUserId,
                workspaceId: id
            }
        }
    })
    if (!targetMember) {
        throw new Error('対象のメンバーが存在しません')
    }
    if (targetMember.role === WorkspaceRole.OWNER) {
        const ownerCount = await prisma.workspaceMember.count({
            where: {
                workspaceId: id,
                role: WorkspaceRole.OWNER
            }
        })
        if (ownerCount <= 1) {
            throw new Error("OWNERが1人の場合、削除できません")
        }
    }

    const result = await prisma.workspaceMember.delete({
        where: {
            userId_workspaceId: {
                userId: targetUserId,
                workspaceId: id
            }
        }
    })

    return result
}