import {Router} from "express"
import { getProfile, login, signup } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)

export default authRouter