const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  id: Number,
  make: String,
  model: String,
  year: Number,
});

module.exports = mongoose.model('vehicle', vehicleSchema);
