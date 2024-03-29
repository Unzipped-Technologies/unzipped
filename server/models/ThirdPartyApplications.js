const mongoose = require('mongoose');
const { Schema } = mongoose;

const thirdPartyApplicationSchema = new Schema({
  userId: String,
  githubId: String,
  stripeId: String, // this account is for making payments
  stripeAccountId: String, // this account is for paying out to user
  googleId: String,
  calendlyId: String,
  meta: Object,
  github: {
    userName: String,
    email: String,
    avatarUrl: String,
    githubId: Number,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('thirdPartyApplications', thirdPartyApplicationSchema);
