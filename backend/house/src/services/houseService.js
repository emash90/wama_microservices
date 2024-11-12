const House = require('../models/houseModel');

const getAllHouses = async () => {
  return await House.find();
};

const getHouseById = async (id) => {
  return await House.findById(id);
};
const findHouseByNumber = async(house_number) => {
  return await House.findOne({house_number});
}

const createHouse = async (houseData) => {
  const newHouse = new House(houseData);
  return await newHouse.save();
};

const updateHouse = async (id, houseData) => {
  return await House.findByIdAndUpdate(id, houseData, { new: true });
}

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  findHouseByNumber,
  updateHouse
};
