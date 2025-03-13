const Tenant = require('../models/tenantModel');
const mongoose = require('mongoose');
const { getChannel, connectRabbitMQ } = require('../../utils/rabbitmq');

const getTenantsPipeline = (filter = {}) => [
  {
    $match: filter,
  },
  {
    $lookup: {
      from: 'houses',
      localField: 'tenant_house_id',
      foreignField: '_id',
      as: 'tenant_house',
    },
  },
  {
    $unwind: {
      path: '$tenant_house',
      preserveNullAndEmptyArrays: true, // Handle cases where the house may not exist
    },
  },
  {
    $sort: {
      createdAt: -1,
    },
  },
  {
    $project: {
      tenant_first_name: 1,
      tenant_last_name: 1,
      tenant_phone: 1,
      tenant_email: 1,
      createdAt: 1,
      tenant_rent: 1,
      active: 1,
      balance: 1,
      tenant_house: '$tenant_house.house_number',
      house_type: '$tenant_house.house_type',
      house_id: '$tenant_house._id'
    },
  },
];

// Function to listen for payment updates from RabbitMQ
const listenForPaymentUpdates = async () => {
  try {
    // Connect to RabbitMQ
    await connectRabbitMQ();
    const channel = getChannel();

    // Assert the queue where payment updates are sent
    await channel.assertQueue('payment_updates', { durable: true });

    console.log('Listening for payment updates...');

    // Listen for messages on the 'payment_updates' queue
    channel.consume('payment_updates', async (msg) => {
      if (msg !== null) {
        // Parse the message content
        const paymentData = JSON.parse(msg.content.toString());
        const { tenantId, amountPaid } = paymentData;

        try {
          // Find the tenant by ID
          const tenant = await Tenant.findById(tenantId);

          if (tenant) {
            // Deduct the payment amount from the tenant's balance
            tenant.balance -= amountPaid;

            // Save the updated tenant data
            await tenant.save();
            console.log(`Tenant balance updated for tenant ID ${tenantId}. New balance => ${tenant.balance}`);

            // Acknowledge the message as processed
            channel.ack(msg);
          } else {
            console.log(`Tenant with ID ${tenantId} not found.`);
            // Acknowledge the message even if tenant is not found
            channel.ack(msg);
          }
        } catch (error) {
          console.error('Error processing payment update:', error);
          // Reject the message and requeue it in case of error
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error('Error setting up RabbitMQ listener:', error);
  }
};


const getAllTenants = async () => {
  filter = {
    active: true
  }
  const pipeline = getTenantsPipeline(filter);
  return await Tenant.aggregate(pipeline);
};

const getTenantById = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const pipeline = getTenantsPipeline({ _id: objectId });

  const tenants = await Tenant.aggregate(pipeline);

  return tenants.length > 0 ? tenants[0] : null; 
};

const findTenantByPhoneNumber = async (tenant_phone) => {
  return await Tenant.findOne({ tenant_phone });
};

const createTenant = async (tenantData) => {
  tenantData.balance = tenantData.tenant_rent * 2
  let newTenant = new Tenant(tenantData);
  const response = await newTenant.save();

  try {
    // Publish event to RabbitMQ
    await connectRabbitMQ();
    const channel = getChannel();
    const message = JSON.stringify({
      houseId: tenantData.tenant_house_id,
      tenantId: newTenant._id,
      status: 'occupied',
    });

    await channel.assertQueue('house_updates', { durable: true });
    channel.sendToQueue('house_updates', Buffer.from(message));

    console.log('Tenant created and event published:', message);
  } catch (error) {
    console.error('Error publishing RabbitMQ message:', error);
  }

  // Add house details to response
  const pipeline = getTenantsPipeline();
  const [tenant] = await Tenant.aggregate([...pipeline, { $match: { _id: response._id } }]);
  return tenant;
};

const updateTenant = async (id, updateData) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (updatedTenant && updatedTenant.active === false) {
      // Publish event to RabbitMQ
      await connectRabbitMQ();
      const channel = getChannel();

      const message = JSON.stringify({
        houseId: updatedTenant.tenant_house_id,
        status: 'vacant',
      });

      await channel.assertQueue('house_updates', { durable: true });
      channel.sendToQueue('house_updates', Buffer.from(message));

      console.log('House update event sent to RabbitMQ:', message);
    }

    return updatedTenant;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};

module.exports = {
  getAllTenants,
  getTenantById,
  findTenantByPhoneNumber,
  createTenant,
  updateTenant,
  listenForPaymentUpdates
};
