const mongoose = require('mongoose');
const House = require('../models/houseModel');
const { connectRabbitMQ, getChannel } = require('../../utils/rabbitmq');

// Get all houses
const getAllHouses = async () => {
  return await House.find();
};

// Get house by ID
const getHouseById = async (id) => {
  return await House.findById(id);
};

// Find house by number
const findHouseByNumber = async(house_number) => {
  return await House.findOne({house_number});
};

// Create a new house
const createHouse = async (houseData) => {
  const newHouse = new House(houseData);
  return await newHouse.save();
};

// Update a house (general purpose)
const updateHouse = async (id, houseData) => {
  return await House.findByIdAndUpdate(id, houseData, { new: true });
};

// Update house when a tenant is added (specifically set "occupied" to true)
const updateHouseOccupiedStatus = async (houseId) => {
  try {
    const objectId =new mongoose.Types.ObjectId(houseId);
    console.log("object id", objectId)
    const updatedHouse = await House.findByIdAndUpdate(objectId, { occupied: true }, { new: true });
    return updatedHouse;
  } catch (error) {
    console.error('Error updating house occupied status:', error);
    throw error;
  }
};

// RabbitMQ listener function to listen for tenant creation messages
const listenForTenantCreated = async () => {
  try {
    await connectRabbitMQ(); 
    const channel = await getChannel();
    const queue = 'tenant_created';
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
      if (msg.content) {
        const tenantData = JSON.parse(msg.content.toString());
        console.log("tenant data", tenantData)
  
        const houseId = tenantData.houseId;

        // Update the house occupied status
        const updatedHouse = await updateHouseOccupiedStatus(houseId);
        console.log("updated house", updatedHouse)
        
        channel.ack(msg);
      }
    });

    console.log('Listening for tenant created messages...');
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
