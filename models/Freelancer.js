const mongoose = require('mongoose');
const { Schema } = mongoose;

const freelancerSchema = new Schema({
  userId: String,
  rate: Number,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isPreferedFreelancer: { type: Boolean, default: false },
  isAcceptEquity: { type: Boolean, default: false },
  category: { type: String, default: '' },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  freelancerSkills: { type: Schema.Types.ObjectId, refs: 'freelancerSkills'},
  lists: { type: Schema.Types.ObjectId, ref: 'lists' },
  // refer to other users likes of this freelancer
  likeTotal: { type: Number, default: 0 },
  dislikeTotal: { type: Number, default: 0 },
  likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
  dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
}, {
  timestamps: true
});

module.exports = mongoose.model('freelancers', freelancerSchema);
