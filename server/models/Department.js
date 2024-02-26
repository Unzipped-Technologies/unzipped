const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const { Schema } = mongoose

const departmentSchema = new Schema(
  {
    name: String,
    clientId: { type: Schema.Types.ObjectId, ref: 'users' },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    isSubDepartment: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isEquity: { type: Boolean, default: false },
    tags: { type: [Schema.Types.ObjectId], ref: 'tags' },
    tasks: { type: [Schema.Types.ObjectId], ref: 'tasks' },
    parentDepartmentId: { type: Schema.Types.ObjectId, ref: 'departments' },
    businessId: { type: Schema.Types.ObjectId, ref: 'businesses', required: true },
    employees: { type: [Schema.Types.ObjectId], ref: 'contracts' }
  },
  {
    timestamps: true
  }
)
departmentSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('departments', departmentSchema)
