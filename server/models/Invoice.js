const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')
const { INVOICE_STATUS, ACTIVE_STATUS } = require('../utils/constants')
const { Schema } = mongoose

const invoiceSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'users' },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' },
    businessId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    departmentId: { type: Schema.Types.ObjectId, ref: 'departments' },
    tasks: { type: [Schema.Types.ObjectId], ref: 'tasks' },
    hoursWorked: { type: Number, required: true },
    status: { type: String, default: ACTIVE_STATUS, enum: [...INVOICE_STATUS] }
  },
  {
    timestamps: true
  }
)

invoiceSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('invoices', invoiceSchema)
