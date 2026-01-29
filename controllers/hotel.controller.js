import { success } from 'zod'
import { addRoomSchema, createHotelSchema } from '../utils/validation.js'
import { pool } from '../config/db.js'
import { randomUUID } from 'crypto'

export const createHotel = async (req, res) => {
  const parseData = createHotelSchema.safeParse(req.body)

  if (!parseData.success) {
    return res.status(400).json({
      success: false,
      message: 'invalid inputs',
      data: null,
      errror: parseData.error.flatten(),
    })
  }

  const { name, description, city, country, amenities } = parseData.data
  const ownerId = req.id
  const id = randomUUID()

  try {
    const query = `
          INSERT INTO hotels (id, owner_id, name, description, city, country, amenities)\
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, owner_id, name, description, city, country, amenities, rating, total_reviews
      `

    const values = [id, ownerId, name, description, city, country, JSON.stringify(amenities || [])]

    const { rows } = await pool.query(query, values)

    return res.status(201).json({
      success: true,
      message: 'new hotel created',
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

export const addRoom = async (req, res) => {
  const parseData = addRoomSchema.safeParse(req.body)

  if(!parseData.success){
    return res.status(400).json({
      success: false,
      message: "invalid inputs",
      data: null,
      error: parseData.error.flatten()
    })
  }

  const { roomNumber, roomType, pricePerNight, maxOccupancy } = parseData.data
  const hotelId = req.params.hotelId
  const id = randomUUID()

  try {
    const query = `
      INSERT INTO rooms (id, hotel_id, room_number, room_type, price_per_night, max_occupancy)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, hotel_id, room_number, room_type, price_per_night, max_occupancy
    `
  
    const values = [id, hotelId, roomNumber, roomType, pricePerNight, maxOccupancy, ]
  
    const {rows} = await pool.query(query, values)
  
    return res.status(201).json({
      success: true,
      message: "new room created",
      data: rows[0],
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

export const getHotels = async (req, res) => {
  try {
    const query = `
      SELECT id, owner_id, name, description, city, country, amenities, rating, total_reviews
      FROM hotels
    `

    const { rows } = await pool.query(query)

    return res.status(200).json({
      success: true,
      message: 'hotels retrieved',
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

export const getHotelById = async (req, res) => {
  const { hotelId } = req.params

  try {
    const query = `
      SELECT id, owner_id, name, description, city, country, amenities, rating, total_reviews
      FROM hotels
      WHERE id = $1
    `

    const values = [hotelId]

    const { rows } = await pool.query(query, values)

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'hotel not found',
        data: null,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'hotel retrieved',
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
