import { success } from "zod"
import { pool } from "../config/db.js"
import { signupSchema } from "../utils/validation.js"
import bcrypt from "bcrypt"


export const signup = async(req, res) => {
    const parseData = signupSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success: false,
            message: "invalid inputs",
            data: null,
            error: parseData.error.flatten()
        })
    }

    const {name, email, password, role, phone} = parseData.data

    try {
        const hashPassword = await bcrypt.hash(password, 10)

        const query = `
            INSERT INTO users (name, email, password, role, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, email, role, phone, created_at
        `

        const values = [
            name,
            email.toLowerCase(),
            hashPassword,
            role,
            phone || null
        ]

        const {rows} = await pool.query(query, values)
    
        return res.status(201).json({
            success: true,
            message: "user signup successful",
            data : rows[0],
        })
    } catch (error) {

        if(error.code === '23505'){
            return res.status(409).json({
                success: false,
                message: "user already exists",
                data: null
            })
        }
        return res.status(500).json({
            success: false,
            message: "internal server error",
            data: null,
            error: error.message
        })
    }
}

export const login = async(req, res) => {

}
