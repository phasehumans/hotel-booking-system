import { success } from "zod";
import { createHotelSchema } from "../utils/validation.js";
import { pool } from "../config/db.js";
import { randomUUID } from "crypto";

export const createHotel = async (req, res) => {
  const parseData = createHotelSchema.safeParse(req.body);

  if (!parseData.success) {
    return res.status(400).json({
      success: false,
      message: "invalid inputs",
      data: null,
      errror: parseData.error.flatten(),
    });
  }

  const { name, description, city, country, amenities } = parseData.data;
  const ownerId = req.id;
  const id = randomUUID();

  try {
    const query = `
          INSERT INTO hotels (id, owner_id, name, description, city, country, amenities)\
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, owner_id, name, description, city, country, amenities, rating, total_reviews
      `;

    const values = [
      id,
      ownerId,
      name,
      description,
      city,
      country,
      JSON.stringify(amenities || []),
    ];

    const { rows } = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "new hotel created",
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
      error: error.message,
    });
  }
};

export const addRoom = async (req, res) => {};

export const getHotels = async (req, res) => {};

export const getHotelById = async (req, res) => {};
