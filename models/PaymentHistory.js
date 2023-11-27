const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentHistorySchema = new Schema({
  userId: String,
  subscriptionId: String,
  invoiceId: { type: Schema.Types.ObjectId, ref: 'invoices' },
  ipAddress: String,
  isPaymentSuccessful: { type: Boolean, default: false },
  isPaymentDeclined: { type: Boolean, default: false },
  paymentStatus: { type: Number, default: 0 },
  paymentType: { type: String, default: '' },
  paymentAmount: Number,
  paymentCurrency: { type: String, default: 'USD' },
  paymentDate: String 
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentHistories', paymentHistorySchema);
