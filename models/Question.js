const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  businessId: Number,
  userId: Number,
  question: String,
  answer: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('questions', questionSchema);
