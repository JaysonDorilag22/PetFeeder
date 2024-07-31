const express = require('express');
const router = express.Router();
const cellFoodController = require('../controllers/cellFoodController');

// POST route to receive cellWeight sensor data
router.post('/loadcell-food-data', cellFoodController.receiveCellfoodData);
router.get('/loadcell-food-data', cellFoodController.getCellfoodData);
module.exports = router;
