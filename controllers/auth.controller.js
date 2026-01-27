import { success } from "zod"
import { prisma } from "../config/db.js"
import { signupSchema } from "../utils/validation.js"
import bcrypt from "bcrypt"


export const signup = async(req, res) => {
    const parseData = signupSchema(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success: false,
            message: "invalid inputs",
            data: null,
            error: parseData.error
        })
    }

    const {name, email, password, role, phone} = parseData.data

    try {
        const isUserRegistered = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    
        if(isUserRegistered){
            return res.status(409).json({
                success: false,
                message: "user already exist",
                data: null,
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
                role: role,
                phone: phone
            }
        })
    
    
        return res.status(201).json({
            success: true,
            message: "user signup successful",
            data : user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: null,
            error: error.message
        })
    }
}