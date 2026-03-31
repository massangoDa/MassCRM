import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { RegisterInput, LoginInput } from '../validations/auth.validation'
import 'dotenv/config'

export const registerService = async (input: RegisterInput) => {
    const existsEmail = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    })
    if (existsEmail) {
        throw new Error("ユーザーが既に存在します")
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const result = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            workspace: {
                create: {
                    role: 'OWNER',
                    workspace: {
                        create: {
                            name: `${input.name} のワークスペース`
                        }
                    }
                }
            }
        },
        include: {
            workspace: true
        }
    })

    const workspaceId = result.workspace[0]?.workspaceId
    if (!workspaceId) {
        throw new Error("ワークスペースの作成に失敗しました")
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'test'
    const token = jwt.sign(
        { id: result.id, workspaceId: workspaceId },
        secretKey,
        { expiresIn: '7d' }
    )

    return token
}

export const loginService = async (input: LoginInput) => {
    const user = await prisma.user.findUnique({
        where: {
            email: input.email
        },
        include: {
            workspace: true
        }
    })
    if (!user) {
        throw new Error("ユーザーが存在しません")
    }
    if (!user.password) {
        throw new Error("このアカウントはパスワードでログインできません")
    }

    const isMatch = await bcrypt.compare(input.password, user.password)
    if (!isMatch) {
        throw new Error("パスワードが正しくありません")
    }

    const workspaceId = user.workspace[0]?.workspaceId
    if (!workspaceId) {
        throw new Error("ワークスペースが存在しません")
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'test'
    const token = jwt.sign(
        { id: user.id, workspaceId: workspaceId },
        secretKey,
        { expiresIn: '7d' }
    )

    return token
}