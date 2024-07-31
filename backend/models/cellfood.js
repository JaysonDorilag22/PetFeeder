const mongoose = require('mongoose');

const loadCellSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  unit: { type: String, default: 'g' },
  timestamp: { type: Date, default: Date.now }
});

const LoadCell = mongoose.model('LoadCell', loadCellSchema);

module.exports = LoadCell;
