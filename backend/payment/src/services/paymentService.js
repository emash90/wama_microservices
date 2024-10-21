const Payment = require('../models/paymentModel');

const getAllPayment = async () => {
  return await Payment.find();
};

const getPaymentById = async (id) => {
  return await Payment.findById(id);
};
// const findPaymentBy = async(house_number) => {
//   return await Payment.findOne({house_number});
// }

const createPayment= async (houseData) => {
  const newPayment = new Payment(houseData);
  return await newPayment.save();
};

module.exports = {
    getAllPayment,
    getPaymentById,
    createPayment,
};
