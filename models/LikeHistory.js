const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeHistorySchema = new Schema({
  businessId: String,
  profileId: String,
  userId: String,
  likeType: { type: Number, default: 0 },
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  freelancers: { type: Schema.Types.ObjectId, ref: 'freelancers' },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true
});

module.exports = mongoose.model('likeHistorys', likeHistorySchema);
