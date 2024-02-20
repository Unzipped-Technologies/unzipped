const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: String,
  name: String,
  phone: String,
  total: Number,
  status: {
      type: String,
      default: "PENDING"
  },
  email: String,
  orderNumber: String,
  promo: {
    error: String, 
    id: String, 
    code: String, 
    description: String, 
    userType: String, 
    discount: Number
  },
  paymentSuccessful: {
      type: Boolean,
      default: true
  },
  date: String,
  time: String,
  orderDate: String,
  paymentId: String,
  refundId: String,
  transmission: String
});

module.exports = mongoose.model('orders', orderSchema);
