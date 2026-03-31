import express from "express"
const router = express.Router()
import * as accountController from "../controllers/account.controller"

router.get("/", accountController.getAccountController)
router.patch("/", accountController.updateAccountController)
router.delete("/", accountController.deleteAccountController)
router.patch("/password", accountController.updatePasswordController)
router.post("/google", accountController.connectGoogleController)
router.delete("/google", accountController.disconnectGoogleController)

export default router