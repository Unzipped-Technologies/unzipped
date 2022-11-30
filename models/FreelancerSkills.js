const mongoose = require('mongoose');
const { Schema } = mongoose;

const freelancerSkillsSchema = new Schema({
  profileId: Number,
  skill: string,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  yearsExperience: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model('freelancersSkills', freelancerSkillsSchema);
