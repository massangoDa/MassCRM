import express from "express"
const router = express.Router()
import * as contactController from "../controllers/contact.controller"

router.post("/", contactController.createContactController)
router.get("/", contactController.getContactsController)
router.get("/:id", contactController.getContactController)
router.patch("/:id", contactController.updateContactController)
router.delete("/:id", contactController.deleteContactController)

export default router