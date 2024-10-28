const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const connectDB = require('./config/database'); 

const houseRoutes = require('./src/routes/houseRoutes');

const app = express();

//use cors
app.use(cors())

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 



// Connect to the database
connectDB();  // Connect to the database using the config file


// House Routes
app.use('/', houseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.HOUSE_SERVICE_PORT || 4002;

app.listen(PORT, () => {
  console.log(`House service listening on port ${PORT}`);
});
