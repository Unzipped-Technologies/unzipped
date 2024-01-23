const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'users' },
  message: { type: String, default: '' },
  attachment: [String],
  conversationId: String,
  isAlert: {type: Boolean, default: false},
  attachment: { type: String, default: '' },
  isRead: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('messages', messageSchema);
