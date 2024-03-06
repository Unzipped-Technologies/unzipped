const mongoose = require('mongoose');
const { Schema } = mongoose;

const planSchema = new Schema({
  name: Number,
  price: Number,
  productId: String,
  description: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('plans', planSchema);
