const mongoose = require('mongoose')

const contractsSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'businesses'
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departments'
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'freelancers'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    hourlyRate: {
      type: Number
    },
    hoursLimit: {
      type: Number
    },
    isOfferAccepted: {
      type: Boolean
    },
    totalStoryPoints: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isArchived: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

const Contracts = mongoose.model('contracts', contractsSchema)

module.exports = Contracts
