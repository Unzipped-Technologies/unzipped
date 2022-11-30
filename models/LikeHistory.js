const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeHistorySchema = new Schema({
  businessId: Number,
  profileId: Number,
  userId: Number,
  likeType: { type: Number, default: 0 },
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('likeHistorys', likeHistorySchema);
