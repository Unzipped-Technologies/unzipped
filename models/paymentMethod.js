const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    lineOne: String,
    lineTwo: String,
    city: String,
    state: String,
    zip: String,
    country: String,
});

const PaymentMethodSchema = new mongoose.Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses', 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
    },
    paymentType: {
        type: String,
    },
    address: AddressSchema,
    card: {
        type: String,
    },
    stripeId: {
        type: String,
    },
    lastFour: {
        type: Number,
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

module.exports = mongoose.model('Paymentmethods', PaymentMethodSchema);


