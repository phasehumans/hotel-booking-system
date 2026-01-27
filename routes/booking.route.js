import {Router} from "express"
import { cancelBooking, createBooking, getBookings } from "../controllers/booking.controller"

const bookingRouter = Router()

bookingRouter.post('/', createBooking)
bookingRouter.get('/', getBookings)
bookingRouter.put('/:bookingId/cancel', cancelBooking)

export default bookingRouter