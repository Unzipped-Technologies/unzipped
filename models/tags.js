const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  taskId: String,
  departmentId: String,
  tagName: String,
  isActive: {type: Boolean, default: true},
  isArchived: {type: Boolean, default: false},
  department: { type: Schema.Types.ObjectId, ref: 'department' },
}, {
  timestamps: true
});

module.exports = mongoose.model('tags', tagSchema);
