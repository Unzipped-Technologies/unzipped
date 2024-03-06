const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')
const { INVOICE_STATUS, PENDING_STATUS } = require('../utils/constants')
const { Schema } = mongoose

const invoiceSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'users' },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' },
    businessId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    tasks: { type: [Schema.Types.ObjectId], ref: 'tasks', default: [] },
    hoursWorked: { type: Number, required: true, default: 0 },
    status: { type: String, default: PENDING_STATUS, enum: [...INVOICE_STATUS] }
  },
  {
    timestamps: true
  }
)

invoiceSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('invoices', invoiceSchema)
