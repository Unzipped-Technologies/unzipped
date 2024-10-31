const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'users' },
  message: { type: String, default: '' },
  attachment: [
    {
      fileId: { type: String },
      name: { type: String },
      url: { type: String }
    }
  ],
  conversationId: String,
  isAlert: {type: Boolean, default: false},
  // attachment: { type: String, default: '' },
  isRead: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  meetingId: {type: Schema.Types.ObjectId, ref: 'meetings'}
}, {
  timestamps: true
});

module.exports = mongoose.model('messages', messageSchema);