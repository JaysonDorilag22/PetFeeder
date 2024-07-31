const express = require('express');
const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser'); // Corrected import name
// const UltrasonicData = require('./models/ultrasonic');

// Middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());

//Route Imports
const ultrasonic = require('./routes/ultrasonic'); 
const watersensor = require('./routes/watersensor');
const rfid = require('./routes/rfid');
const phsensor = require('./routes/phsensor');
const cellweight = require('./routes/cellweight');
const cellfood = require('./routes/cellfood');

// POST route for ultrasonic data
// app.post('/ultrasonic-data', async (req, res) => {
//   const { distance } = req.body;

//   try {
//     const newData = new UltrasonicData({
//       distance
//     });

//     await newData.save();
//     res.status(201).send('Data saved successfully');
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).send('Server error');
//   }
// });

// Mount ultrasonic routes
app.use('/api', ultrasonic);
app.use('/api', watersensor);
app.use('/api', rfid);
app.use('/api', phsensor);
app.use('/api', cellweight);
app.use('/api', cellfood);

module.exports = app;
