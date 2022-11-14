const mongoose = require('mongoose');
const { Schema } = mongoose;

const promoSchema = new Schema({
  id: Number,
  code: String,
  description: String,
  userType: String,
  discount: String,
});

module.exports = mongoose.model('promo', promoSchema);
