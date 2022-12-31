const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessAssociatesItemSchema = new Schema({
  userId: String,
  businessId: String,
  departmentId: String,
  profileId: String,
  equityShare: { type: Number, default: 0 },
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  currentRate: Number,
  TotalStoryPoints: { type: Number, default: 1 },
  business: { type: Schema.Types.ObjectId, ref: 'businesses' },
  department: { type: Schema.Types.ObjectId, ref: 'departments' },
  profile: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  timestamps: true
});

module.exports = mongoose.model('businessAssociatesItems', businessAssociatesItemSchema);
