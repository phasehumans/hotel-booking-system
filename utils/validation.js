import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3).max(15),
  email: z.string().email(),
  password: z.string().min(3).max(20),
  role: z.enum(['customer', 'owner']),
  phone: z.string(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
})

export const createHotelSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  city: z.string(),
  country: z.string(),
  amenities: z.array(z.string()).min(1),
})

export const addRoomSchema = z.object({
  roomNumber: z.string().min(1),
  roomType: z.string().min(1),
  pricePerNight: z.number().int().positive(),
  maxOccupancy: z.number().int().positive()
})

export const createBookingSchema = z.object({
  roomId: z.string().uuid(),
  checkInDate: z.string().date(),
  checkOutDate: z.string().date(),
})

export const createReviewSchema = z.object({
  hotelId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10),
})