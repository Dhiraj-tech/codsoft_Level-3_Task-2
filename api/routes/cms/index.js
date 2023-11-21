import express from "express";
import customerRoutes from "./customer.routes.js"
import taskRoutes from "./task.routes.js"

const router = express.Router()

router.use('/customers', customerRoutes)
router.use('/tasks', taskRoutes)

export default router
