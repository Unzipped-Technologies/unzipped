const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessDetailSchema = new Schema({
  userId: String,
  name: String,
  type: String,
  businessPhone: String,
  taxId: String,
  files: [String],
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('businessDetail', businessDetailSchema);
