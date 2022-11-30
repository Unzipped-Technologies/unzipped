const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailListSchema = new Schema({
  email: Number,
  isActive: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('emailLists', emailListSchema);
