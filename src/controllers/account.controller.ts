import {Request, Response} from "express";
import {
    connectGoogleService, deleteAccountService, disconnectGoogleService,
    getAccountService,
    updateAccountService,
    updatePasswordService
} from "../services/account.service";
import {ConnectGoogleSchema, UpdateAccountSchema, UpdatePasswordSchema} from "../validations/account.validation";

export const getAccountController = async (req: Request, res: Response) => {
    try {
        const result = await getAccountService(req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updatePasswordController = async (req: Request, res: Response) => {
    try {
        const validated = UpdatePasswordSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updatePasswordService(validated.data, req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateAccountController = async (req: Request, res: Response) => {
    try {
        const validated = UpdateAccountSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateAccountService(validated.data, req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const connectGoogleController = async (req: Request, res: Response) => {
    try {
        const validated = ConnectGoogleSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await connectGoogleService(validated.data, req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const disconnectGoogleController = async (req: Request, res: Response) => {
    try {
        const result = await disconnectGoogleService(req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteAccountController = async (req: Request, res: Response) => {
    try {
        const result = await deleteAccountService(req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}