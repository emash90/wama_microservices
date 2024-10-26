const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')


router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/login', userController.login)
router.post('/register', userController.createUser)


module.exports = router