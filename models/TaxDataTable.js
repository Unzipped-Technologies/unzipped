const mongoose = require('mongoose');
const { Schema } = mongoose;

const taxDataTableSchema = new Schema({
  userId: String,
  ein: String,
  ssn: String,
  isBusiness: {type: Boolean, default: false},
  isAccreditedInvestor: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('taxDataTables', taxDataTableSchema);
