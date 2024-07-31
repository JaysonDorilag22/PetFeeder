const CellweightDataSchema = require('../models/cellweight');

// Controller function to handle incoming data
exports.receiveCellweightData = async (req, res) => {
  const { weightScale } = req.body;

  try {
    const newData = new CellweightDataSchema({
      weightScale
    });

    await newData.save();
    res.status(201).send('Data saved successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getCellweightData = async (req, res) => {
    try {
      const data = await CellweightDataSchema.find().sort({ timestamp: -1 });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send('Server error');
    }
};
