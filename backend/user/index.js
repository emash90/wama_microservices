const express = require("express")
const app = express()

const {PORT} = require('./config/index')


app.listen(PORT, () => 
console.log(`app listing on port ${PORT}`))