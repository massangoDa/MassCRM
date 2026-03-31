import express from "express"
const router = express.Router()
import * as noteController from "../controllers/note.controller"

router.post("/", noteController.createNoteController)
router.get("/", noteController.getNotesController)
router.get("/:id", noteController.getNoteController)
router.patch("/:id", noteController.updateNoteController)
router.delete('/:id', noteController.deleteNoteController)

export default router