const Payment = require('../models/paymentModel');


// Function to construct the pipeline
const buildPaymentPipeline = (filter = {}) => {
  const pipeline = [
    { $match: filter }, // Optional filter stage
    // Lookup tenant details
    {
      $lookup: {
        from: 'tenants', // Name of the tenants collection
        localField: 'tenant_id', // Field in Payment that references a Tenant
        foreignField: '_id', // Field in Tenants that matches the localField
        as: 'tenantDetails',
      },
    },
    {
      $unwind: { path: '$tenantDetails', preserveNullAndEmptyArrays: true }, // Flatten tenantDetails array
    },
    // Lookup house details
    {
      $lookup: {
        from: 'houses', // Name of the houses collection
        localField: 'house_id', // Field in Payment that references a House
        foreignField: '_id', // Field in Houses that matches the localField
        as: 'houseDetails',
      },
    },
    {
      $unwind: { path: '$houseDetails', preserveNullAndEmptyArrays: true }, // Flatten houseDetails array
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
    // Find and update the payment record
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { $set: updateData }, // Apply the updates
      { new: true, runValidators: true } // Return the updated document and validate updates
    );

    if (!updatedPayment) {
      throw new Error(`Payment with ID ${id} not found`);
    }

    // Build a filter to fetch the updated record with details
    const filter = { _id: updatedPayment._id };
    const pipeline = buildPaymentPipeline(filter);

    // Fetch the updated record with tenant and house details
    const result = await Payment.aggregate(pipeline);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`Error updating payment: ${error.message}`);
    throw error;
  }
};


module.exports = {
    getAllPayment,
    getPaymentById,
    createPayment,
    updatePayment
};
