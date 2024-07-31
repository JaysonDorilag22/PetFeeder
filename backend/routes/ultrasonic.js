const express = require('express');
const router = express.Router();
const ultraSonicController = require('../controllers/ultraSonicController');

// POST route to receive ultrasonic sensor data
router.post('/foodlevel-data', ultraSonicController.receiveFoodLevelData);
router.get('/foodlevel-data', ultraSonicController.getFoodLevelData);
module.exports = router;
