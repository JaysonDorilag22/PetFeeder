const PHData = require('../models/phsensor');

// Controller function to handle incoming data
exports.receivePhsensorData = async (req, res) => {
  const { ph, category } = req.body;

  try {
    const newData = new PHData({
      ph,
      category
    });

    await newData.save();
    res.status(201).send('Data saved successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getPhsensorData = async (req, res) => {
  try {
    const data = await PHData.find().sort({ timestamp: -1 }); // Sort by latest first
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
