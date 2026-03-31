import express from "express"
const router = express.Router()
import * as lineItemController from "../controllers/lineItem.controller"

router.post("/", lineItemController.createLineItemController)
router.get("/", lineItemController.getLineItemsController)
router.get("/:id", lineItemController.getLineItemController)
router.patch("/:id", lineItemController.updateLineItemController)
router.delete('/:id', lineItemController.deleteLineItemController)

export default router