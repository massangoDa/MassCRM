import express from "express"
const router = express.Router()
import * as authController from "../controllers/auth.controller"

router.post("/register", authController.registerController)
router.post("/login", authController.loginController)

export default router