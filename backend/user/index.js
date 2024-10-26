const express = require("express")
const app = express()

const userRoutes = require('./src/routes/userRoutes')

const {PORT, connectDB} = require('./config/index')


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


//user routes
app.use(userRoutes);

//connect database

connectDB();

app.listen(PORT, () => {
console.log(`user service listing on port ${PORT}`)
})