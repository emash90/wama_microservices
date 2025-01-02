const paymentService = require('../services/paymentService')

const findAllPayments = async (req, res, next) => {
    try {
        const payments = await paymentService.getAllPayment()
        res.status(200).json(payments)
    } catch (error) {
        next(error)
    }
}

const createPayment = async (req, res, next) => {
    try {
        console.log("payment", req.body)
        const newPayment = await paymentService.createPayment(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        next(error)
    }
}

const getPaymentById = async(req, res, next) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) {
          return res.status(404).json({ message: 'payment not found' });
        }
        res.status(200).json(payment);
      } catch (error) {
        next(error);
      }
}


module.exports = {
    findAllPayments,
    createPayment,
    getPaymentById
}