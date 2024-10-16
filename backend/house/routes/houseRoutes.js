const express = require('express');
const houseController = require('../controllers/houseController')

const router = express.Router();

router.get('/', houseController.getAllHouses);
router.get('/:id', houseController.getHouseById);
router.post('/', houseController.createHouse);

module.exports = router;
