import {Request, Response} from "express";
import {
    AddMemberSchema,
    CreateWorkspaceSchema,
    UpdateMemberRoleSchema,
    UpdateWorkspaceSchema
} from "../validations/workspace.validation";
import {
    addMemberService,
    createWorkspaceService, deleteMemberService, deleteWorkspaceService, getMembersService,
    getWorkspaceService,
    getWorkspacesService, updateMemberRoleService,
    updateWorkspaceService
} from "../services/workspace.service";

export const createWorkspaceController = async (req: Request, res: Response) => {
    try {
        const validated = CreateWorkspaceSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await createWorkspaceService(validated.data, req.user!.id)

        res.status(201).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getWorkspacesController = async (req: Request, res: Response) => {
    try {
        const result = await getWorkspacesService(req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const getWorkspaceController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getWorkspaceService(id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateWorkspaceController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateWorkspaceSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateWorkspaceService(validated.data, id, req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteWorkspaceController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteWorkspaceService(id, req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

// メンバー
export const getMembersController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await getMembersService(id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const addMemberController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = AddMemberSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await addMemberService(validated.data, id, req.user!.id)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const updateMemberRoleController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const targetUserId = req.params.targetUserId as string
        if (!targetUserId) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const validated = UpdateMemberRoleSchema.safeParse(req.body)
        if (!validated.success) {
            return res.status(400).send({ message: "入力が正しくありません" })
        }

        const result = await updateMemberRoleService(validated.data, id, req.user!.id, targetUserId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}

export const deleteMemberController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        if (!id) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const targetUserId = req.params.targetUserId as string
        if (!targetUserId) {
            return res.status(400).json({ message: "無効なIDです" })
        }

        const result = await deleteMemberService(id, req.user!.id, targetUserId)

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message })
        }
        return res.status(500).json({ message: "サーバーエラー" })
    }
}