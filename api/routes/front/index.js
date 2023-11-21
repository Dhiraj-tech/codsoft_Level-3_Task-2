import express from "express"
import profileRoutes from "./profile.routes.js"
import { auth } from "../../lib/function.js"
import taskRoutes from "./task.routes.js"

const router = express.Router()

router.use('/profile', auth, profileRoutes)

router.use('/tasks',taskRoutes)

export default router