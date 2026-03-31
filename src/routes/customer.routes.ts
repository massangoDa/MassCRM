import express from "express"
const router = express.Router()
import * as customerController from "../controllers/customer.controller"

router.post("/", customerController.createCustomerController)
router.get("/", customerController.getCustomersController)
router.get("/:id", customerController.getCustomerController)
router.patch("/:id", customerController.updateCustomerController)
router.delete('/:id', customerController.deleteCustomerController)

export default router