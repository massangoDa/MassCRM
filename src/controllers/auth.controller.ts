import { RegisterSchema, LoginSchema } from '../validations/auth.validation'
import {loginService, registerService} from "../services/auth.service"
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