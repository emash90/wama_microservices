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


const getAllTenants = async () => {
  const pipeline = getTenantsPipeline();
  return await Tenant.aggregate(pipeline);
};

const getTenantById = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const pipeline = getTenantsPipeline({ _id: objectId });

  const tenants = await Tenant.aggregate(pipeline);

  return tenants
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
};
