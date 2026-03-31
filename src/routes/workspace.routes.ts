import express from "express"
const router = express.Router()
import * as workspaceController from "../controllers/workspace.controller"

router.post("/", workspaceController.createWorkspaceController)
router.get("/", workspaceController.getWorkspacesController)
router.get("/:id", workspaceController.getWorkspaceController)
router.patch("/:id", workspaceController.updateWorkspaceController)
router.delete('/:id', workspaceController.deleteWorkspaceController)

router.get("/:id/members/", workspaceController.getMembersController)
router.post("/:id/members/", workspaceController.addMemberController)
router.patch("/:id/members/:targetUserId", workspaceController.updateMemberRoleController)
router.delete("/:id/members/:targetUserId", workspaceController.deleteMemberController)

export default router