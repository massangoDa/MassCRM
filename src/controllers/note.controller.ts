import {Request, Response} from "express";
import {CreateNoteSchema, UpdateNoteSchema} from "../validations/note.validation";
import {
    createNoteService,
    deleteNoteService,
    getNoteService,
    getNotesService,
    updateNoteService
} from "../services/note.service";

export const createNoteController = async (req: Request, res: Response) => {
    try {
        const validated = CreateNoteSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await createNoteService(validated.data, req.user!.workspaceId)

        res.status(201).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getNotesController = async (req: Request, res: Response) => {
    try {
        const customerId = req.query.customerId ? Number(req.query.customerId) : undefined
        if (customerId !== undefined && isNaN(customerId)) {
            return res.status(400).json({ message: "無効なIDです" })
        }
        const result = await getNotesService(req.user!.workspaceId, customerId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getNoteController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getNoteService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateNoteController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateNoteSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateNoteService(validated.data, req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteNoteController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteNoteService(req.user!.workspaceId, id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}