const mongoose = require('mongoose');
const { Schema } = mongoose;

const thirdPartyApplicationSchema = new Schema({
  userId: Number,
  githubId: String,
  stripeId: String,
  googleId: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('thirdPartyApplications', thirdPartyApplicationSchema);
