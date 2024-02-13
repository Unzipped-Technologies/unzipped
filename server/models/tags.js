const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const { Schema } = mongoose

const tagSchema = new Schema(
  {
    tagName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    departmentId: { type: Schema.Types.ObjectId, ref: 'departments' }
  },
  {
    timestamps: true
  }
)
tagSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('tags', tagSchema)
