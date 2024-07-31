const mongoose = require('mongoose');

const foodLevelSchema = new mongoose.Schema({
  foodLevel: { type: Number, required: true },
  unit: { type: String, default: 'g' },
  timestamp: { type: Date, default: Date.now }
});

const FoodLevel = mongoose.model('FoodLevel', foodLevelSchema);

module.exports = FoodLevel;
