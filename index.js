import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth')


app.listen(3000, () => {
    console.log("server is running")
})