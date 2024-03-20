const mongoose = require('mongoose')
const { Schema } = mongoose

const freelancerSkillsSchema = new Schema(
  {
    skill: String,
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    yearsExperience: { type: Number, default: 0 },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'users' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('freelancerskills', freelancerSkillsSchema)
