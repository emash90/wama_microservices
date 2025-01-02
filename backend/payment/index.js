const express = require('express')
require('dotenv').config()
const paymentRoutes = require('./src/routes/paymentRoutes')
const connectDB = require('./config/database')
const cors = require('cors')


const app = express()

//use cors
app.use(cors())

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const PORT = process.env.PAYMENT_PORT || 4003

//define routes for payment
app.use(paymentRoutes)

//connect to database

connectDB()

app.listen((PORT), () => {
    console.log(`payment service running on port ${PORT}`)
} )

