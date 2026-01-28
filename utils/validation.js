import {z} from "zod"

export const signupSchema = z.object({
    name: z.string().min(3).max(15),
    email: z.string().email(),
    password: z.string().min(3).max(20),
    role: z.enum(["customer", "owner"]),
    phone: z.string()
})

export const loginSchema = z.object({

})

export const createHotelSchema = z.object({

})

export const addRoomSchema = z.object({

})

export const createBookingSchema = z.object({

})

export const createReviewSchema = z.object({
    
})