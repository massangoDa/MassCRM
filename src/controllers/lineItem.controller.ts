import {Request, Response} from "express";
import {CreateLineItemSchema, UpdateLineItemSchema} from "../validations/invoice.validation";
import {
    createLineItemService,
    deleteLineItemService,
    getLineItemService,
    getLineItemsService, updateLineItemService
} from "../services/lineItem.service";

export const createLineItemController = async (req: Request, res: Response) => {
    try {
        const validated = CreateLineItemSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await createLineItemService(validated.data)

        res.status(201).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getLineItemsController = async (req: Request, res: Response) => {
    try {
        const invoiceId = typeof req.query.invoiceId === 'string' ? req.query.invoiceId : undefined
        if (!invoiceId) {
            return res.status(400).json({ message: "invoiceIdは必須です" })
        }
        const result = await getLineItemsService(invoiceId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getLineItemController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getLineItemService(id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateLineItemController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateLineItemSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateLineItemService(validated.data, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteLineItemController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteLineItemService(id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}