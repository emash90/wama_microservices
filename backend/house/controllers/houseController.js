const houseService = require('../services/houseService');

const getAllHouses = async (req, res, next) => {
  try {
    const houses = await houseService.getAllHouses();
    res.status(200).json(houses);
  } catch (error) {
    next(error);
  }
};

const getHouseById = async (req, res, next) => {
  try {
    const house = await houseService.getHouseById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    res.status(200).json(house);
  } catch (error) {
    next(error);
  }
};

const createHouse = async (req, res, next) => {
  try {
    const newHouse = await houseService.createHouse(req.body);
    res.status(201).json(newHouse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
};
