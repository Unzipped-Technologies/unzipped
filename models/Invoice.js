const mongoose = require('mongoose')
const { Schema } = mongoose
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const invoiceSchema = new Schema(
  {
    profileId: String,
    clientId: { type: Schema.Types.ObjectId, ref: 'users' },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' },
    businessId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    departmentId: { type: Schema.Types.ObjectId, ref: 'departments' },
    taskId: { type: Schema.Types.ObjectId, ref: 'tasks' },
    taskHours: { type: Schema.Types.ObjectId, refs: 'taskhours' },
    hoursWorked: Number,
    hourlyRate: Number,
    dateWorked: Date,
    dayWorked: String,
    isPaid: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isReported: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

invoiceSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('invoices', invoiceSchema)
