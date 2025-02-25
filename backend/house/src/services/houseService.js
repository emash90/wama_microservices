const mongoose = require('mongoose');
const House = require('../models/houseModel');
const { connectRabbitMQ, getChannel } = require('../../utils/rabbitmq');

const getAllHouses = async () => {
  return await House.find({ house_number: { $ne: "" } }).sort({ createdAt: -1 }); 
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

const updateHouseOccupiedStatus = async (houseId, occupiedStatus) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(
      houseId,
      { occupied: occupiedStatus },
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

        // Update house occupied status
        await updateHouseOccupiedStatus(houseId, status);
        console.log(`Updated house ${houseId} to occupied status: ${status}`);

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
