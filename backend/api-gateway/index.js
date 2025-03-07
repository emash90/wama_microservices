const express = require("express")
const gatewayRoutes = require('./routes/gatewayRoutes');
require('dotenv').config();
const cors = require('cors');



const app = express()
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'authorization'],
}));


// Gateway Routes
gatewayRoutes(app);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.GATEWAY_PORT || 4000;

app.listen(PORT, () => {
    console.log(`api gateway listening on port ${PORT}!!`)
})