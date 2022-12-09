const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  profileId: String,
  businessId: String,
  departmentId: String,
  taskId: String,
  hoursWorked: Number,
  dateWorked: Date,
  dayWorked: String,
  isPaid: {type: Boolean, default: false},
  isApproved: {type: Boolean, default: false},
  isReported: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('invoices', invoiceSchema);
