import {Request, Response} from "express";
import {CreateInvoiceSchema, UpdateInvoiceSchema} from "../validations/invoice.validation";
import {
    createInvoiceService, deleteInvoiceService,
    getInvoiceService,
    getInvoicesService,
    updateInvoiceService
} from "../services/invoice.service";

export const createInvoiceController = async (req: Request, res: Response) => {
    try {
        const validated = CreateInvoiceSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await createInvoiceService(validated.data, req.user!.workspaceId)

        res.status(201).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getInvoicesController = async (req: Request, res: Response) => {
    try {
        const caseId = req.query.caseId ? Number(req.query.caseId) : undefined
        if (caseId !== undefined && isNaN(caseId)) {
            return res.status(400).json({ message: "無効なIDです" })
        }
        const result = await getInvoicesService(req.user!.workspaceId, caseId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getInvoiceController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getInvoiceService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateInvoiceController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateInvoiceSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateInvoiceService(validated.data, req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteInvoiceController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteInvoiceService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}