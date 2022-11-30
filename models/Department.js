const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: String,
  userId: Number,
  businessId: Number,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  isSubDepartment: {type: Boolean, default: false},
  parentDepartmentId: { type: Number, default: 0 },
  isEquity: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('departments', departmentSchema);
