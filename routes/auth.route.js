import {Router} from "express"
import { getProfile, login, signup } from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/profile', getProfile)

export default authRouter