const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')
const { Schema } = mongoose

const taskHoursSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'tasks',
      required: true
    },
    hours: {
      type: Number,
      required: true
    },
    updatedAt: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
)
taskHoursSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('taskhours', taskHoursSchema)
