const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')
const { Schema } = mongoose

const showCaseProjectsSchema = new Schema(
  {
    freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers', required: true },
    role: { type: String, required: true },
    projectName: { type: String, required: true },
    images: { type: [String], default: [] },
    skills: { type: [String], default: [], required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

showCaseProjectsSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('ShowCaseProjects', showCaseProjectsSchema)
