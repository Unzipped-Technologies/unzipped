const mongoose = require('mongoose');
const { Schema } = mongoose;

const inviteSchema = new Schema({
  userId: String,
  rate: Number,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  status: {type: Number, default: 0},
  business: { type: Schema.Types.ObjectId, ref: 'businesses' },
  freelancer: { type: Schema.Types.ObjectId, ref: 'freelancers' },
  userInvited: { type: Schema.Types.ObjectId, ref: 'users' }
}, {
  timestamps: true
});

module.exports = mongoose.model('invites', inviteSchema);
