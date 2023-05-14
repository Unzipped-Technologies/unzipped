const mongoose = require('mongoose');
const { Schema } = mongoose;

const contractSchema = new Schema({
  profileId: String,
  businessId: String,
  departmentId: String,
  hoursLimit: Number,
  rate: Number,
  dateHired: Date,
  isHourly: {type: Boolean, default: true},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  invoices: { type: Schema.Types.Mixed, ref: 'invoices' },
}, {
  timestamps: true
});

module.exports = mongoose.model('invoices', contractSchema);
