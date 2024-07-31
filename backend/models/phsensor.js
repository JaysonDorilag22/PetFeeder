const mongoose = require('mongoose');

const phDataSchema = new mongoose.Schema({
  ph: { type: Number, required: true },
  category: { type: String, enum: ['Acidic', 'Normal', 'Alkaline'], required: true },
  unit: { type: String, default: 'pH' },
  timestamp: { type: Date, default: Date.now }
});

const PHData = mongoose.model('PHData', phDataSchema);

module.exports = PHData;
