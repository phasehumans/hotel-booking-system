import {Router} from "express"
import { submitReview } from "../controllers/review.controller.js"
import { authMiddleware, checkCustomer } from "../middleware/auth.middleware.js"

const reviewRouter = Router()

reviewRouter.use(authMiddleware)

reviewRouter.post('/', checkCustomer, submitReview)

export default reviewRouter