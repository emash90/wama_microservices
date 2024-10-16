const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const houseRoutes = require('./routes/houseRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI

// Connect to the database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

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
