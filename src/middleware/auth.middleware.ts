import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: '認証が必要' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: number, workspaceId: number }

        const member = await prisma.workspaceMember.findFirst({
            where: {
                userId: decoded.id,
                workspaceId: decoded.workspaceId
            }
        })

        if (!member) {
            return res.status(403).json({ message: 'アクセス権限がありません' })
        }

        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'トークンが無効' })
    }
}