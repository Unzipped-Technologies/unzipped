const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  name: String,
  icon: { type: String, default: '' }, // TODO update to be the default icon
  userId: Number,
  isActive: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('lists', listSchema);
