const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
  id: Number,
  name: String,
  address: String,
});

module.exports = mongoose.model('hotel', hotelSchema);
