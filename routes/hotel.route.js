import { Router } from 'express'
import { addRoom, createHotel, getHotelById, getHotels } from '../controllers/hotel.controller.js'
import { authMiddleware, checkOwner } from '../middleware/auth.middleware.js'

const hotelRouter = Router()

hotelRouter.use(authMiddleware)

hotelRouter.post('/', checkOwner, createHotel)
hotelRouter.post('/:hotelId/rooms', checkOwner, addRoom)
hotelRouter.get('/', getHotels)
hotelRouter.get('/:hotelId', getHotelById)

export default hotelRouter
