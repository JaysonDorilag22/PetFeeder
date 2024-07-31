const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CellweightDataSchema = new Schema({
  weightScale: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CellweightData', CellweightDataSchema);
