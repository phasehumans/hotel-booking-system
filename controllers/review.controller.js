import { createReviewSchema } from '../utils/validation.js'
import { pool } from '../config/db.js'
import { randomUUID } from 'crypto'

export const submitReview = async (req, res) => {
  const parseData = createReviewSchema.safeParse(req.body)

  if (!parseData.success) {
    return res.status(400).json({
      success: false,
      message: 'invalid inputs',
      data: null,
      error: parseData.error.flatten(),
    })
  }

  const { hotelId, rating, comment } = parseData.data
  const customerId = req.id
  const id = randomUUID()

  try {
    const query = `
      INSERT INTO reviews (id, customer_id, hotel_id, rating, comment)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, customer_id, hotel_id, rating, comment, created_at
    `

    const values = [id, customerId, hotelId, rating, comment]

    const { rows } = await pool.query(query, values)

    return res.status(201).json({
      success: true,
      message: 'review submitted',
      data: rows[0],
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
