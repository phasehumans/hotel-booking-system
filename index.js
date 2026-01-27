import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import hotelRouter from "./routes/hotel.route.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/auth', authRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/bookings', )

const PORT= process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    console.log(`environment: ${process.env.NODE_ENV}`);
})