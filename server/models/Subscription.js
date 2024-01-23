const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  userId: String,
  stripeId: String,
  plan: { type: Number, default: 0 },
  isBusiness: {type: Boolean, default: false},
  paymentFrequency: Number,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  BillingAddressLineOne: { type: String, default: '' },
  BillingAddressLineTwo: { type: String, default: '' },
  BillingAddressLineCountry: { type: String, default: '' },
  BillingFirstName: { type: String, default: '' },
  BillingLastName: { type: String, default: '' },
  BillingAddressCity:  { type: String, default: '' },
  BillingAddressState:  { type: String, default: '' },
  BillingAddressZip:  { type: String, default: '' },
  BusinessAddressPhone:  { type: String, default: '' },
  paymentMethod: {
    card: String, 
    stripeId: String,
    lastFour: String
  },
  product: { type: Schema.Types.ObjectId, ref: 'product' },
  payments: { type: Schema.Types.Mixed, ref: 'paymentHistory' },
}, {
  timestamps: true
});

module.exports = mongoose.model('subscriptions', subscriptionSchema);
