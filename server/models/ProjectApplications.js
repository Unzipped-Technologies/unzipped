const mongoose = require('mongoose')
const { Schema } = mongoose
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const projectApplicationSchema = new Schema(
  {
    rate: Number,
    coverLetter: String,
    deletedAt: { type: Date, default: '' },
    isDeleted: { type: Boolean, default: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' }
  },
  {
    timestamps: true
  }
)
projectApplicationSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('projectapplications', projectApplicationSchema)
