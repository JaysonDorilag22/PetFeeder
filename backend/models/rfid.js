const mongoose = require('mongoose');

const rfidSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const RFID = mongoose.model('RFID', rfidSchema);

module.exports = RFID;
