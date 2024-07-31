const RFID = require('../models/rfid');

// Controller function to handle incoming data
exports.receiveRfidData = async (req, res) => {
  const { uid } = req.body;

  try {
    const newData = new RFID({
      uid
    });

    await newData.save();
    res.status(201).send('Data saved successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getRfidData = async (req, res) => {
  try {
    const data = await RFID.find().sort({ timestamp: -1 }); // Sort by latest first
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
