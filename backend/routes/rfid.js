const express = require('express');
const router = express.Router();
const RfidController = require('../controllers/rfidController');

// POST route to receive rfid sensor data
router.post('/rfid-data', RfidController.receiveRfidData);
router.get('/rfid-data', RfidController.getRfidData);
module.exports = router;
