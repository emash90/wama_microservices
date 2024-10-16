const House = require('../models/houseModel');

const getAllHouses = async () => {
  return await House.find();
};

const getHouseById = async (id) => {
  return await House.findById(id);
};

const createHouse = async (houseData) => {
  const newHouse = new House(houseData);
  return await newHouse.save();
};

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
};
