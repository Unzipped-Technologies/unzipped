const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentHistorySchema = new Schema({
  userId: String,
  subscriptionId: String,
  ipAddress: String,
  isPaymentSuccessful: { type: Boolean, default: false },
  isPaymentDeclined: { type: Boolean, default: false },
  paymentStatus: { type: Number, default: 0 },
  paymentType: { type: String, default: 0 },
  paymentAmount: Number,
  paymentCurrency: { type: String, default: 'USD' },
  paymentIntentId: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('paymentHistorys', paymentHistorySchema);
