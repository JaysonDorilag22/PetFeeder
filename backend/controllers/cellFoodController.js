const LoadCell = require('../models/cellfood');

// Controller function to handle incoming data
exports.receiveCellfoodData = async (req, res) => {
  const { weight } = req.body;

  try {
    const newData = new LoadCell({
      weight
    });

    await newData.save();
    res.status(201).send('Data saved successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCellfoodData = async (req, res) => {
  try {
    const data = await LoadCell.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
