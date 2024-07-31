const express = require('express');
const router = express.Router();
const phsensorController = require('../controllers/phSensorController');

// POST route to receive phsensor sensor data
router.post('/ph-data', phsensorController.receivePhsensorData);
router.get('/ph-data', phsensorController.getPhsensorData);
module.exports = router;
