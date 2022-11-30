const mongoose = require('mongoose');
const { Schema } = mongoose;

const listItemSchema = new Schema({
  userId: Number,
  listId: Number,
  profileId: Number,
  name: String,
  isInvited: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('listItems', listItemSchema);
