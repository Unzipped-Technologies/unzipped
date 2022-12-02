const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  businessId: String,
  userId: String,
  question: String,
  answer: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('questions', questionSchema);
