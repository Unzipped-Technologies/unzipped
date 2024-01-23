const mongoose = require('mongoose');
const { Schema } = mongoose;
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const invoiceRecordsSchema = new Schema({
    userId: String,
    paymentHistoryIds: [{ type: Schema.Types.ObjectId, ref: 'PaymentHistories' }]
}, {
  timestamps: true
});

invoiceRecordsSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('invoicerecords', invoiceRecordsSchema);
