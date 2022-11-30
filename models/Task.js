const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  userId: Number,
  businessId: Number,
  departmentId: Number,
  taskName: String,
  storyPoints: { type: Number, default: 1 },
  assigneeId: { type: Number, default: 0 },
  priority: { type: Number, default: 0 },
  description: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  Status: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model('tasks', taskSchema);
