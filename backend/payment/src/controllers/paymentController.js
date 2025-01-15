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

const updatePayment = async (req, res) => {
      try {
        const paymentId = req.body._id; // Extract tenant ID from request parameters
        const updateData = req.body; 
        const payment = await paymentService.updatePayment(paymentId, updateData);
        res.status(200).json({
            message: 'Payment updated successfully',
            data: payment,
          });
      } catch (error) {
        next(error);
      }
}


module.exports = {
    findAllPayments,
    createPayment,
    getPaymentById,
    updatePayment
}