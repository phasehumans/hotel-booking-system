import {Router} from "express"
import { cancelBooking, createBooking, getBookings } from "../controllers/booking.controller"
import { authMiddleware, checkCustomer } from "../middleware/auth.middleware"

const bookingRouter = Router()

bookingRouter.use(authMiddleware)

bookingRouter.post('/', checkCustomer, createBooking)
bookingRouter.get('/', checkCustomer, getBookings)
bookingRouter.put('/:bookingId/cancel', checkCustomer, cancelBooking)

export default bookingRouter