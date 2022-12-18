const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  addedBy: String,
  stripeProductId: String,
  stripePriceId: String,
  price: Number,
  subscription: { type: Number, default: 0},
  paymentFrequency: Number,
  isRecurring: { type: Boolean, default: false },
  image: String,
  type: String,
});

module.exports = mongoose.model('products', productSchema);
