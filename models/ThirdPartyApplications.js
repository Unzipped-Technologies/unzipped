const mongoose = require('mongoose');
const { Schema } = mongoose;

const thirdPartyApplicationSchema = new Schema({
  userId: String,
  githubId: String,
  stripeId: String,
  googleId: String,
  calendlyId: String,
  meta: Object,
}, {
  timestamps: true
});

module.exports = mongoose.model('thirdPartyApplications', thirdPartyApplicationSchema);
