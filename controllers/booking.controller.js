import { createBookingSchema } from '../utils/validation.js'
import { pool } from '../config/db.js'
import { randomUUID } from 'crypto'

export const createBooking = async (req, res) => {
  const parseData = createBookingSchema.safeParse(req.body)

  if (!parseData.success) {
    return res.status(400).json({
      success: false,
      message: 'invalid inputs',
      data: null,
      error: parseData.error.flatten(),
    })
  }

  const { roomId, checkInDate, checkOutDate } = parseData.data
  const customerId = req.id
  const id = randomUUID()

  try {
    const query = `
      INSERT INTO bookings (id, customer_id, room_id, check_in_date, check_out_date, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, customer_id, room_id, check_in_date, check_out_date, status, created_at
    `

    const values = [id, customerId, roomId, checkInDate, checkOutDate, 'active']

    const { rows } = await pool.query(query, values)

    return res.status(201).json({
      success: true,
      message: 'booking created',
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

export const getBookings = async (req, res) => {
  const customerId = req.id

  try {
    const query = `
      SELECT id, customer_id, room_id, check_in_date, check_out_date, status, created_at
      FROM bookings
      WHERE customer_id = $1
      ORDER BY created_at DESC
    `

    const values = [customerId]

    const { rows } = await pool.query(query, values)

    return res.status(200).json({
      success: true,
      message: 'bookings retrieved',
      data: rows,
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

export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params
  const customerId = req.id

  try {
    const query = `
      UPDATE bookings
      SET status = $1
      WHERE id = $2 AND customer_id = $3
      RETURNING id, customer_id, room_id, check_in_date, check_out_date, status, created_at
    `

    const values = ['cancelled', bookingId, customerId]

    const { rows } = await pool.query(query, values)

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'booking not found',
        data: null,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'booking cancelled',
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
