const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  name: String,
  description: [String],
  first_name: String,
  last_name: String,
  price: Number,
  image: [String],
  type: String,
});

module.exports = mongoose.model('products', productSchema);
