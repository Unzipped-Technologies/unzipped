const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const { Schema } = mongoose

const questionSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: 'businesses' },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    question: String,
    answers: [
      { userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }, answer: { type: String, default: '' } }
    ],
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

questionSchema.plugin(softDeletePlugin)
module.exports = mongoose.model('questions', questionSchema)
