import { pool } from '../config/db.js'
import { loginSchema, signupSchema } from '../utils/validation.js'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  const parseData = signupSchema.safeParse(req.body)

  if (!parseData.success) {
    return res.status(400).json({
      success: false,
      message: 'invalid inputs',
      data: null,
      error: parseData.error.flatten(),
    })
  }

  const { name, email, password, role, phone } = parseData.data

  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const id = randomUUID()

    const query = `
            INSERT INTO users (id, name, email, password, role, phone)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, email, role, phone, created_at
        `

    const values = [id, name, email.toLowerCase(), hashPassword, role, phone || null]

    const { rows } = await pool.query(query, values)

    return res.status(201).json({
      success: true,
      message: 'user signup successful',
      data: rows[0],
    })
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'user already exists',
        data: null,
      })
    }
    return res.status(500).json({
      success: false,
      message: 'internal server error',
      data: null,
      error: error.message,
    })
  }
}

export const login = async (req, res) => {
  const parseData = loginSchema.safeParse(req.body)

  if (!parseData.success) {
    return res.status(400).json({
      success: false,
      message: 'invalid inputs',
      data: null,
      error: parseData.error.flatten(),
    })
  }

  const { email, password } = parseData.data

  try {
    const query = `
            SELECT id, name, email, password, role
            FROM users
            WHERE email= $1
        `

    const values = [email.toLowerCase()]

    const { rows } = await pool.query(query, values)

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'invalid email or password',
        data: null,
      })
    }

    const user = rows[0]

    const isPassworsMatch = await bcrypt.compare(password, user.password)

    if (!isPassworsMatch) {
      return res.status(401).json({
        success: false,
        message: 'invalid email or password',
        data: null,
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET
    )

    return res.status(200).json({
      success: true,
      message: 'login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'internal server error',
      data: null,
      error: error.message,
    })
  }
}
