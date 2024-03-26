const mongoose = require('mongoose');
const { Schema } = mongoose;
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const taskHoursSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'tasks',
    required: true,
  },
  invoice: { type: Schema.Types.ObjectId, ref: 'invoices' },
  hours: {
    type: Number,
    required: true,
  },
  departmentId: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});

taskHoursSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('taskhours', taskHoursSchema);
