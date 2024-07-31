const FoodLevel = require('../models/ultrasonic');

// Controller function to handle incoming data
exports.receiveFoodLevelData = async (req, res) => {
  const { foodLevel } = req.body;

  try {
    const newData = new FoodLevel({
      foodLevel
    });

    await newData.save();
    res.status(201).send('Data saved successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getFoodLevelData = async (req, res) => {
  try {
    const data = await FoodLevel.find().sort({ timestamp: -1 }); // Sort by latest first
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
