const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: String,
  name: String,
  phone: String,
//   services: [Object],
  total: Number,
//   hotel: String,
  status: {
      type: String,
      default: "PENDING"
  },
  email: String,
  orderNumber: String,
//   Vehicle: {
//       year: Number,
//       make: String,
//       model: String,
//       color: String,
//       vin: String,
//       license: String
//   },
//   promo: {
//     error: String, 
//     id: String, 
//     code: String, 
//     description: String, 
//     userType: String, 
//     discount: Number
//   },
  paymentSuccessful: {
      type: Boolean,
      default: true
  },
  date: String,
  time: String,
//   location: {
//       name: String,
//       address: String,
//       location: {
//           lat: Number,
//           lng: Number,
//       },
//       dropoffAddress: String
//   },
  orderDate: String,
  paymentId: String,
  refundId: String,
//   roomNumber: String,
//   valetNumber: String,
  transmission: String
});

module.exports = mongoose.model('orders', orderSchema);
