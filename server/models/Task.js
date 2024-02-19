const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')
const { TASK_STATUS, TASK_PRIORITY, TODO_STATUS, LOW_PRIORITY } = require('../utils/constants')

const { Schema } = mongoose

const taskSchema = new Schema(
  {
    ticketCode: { type: String, unique: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    storyPoints: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    taskName: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
    tags: {
      type: [String],
      maxlength: 5
    },
    tag: { type: Schema.Types.ObjectId, ref: 'tags' },
    assignee: { type: Schema.Types.ObjectId, ref: 'freelancers' },
    businessId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    departmentId: { type: Schema.Types.ObjectId, ref: 'departments' },
    status: { type: String, default: TODO_STATUS, enum: [...TASK_STATUS] },
    priority: { type: String, default: LOW_PRIORITY, enum: [...TASK_PRIORITY] },
    comments: [
      {
        type: new Schema(
          {
            comment: { type: String, required: true },
            img: { type: String, default: '' },
            userId: { type: Schema.Types.ObjectId, ref: 'users' }
          },
          { timestamps: true }
        ),
        default: []
      }
    ]
  },
  {
    timestamps: false
  }
)
taskSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('tasks', taskSchema)
