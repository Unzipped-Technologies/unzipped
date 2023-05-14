const mongoose = require('mongoose');
const { Schema } = mongoose;

const blockSchema = new Schema({
  profileId: String,
  businessId: String,
  message: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('invoices', blockSchema);
