const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessSchema = new Schema({
  userId: String,
  name: String,
  projectBudgetType: {
    type: String,
    enum: ['Hourly Rate', 'Fixed Price'],
  },
  applicants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    }
  ],
  isFirstBusiness: {type: Boolean, default: true},
  incomePlatform: [String],
  isExistingAudience: {type: Boolean, default: false},
  numberOfSocialFollowing: String,
  socialMediaPlatforms: [String],
  typesOfHires: [String],
  businessNiche: String,
  businessAddressLineOne: { type: String, default: '' },
  businessAddressLineTwo: { type: String, default: '' },
  businessCountry: { type: String, default: '' },
  businessFirstName: { type: String, default: '' },
  businessLastName: { type: String, default: '' },
  businessCity:  { type: String, default: '' },
  businessState:  { type: String, default: '' },
  businessZip:  { type: String, default: '' },
  description: { type: String, default: '' },

  totalSpent: { type: Number, default: 0 },
  isEquity: {type: Boolean, default: false},
  isBusinessUpdated: {type: Boolean, default: false},
  equity: Number,
  valueEstimate: Number,
  deadline: Date,
  projectType: {
    type: String, 
    enum: ['Short Term Business', 'Long Term Collaboration'],
  },
  challenge: String,
  role: String,
  objectives: [String],
  teamDynamics: String,
  requiredSkills: [String],
  goals: String,
  companyBackground: String,
  budget: String,
  questionsToAsk: [String],
  isSelected: {type: Boolean, default: false},
  paymentMethod: {
    card: String, 
    id: String
  },
  stripeId: String,
  totalTimeInvested: { type: Number, default: 0 },
  // description: { type: String, default: '' },
  isProfessionalsUpdated: String,
  businessImage: String,
  createdBy: String,
  customMarkdown: String,
  businessCode: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isSelected: {type: Boolean, default: false},
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  tags: { type: Schema.Types.Mixed, refs: 'tags'},
  tasks: { type: Schema.Types.Mixed, ref: 'tasks' },
  audience: { type: Schema.Types.ObjectId, ref: 'businessAudiences' },
  invoices: { type: Schema.Types.Mixed, ref: 'invoices' },
  departments: { type: Schema.Types.Mixed, ref: 'departments' },
  employees: { type: Schema.Types.Mixed, ref: 'contracts' },
  // refer to other users likes of this business
  likeTotal: { type: Number, default: 0 },
  dislikeTotal: { type: Number, default: 0 },
  likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
  dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
}, {
  timestamps: true
});

module.exports = mongoose.model('businesses', businessSchema);
