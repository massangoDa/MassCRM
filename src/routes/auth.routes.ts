import express from "express"
const router = express.Router()
import * as authController from "../controllers/auth.controller"

router.post("/register", authController.registerController)
router.post("/login", authController.loginController)
router.get("/verifyToken", authController.verifyTokenController)

export default router