const mongoose = require('mongoose')
const { Schema } = mongoose

const freelancerSkillsSchema = new Schema(
  {
    profileId: String,
    skill: String,
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    yearsExperience: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, refs: 'users' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('freelancerskills', freelancerSkillsSchema)
