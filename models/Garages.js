const mongoose = require('mongoose');
const { Schema } = mongoose;

const garageSchema = new Schema({
  name: String,
  address: String,
  location: {
      lat: Number,
      lng: Number,
  },
});

module.exports = mongoose.model('garage', garageSchema);
