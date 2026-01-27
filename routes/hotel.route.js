import {Router} from "express"
import { addRoom, createHotel, getHotelById, getHotels } from "../controllers/hotel.controller"

const hotelRouter = Router()

hotelRouter.post('/', createHotel)
hotelRouter.post('/:hotelId/rooms', addRoom)
hotelRouter.get('/', getHotels)
hotelRouter.get('/:hotelId', getHotelById)

export default hotelRouter