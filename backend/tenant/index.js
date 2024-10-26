const express = require('express')
require('dotenv').config()
const connectDB = require('./config/database')
const tenantRoutes = require('./src/routes/tenantRoutes');


const app = express()


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//connect to mongoDB

connectDB()

const PORT = process.env.TENANTPORT || 4001

app.listen((PORT), () => {
    console.log(`tenant service running on port ${PORT}`)
})

app.use(tenantRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });