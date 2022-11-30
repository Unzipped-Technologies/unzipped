const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  userSentId: Number,
  userReceivedId: Number,
  message: { type: String, default: '' },
  attachment: String,
  otherUserProfilePic: String,
  isAlert: {type: Boolean, default: true},
  isRead: {type: Boolean, default: true},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('messages', messageSchema);
