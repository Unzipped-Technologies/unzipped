const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskHoursSchema = new Schema({
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: 'users',  
    required: true,
  },
  taskId:{
    type: Schema.Types.ObjectId,
    ref: 'tasks',  
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  businessId: {
    type: String,
    required: true,
  },
  departmentId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true  
});

module.exports = mongoose.model('taskhours', taskHoursSchema);
