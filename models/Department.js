const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: String,
  userId: String,
  businessId: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isSubDepartment: {type: Boolean, default: false},
  isSelected: {type: Boolean, default: false},
  parentDepartmentId: String,
  order: { type: Number, default: 0 },
  isEquity: { type: Boolean, default: false },
  tags: { type: [Schema.Types.Mixed], ref: 'tags' },
  tasks: { type: Schema.Types.Mixed, ref: 'tasks' },
  employees: { type: Schema.Types.ObjectId, ref: 'users' },
  business: { type: Schema.Types.ObjectId, ref: 'businesses' },
  employees: { type: Schema.Types.Mixed, ref: 'businessAssociatesItems' },
}, {
  timestamps: true
});

module.exports = mongoose.model('departments', departmentSchema);
