const express = require('express');
const router = express.Router();
const waterSensorController = require('../controllers/waterSensorController');

// POST route to receive water level sensor data
router.post('/waterlevel-data', waterSensorController.receiveWaterLevelData);
router.get('/waterlevel-data', waterSensorController.getWaterLevelData);
module.exports = router;
