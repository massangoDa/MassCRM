import express from "express"
const router = express.Router()
import * as caseController from "../controllers/case.controller"

router.post("/", caseController.createCaseController)
router.get("/", caseController.getCasesController)
router.get("/:id", caseController.getCaseController)
router.patch("/:id", caseController.updateCaseController)
router.delete('/:id', caseController.deleteCaseController)

export default router