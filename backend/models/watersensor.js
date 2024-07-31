const mongoose = require('mongoose');

const waterLevelSchema = new mongoose.Schema({
  waterLevel: { type: Number, required: true },
  unit: { type: String, default: '%' },
  timestamp: { type: Date, default: Date.now }
});

const WaterLevel = mongoose.model('WaterLevel', waterLevelSchema);

module.exports = WaterLevel;
