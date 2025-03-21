const mongoose = require('mongoose');
const House = require('../models/houseModel');
const { connectRabbitMQ, getChannel } = require('../../utils/rabbitmq');


const generateHousePipeline = () => {
  return [
    { $match: { house_number: { $ne: "" } } },

    {
      $lookup: {
        from: "tenants",
        localField: "tenantId",
        foreignField: "_id",
        as: "tenantDetails",
      },
    },

    {
      $unwind: {
        path: "$tenantDetails",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        _id: 1,
        house_number: 1,
        house_location: 1,
        house_type: 1,
        house_price: 1,
        occupied: 1,
        tenantId: 1,
        createdAt: 1,
        tenant_first_name: "$tenantDetails.tenant_first_name",
        tenant_last_name: "$tenantDetails.tenant_last_name",
        tenant_email: "$tenantDetails.tenant_email",
        tenant_phone: "$tenantDetails.tenant_phone",
      },
    },

    // Sort by createdAt in descending order
    { $sort: { createdAt: -1 } },
  ];
};

// const getAllHouses = async () => {
//   return await House.find({ house_number: { $ne: "" } }).sort({ createdAt: -1 }); 
// };

const getAllHouses = async () => {
  const pipeline = generateHousePipeline();
  return await House.aggregate(pipeline);
};

const getHouseById = async (id) => {
  return await House.findById(id);
};

const findHouseByNumber = async (house_number) => {
  return await House.findOne({ house_number });
};

const createHouse = async (houseData) => {
  const newHouse = new House(houseData);
  return await newHouse.save();
};

const updateHouse = async (id, houseData) => {
  return await House.findByIdAndUpdate(id, houseData, { new: true });
};

const updateHouseOccupiedStatus = async (houseId, occupiedStatus, tenantId) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(
      houseId,
      { occupied: occupiedStatus,
        tenantId: tenantId
      },
      { new: true }
    );
    return updatedHouse;
  } catch (error) {
    console.error('Error updating house occupied status:', error);
    throw error;
  }
};

const listenForTenantCreated = async () => {
  try {
    await connectRabbitMQ();
    const channel = getChannel();
    const queue = 'house_updates';

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg.content) {
        const tenantData = JSON.parse(msg.content.toString());

        const houseId = tenantData.houseId;
        const status = tenantData.status === 'vacant' ? false : true;
        const tenantId = tenantData.tenantId;


        // Update house occupied status
        await updateHouseOccupiedStatus(houseId, status, tenantId);
        console.log(`Updated house ${houseId} to occupied status: ${status} and tenantId: ${tenantId}`);
        channel.ack(msg);
      }
    });

    console.log('Listening for house update messages...');
  } catch (error) {
    console.error('Error in RabbitMQ listener:', error);
  }
};

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  findHouseByNumber,
  updateHouse,
  updateHouseOccupiedStatus,
  listenForTenantCreated,
};
