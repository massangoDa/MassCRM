import {Request, Response} from "express";
import {CreateContactSchema, UpdateContactSchema} from "../validations/contact.validation";
import {
    createContactService,
    deleteContactService,
    getContactService,
    getContactsService, updateContactService
} from "../services/contact.service";

export const createContactController = async (req: Request, res: Response) => {
    try {
        const validated = CreateContactSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await createContactService(validated.data, req.user!.workspaceId)

        res.status(201).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getContactsController = async (req: Request, res: Response) => {
    try {
        const customerId = req.query.customerId ? Number(req.query.customerId) : undefined
        if (customerId !== undefined && isNaN(customerId)) {
            return res.status(400).json({ message: "無効なIDです" })
        }
        const result = await getContactsService(req.user!.workspaceId, customerId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getContactController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getContactService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateContactController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateContactSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateContactService(validated.data, req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteContactController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteContactService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}