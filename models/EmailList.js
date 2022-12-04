const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailListSchema = new Schema({
  email: String,
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('emailLists', emailListSchema);
