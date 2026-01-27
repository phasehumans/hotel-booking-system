import {Router} from "express"
import { submitReview } from "../controllers/review.controller.js"

const reviewRouter = Router()

reviewRouter.post('/', submitReview)

export default reviewRouter