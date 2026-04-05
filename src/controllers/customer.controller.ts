import { Request, Response } from 'express'
import {CreateCustomerSchema, UpdateCustomerSchema} from "../validations/customer.validation";
import {
    createCustomerService, deleteCustomerService,
    getCustomerService,
    getCustomersService,
    updateCustomerService
} from "../services/customer.service";

export const createCustomerController = async (req: Request, res: Response) => {
    try {
        const validated = CreateCustomerSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await createCustomerService(validated.data, req.user!.workspaceId)

        res.status(201).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getCustomersController = async (req: Request, res: Response) => {
    try {
        const result = await getCustomersService(req.user!.workspaceId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getCustomerController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getCustomerService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateCustomerController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateCustomerSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateCustomerService(validated.data, req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteCustomerController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteCustomerService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}