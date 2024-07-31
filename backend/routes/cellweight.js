const express = require('express');
const router = express.Router();
const cellWeightController = require('../controllers/cellWeightController');

// POST route to receive cellWeight sensor data
router.post('/loadcell-data', cellWeightController.receiveCellweightData);
router.get('/loadcell-data', cellWeightController.getCellweightData);
module.exports = router;
