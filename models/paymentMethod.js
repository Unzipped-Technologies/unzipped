const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses', // Reference to the Business model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
    },
    isPrimary: {
        type: Boolean,
    },
    isActive: {
        type: Boolean,
    },
    paymentMethod: {
        type: Object,
    }
});

const Payment = mongoose.model('payments', paymentSchema);

module.exports = Payment;
