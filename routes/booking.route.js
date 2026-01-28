import { Router } from 'express'
import { cancelBooking, createBooking, getBookings } from '../controllers/booking.controller.js'
import { authMiddleware, checkCustomer } from '../middleware/auth.middleware.js'

const bookingRouter = Router()

bookingRouter.use(authMiddleware)

bookingRouter.post('/', checkCustomer, createBooking)
bookingRouter.get('/', checkCustomer, getBookings)
bookingRouter.put('/:bookingId/cancel', checkCustomer, cancelBooking)

export default bookingRouter
