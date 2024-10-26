const express = require('express')
require('dotenv').config()
const paymentRoutes = require('./src/routes/paymentRoutes')
const connectDB = require('./config/database')

const app = express()


const PORT = process.env.PAYMENT_PORT || 4003

//define routes for payment
app.use(paymentRoutes)

//connect to database

connectDB()

app.listen((PORT), () => {
    console.log(`payment service running on port ${PORT}`)
} )

