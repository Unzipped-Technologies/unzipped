const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
  userId: String,
  name: String,
  budget: Number,
  totalSpent: { type: Number, default: 0 },
  isEquity: {type: Boolean, default: false},
  isBusinessUpdated: {type: Boolean, default: false},
  equity: Number,
  valueEstimate: Number,
  deadline: Date,
  isFirstBusiness: {type: Boolean, default: true},
  incomePlatform: [String],
  isExistingAudience: {type: Boolean, default: false},
  numberOfSocialFollowing: Number,
  businessNiche: String,
  businessAddressLineOne: { type: String, default: '' },
  businessAddressLineTwo: { type: String, default: '' },
  businessAddressLineCountry: { type: String, default: '' },
  businessFirstName: { type: String, default: '' },
  businessLastName: { type: String, default: '' },
  businessAddressCity:  { type: String, default: '' },
  businessAddressState:  { type: String, default: '' },
  businessAddressZip:  { type: String, default: '' },
  paymentMethod: {
    card: String, 
    id: String
  },
  stripeId: String,
  totalTimeInvested: Number,
  totalLikes: Number,
  totalDislikes: Number,
  description: String,
  isProfessionalsUpdated: String,
  businessImage: String,
  createdBy: String,
  customMarkdown: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  tags: { type: Schema.Types.Mixed, refs: 'tags'},
  tasks: { type: Schema.Types.Mixed, ref: 'tasks' },
  audience: { type: Schema.Types.ObjectId, ref: 'businessAudience' },
  invoices: { type: Schema.Types.Mixed, ref: 'invoices' },
  // refer to other users likes of this business
  likeTotal: { type: Number, default: 0 },
  dislikeTotal: { type: Number, default: 0 },
  likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
  dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
}, {
  timestamps: true
});

module.exports = mongoose.model('businesses', businessSchema);
