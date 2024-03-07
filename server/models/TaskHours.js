const mongoose = require('mongoose')
const { Schema } = mongoose
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const taskHoursSchema = new Schema(
  {
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: 'freelancers',
      required: true
    },
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: 'invoices',
      required: true
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'tasks',
      required: true
    },
    hours: {
      type: Number,
      required: true,
      default: 0
    },
    day: {
      type: Number,
      required: true
    },
    updatedAt: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

taskHoursSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('taskhours', taskHoursSchema)
