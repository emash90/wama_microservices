const express = require('express')
const router = express.Router()

const paymentController = require('../controllers/paymentController')


router.get('/', paymentController.findAllPayments)
router.post('/', paymentController.createPayment)
router.get('/:id', paymentController.getPaymentById)


module.exports = router