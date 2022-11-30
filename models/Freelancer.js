const mongoose = require('mongoose');
const { Schema } = mongoose;

const freelancerSchema = new Schema({
  userId: Number,
  rate: Number,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  likeTotal: { type: Number, default: 0 },
  dislikeTotal: { type: Number, default: 0 },
  isPreferedFreelancer: { type: Boolean, default: false },
  isAcceptEquity: { type: Boolean, default: false },
  category: { type: String, default: '' },
}, {
  timestamps: true
});

module.exports = mongoose.model('freelancers', freelancerSchema);
