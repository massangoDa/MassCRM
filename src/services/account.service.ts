import {prisma} from "../lib/prisma";
import {ConnectGoogleInput, UpdateAccountInput, UpdatePasswordInput} from "../validations/account.validation";
import bcrypt from "bcrypt";
import {WorkspaceRole} from "../../generated/prisma/enums";

export const getAccountService = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return result
}

export const updatePasswordService = async (input: UpdatePasswordInput, id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (!user) {
        throw new Error("ユーザーが存在しません")
    }
    if (!user.password) {
        const hashedPassword = await bcrypt.hash(input.newPassword, 10)
        return prisma.user.update({
            where: {id},
            data: {
                password: hashedPassword
            }
        });
    }

    if (user.password) {
        if (!input.currentPassword) {
            throw new Error("現在のパスワードを入力してください")
        }
        const isMatch = await bcrypt.compare(input.currentPassword, user.password)
        if (!isMatch) {
            throw new Error("パスワードが正しくありません")
        }
    }

    const hashedPassword = await bcrypt.hash(input.newPassword, 10)

    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            password: hashedPassword
        }
    })

    return result
}

export const updateAccountService = async (input: UpdateAccountInput, id: string) => {
    const existsEmail = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    })
    if (existsEmail && existsEmail.id !== id) {
        throw new Error("このメールアドレスは既に使用されています")
    }

    const result = await prisma.user.update({
        where: {
            id
        },
        data: input
    })

    return result
}

export const connectGoogleService = async (input: ConnectGoogleInput, id: string) => {
    const existsGoogleId = await prisma.user.count({
        where: {
            googleId: input.googleId
        }
    })
    if (existsGoogleId) {
        throw new Error("既にほかのアカウントで使用されています")
    }

    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            googleId: input.googleId
        }
    })

    return result
}

export const disconnectGoogleService = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (!user?.googleId) {
        throw new Error("Googleアカウントが接続されていません")
    }

    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            googleId: null
        }
    })

    return result
}

export const deleteAccountService = async (id: string) => {
    const myOwnerWorkspace = await prisma.workspaceMember.findMany({
        where: {
            role: WorkspaceRole.OWNER,
            userId: id
        }
    })

    // 入っているworkspaceで自分以外のOWNERがいるかチェックするためのループ
    for (const workspace of myOwnerWorkspace) {
        const otherOwnerCount = await prisma.workspaceMember.count({
            where: {
                workspaceId: workspace.workspaceId,
                role: WorkspaceRole.OWNER,
                userId: {
                    not: id
                }
            }
        })

        if (otherOwnerCount === 0) {
            const otherMemberCount = await prisma.workspaceMember.count({
                where: {
                    workspaceId: workspace.workspaceId,
                    userId: {
                        not: id
                    }
                }
            })

            if (otherMemberCount > 0) {
                throw new Error(`ワークスペースID ${workspace.workspaceId} に他のOWNERがいないため、アカウントを削除できません。`)
            }

            await prisma.workspace.delete({
                where: {
                    id: workspace.workspaceId
                }
            })
        }
    }

    const result = await prisma.user.delete({
        where: {
            id
        }
    })

    return result
}