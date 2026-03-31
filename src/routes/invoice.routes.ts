import express from "express"
const router = express.Router()
import * as invoiceController from "../controllers/invoice.controller"

router.post("/", invoiceController.createInvoiceController)
router.get("/", invoiceController.getInvoicesController)
router.get("/:id", invoiceController.getInvoiceController)
router.patch("/:id", invoiceController.updateInvoiceController)
router.delete('/:id', invoiceController.deleteInvoiceController)

export default router