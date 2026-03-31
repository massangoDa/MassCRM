import { Router } from 'express'
import { authenticateToken } from "../middleware/auth.middleware";
import authRoutes from './auth.routes'
import customerRoutes from './customer.routes'
import contactRoutes from './contact.routes'
import casesRoutes from './case.routes'
import invoiceRoutes from './invoice.routes'
import lineItemRoutes from './lineItem.routes'
import noteRoutes from "./note.routes"
import workspaceRoutes from "./workspace.routes"
import accountRoutes from "./account.routes"

const router = Router()

router.use('/auth', authRoutes)

router.use('/customers', authenticateToken, customerRoutes)
router.use('/contacts', authenticateToken, contactRoutes)
router.use('/cases', authenticateToken, casesRoutes)
router.use('/invoices', authenticateToken, invoiceRoutes)
router.use('/line-items', authenticateToken, lineItemRoutes)
router.use('/notes', authenticateToken, noteRoutes)
router.use('/workspaces', authenticateToken, workspaceRoutes)
router.use('/accounts', authenticateToken, accountRoutes)

export default router