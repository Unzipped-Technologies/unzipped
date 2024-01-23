const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessAudienceSchema = new Schema({
  businessId: String,
  userId: String,
  name: String,
  link: String,
  isEmailList: {type: Boolean, default: false},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('businessAudiences', businessAudienceSchema);
