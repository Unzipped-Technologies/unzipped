const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  taskId: Number,
  businessId: Number,
  tagName: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('tags', tagSchema);
