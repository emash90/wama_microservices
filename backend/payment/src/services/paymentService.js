const { connectRabbitMQ, getChannel } = require('../../utils/rabbitmq');
const Payment = require('../models/paymentModel');


const buildPaymentPipeline = (filter = {}) => {
  const pipeline = [
    { $match: filter }, 
    // Lookup tenant details
    {
      $lookup: {
        from: 'tenants', 
        localField: 'tenant_id', 
        foreignField: '_id', 
        as: 'tenantDetails',
      },
    },
    {
      $unwind: { path: '$tenantDetails', preserveNullAndEmptyArrays: true }, 
    },
    // Lookup house details
    {
      $lookup: {
        from: 'houses', 
        localField: 'house_id',
        foreignField: '_id', 
        as: 'houseDetails',
      },
    },
    {
      $unwind: { path: '$houseDetails', preserveNullAndEmptyArrays: true }, 
    },
    // Project only necessary fields
    {
      $project: {
        _id: 1,
        amount_paid: 1,
        date_paid: 1,
        status: 1,
        month: 1,
        'tenantDetails.tenant_first_name': 1,
        'tenantDetails.tenant_last_name': 1,
        'houseDetails.house_number': 1,
      },
    },
  ];
  return pipeline;
};


const getAllPayment = async () => {
  const pipeline = buildPaymentPipeline(); // No filter for all payments
  return await Payment.aggregate(pipeline);
};

const getPaymentById = async (id) => {
  return await Payment.findById(id);
};
// const findPaymentBy = async(house_number) => {
//   return await Payment.findOne({house_number});
// }

const createPayment= async (houseData) => {
  console.log("house data", houseData)
  const newPayment = new Payment(houseData);
  await newPayment.save();
  let filter = {
    _id: newPayment._id
  }
  const pipeline = buildPaymentPipeline(filter)
  return Payment.aggregate(pipeline)
};

const updatePayment = async (id, updateData) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      throw new Error(`Payment with ID ${id} not found`);
    }

    if (updateData.status === 'confirmed' && updatedPayment.status !== 'confirmed') {
      updatedPayment.status = 'confirmed'; 
      await updatedPayment.save();
    }

    const tenantId = updatedPayment.tenant_id;

    // Step 4: Only send RabbitMQ message to tenant service if payment is confirmed
    if (updateData.status === 'confirmed' && updatedPayment.status == 'confirmed') {
      const paymentMessage = {
        tenantId,
        amountPaid: updatedPayment.amount_paid,
        newBalance: -updatedPayment.amount_paid,
        status: 'confirmed',
      };

      try {
        // Connect to RabbitMQ and send the message to the tenant service
        await connectRabbitMQ();
        const channel = getChannel();

        const message = JSON.stringify(paymentMessage);

        // Ensure the 'tenant_balance_updates' queue exists, then send the message
        await channel.assertQueue('payment_updates', { durable: true });
        channel.sendToQueue('payment_updates', Buffer.from(message));

        console.log('Payment update message sent to RabbitMQ to update tenant balance:', message);
      } catch (rabbitMqError) {
        console.error('Error sending payment update message to RabbitMQ:', rabbitMqError);
      }
    }

    // Step 5: Build a filter to fetch payment details with tenant and house information
    const filter = { _id: updatedPayment._id };
    const pipeline = buildPaymentPipeline(filter);

    // Step 6: Fetch the payment details including tenant and house information
    const paymentDetails = await Payment.aggregate(pipeline);

    if (paymentDetails.length === 0) {
      throw new Error('Payment details not found after updating the payment.');
    }

    // Step 7: Return the updated payment details
    return { paymentDetails: paymentDetails[0] };
  } catch (error) {
    console.error('Error updating payment:', error);
    throw error;
  }
};



module.exports = {
    getAllPayment,
    getPaymentById,
    createPayment,
    updatePayment
};
