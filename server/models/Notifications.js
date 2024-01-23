const mongoose = require('mongoose');
const { string } = require('prop-types');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  type: Number,
  userId: String,
  isComplete: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true
});

module.exports = mongoose.model('notifications', notificationSchema);
