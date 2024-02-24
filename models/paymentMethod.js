const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses', 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
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

module.exports = mongoose.model('paymentmethods', paymentMethodSchema);


