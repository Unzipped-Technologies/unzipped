const mongoose = require('mongoose')
const { Schema } = mongoose

const businessSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    businessNiche: String,
    incomePlatform: [String],
    numberOfSocialFollowing: String,
    socialMediaPlatforms: [String],
    typesOfHires: [String],
    // Business Address
    businessAddressLineOne: { type: String, default: '' },
    businessAddressLineTwo: { type: String, default: '' },
    businessCountry: { type: String, default: '' },
    businessFirstName: { type: String, default: '' },
    businessLastName: { type: String, default: '' },
    businessCity: { type: String, default: '' },
    businessState: { type: String, default: '' },
    businessZip: { type: String, default: '' },

    totalSpent: { type: Number, default: 0 },
    equity: Number,
    valueEstimate: Number,
    deadline: Date,

    challenge: String,
    role: String,
    objectives: [String],
    teamDynamics: String,
    requiredSkills: [String],
    goals: String,
    companyBackground: String,
    budget: String,
    paymentMethod: {
      card: String,
      id: String
    },
    stripeId: String,
    totalTimeInvested: { type: Number, default: 0 },
    isProfessionalsUpdated: String,
    businessImage: String,
    createdBy: String,
    customMarkdown: String,
    businessCode: String,
    likeTotal: { type: Number, default: 0 },
    projectBudgetType: {
      type: String,
      enum: ['Hourly Rate', 'Fixed Price']
    },
    projectType: {
      type: String,
      enum: ['Short Term Business', 'Long Term Collaboration']
    },
    dislikeTotal: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isEquity: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false },
    isFirstBusiness: { type: Boolean, default: true },
    isBusinessUpdated: { type: Boolean, default: false },
    isExistingAudience: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    tags: { type: [Schema.Types.ObjectId], ref: 'tags' },
    audience: { type: Schema.Types.ObjectId, ref: 'businessAudiences' },
    invoices: { type: Schema.Types.ObjectId, ref: 'invoices' },
    departments: { type: [Schema.Types.ObjectId], ref: 'departments' },
    employees: { type: [Schema.Types.ObjectId], ref: 'contracts' },
    likes: { type: Schema.Types.ObjectId, ref: 'likeHistory' },
    dislikes: { type: Schema.Types.ObjectId, ref: 'likeHistory' },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectapplications'
      }
    ],
    questionsToAsk: { type: [mongoose.Schema.Types.ObjectId], ref: 'questions', default: null },
    projectImagesUrl: [
      {
        type: Schema.Types.ObjectId,
        ref: 'file'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('businesses', businessSchema)
