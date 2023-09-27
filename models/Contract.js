const mongoose = require('mongoose');

// Define the Mongoose schema for Contracts
const contractsSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'businesses', // Reference to the Business model
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'departments', 
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'freelancers', // Reference to the Freelancer model
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
  },
  hourlyRate: {
    type: Number,
  },
  hoursLimit: {
    type: Number,
  },
  isOfferAccepted: {
    type: Boolean,
  },
  totalStoryPoints: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  isArchived: {
    type: Boolean,
  }
});

// Create the Contracts model
const Contracts = mongoose.model('contracts', contractsSchema);

module.exports = Contracts;
