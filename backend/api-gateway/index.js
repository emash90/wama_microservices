const express = require("express")
const gatewayRoutes = require('./routes/gatewayRoutes');
require('dotenv').config();


const app = express()


// Gateway Routes
gatewayRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.GATEWAY_PORT || 4000;

app.listen(PORT, () => {
    console.log(`api gateway listening on port ${PORT}`)
})