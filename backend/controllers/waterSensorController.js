const WaterLevel = require('../models/watersensor');


// Controller function to handle incoming water level data
exports.receiveWaterLevelData = async (req, res) => {
  const { waterLevel } = req.body;

  try {
    const newData = new WaterLevel({
      waterLevel
    });

    await newData.save();
    res.status(201).send('Water level data saved successfully');
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server error');
  }
};

exports.getWaterLevelData = async (req, res) => {
  try {
    const data = await WaterLevel.find().sort({ timestamp: -1 }); // Sort by latest first
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
