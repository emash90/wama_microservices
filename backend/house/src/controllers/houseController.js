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
    
    //check if house exists
    const {house_number} = req.body
    const houseExist = await houseService.findHouseByNumber(house_number)
    if (houseExist) {
        return res.status(403).json({ 
          message: "House with this number already exists",
          data: houseExist
         });
      }
    const newHouse = await houseService.createHouse(req.body);
    res.status(201).json(newHouse);
  } catch (error) {
    next(error);
  }
};

const updateHouse = async (req, res, next) => {
  try {
    const house = await houseService.updateHouse(req.params.id, req.body);
    res.status(200).json(house);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse
};
