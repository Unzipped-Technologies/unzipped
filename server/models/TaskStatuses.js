const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskStatusSchema = new Schema({
  userId: String,
  businessId: String,
  departmentId: String,
  StatusName: String,
  isToDo: {type: Boolean, default: true},
  isInProgress: {type: Boolean, default: true},
  isDone: {type: Boolean, default: true},
  isPrimaryField: {type: Boolean, default: true},
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model('taskStatuses', taskStatusSchema);
