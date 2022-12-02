const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: String,
  userId: String,
  businessId: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isSubDepartment: {type: Boolean, default: false},
  parentDepartmentId: { type: Number, default: 0 },
  isEquity: { type: Boolean, default: false },
  tags: { type: Schema.Types.Mixed, ref: 'tags' },
  tasks: { type: Schema.Types.Mixed, ref: 'tasks' },
}, {
  timestamps: true
});

module.exports = mongoose.model('departments', departmentSchema);
