const mongoose = require('mongoose')
const { Schema } = mongoose
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'questions', default: null },
  answer: { type: String, required: true }
})

const projectApplicationSchema = new Schema(
  {
    rate: Number,
    coverLetter: String,
    deletedAt: { type: Date, default: '' },
    isDeleted: { type: Boolean, default: true },
    isHired: { type: Boolean, default: false },
    questions: [questionSchema],
    projectId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' }
  },
  {
    timestamps: true
  }
)
projectApplicationSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('projectapplications', projectApplicationSchema)
