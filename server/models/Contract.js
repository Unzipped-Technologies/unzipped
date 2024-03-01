const mongoose = require('mongoose')

const contractsSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'businesses',
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'departments',
      required: true
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'freelancers',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
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
