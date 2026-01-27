import {z} from "zod"

export const signupSchema = z.object({
    name: z.string.min(3).max(15),
    email: z.string.email(),
    password: z.string.min(3).max(20),
    role: z.enum(["customer", "owner"]),
    phone: z.string().min(10).max(10)
})

