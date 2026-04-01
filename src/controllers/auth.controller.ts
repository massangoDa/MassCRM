import { RegisterSchema, LoginSchema } from '../validations/auth.validation'
import {loginService, registerService, verifyTokenService} from "../services/auth.service"
import { Request, Response } from "express"

export const registerController = async (req: Request, res: Response) => {
    try {
        const validated  = RegisterSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).json({ message: '入力が正しくありません' })
        }

        const token = await registerService(validated.data)

        return res.status(201).json(token)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const validated = LoginSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).json({ message: "入力が正しくありません" })
        }

        const token = await loginService(validated.data)

        return res.status(200).json(token)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const verifyTokenController = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: "認証が必要" })
        }

        const result = await verifyTokenService(token)

        return res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error && err.name === 'JsonWebTokenError' || err instanceof Error && err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "認証に失敗しました（期限切れまたは無効）" });
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}