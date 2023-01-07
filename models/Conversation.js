const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
  participants: [{
      userId: { type: Schema.Types.ObjectId, ref: 'users' },
      isInitiated: { type: Boolean, default: false }
  }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
  isSelected: {type: Boolean, default: false},
  isAlert: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isMute: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('conversations', conversationSchema);
