const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  usePromo: { type: Boolean, default: 0 },
  isHotel: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  userType: { type: String, default: 'Customer'},
  stripeId: String,
  hotel: String,
  defaultVehicle: {
    year: Number,
    make: String,
    model: String,
    color: String,
    vin: String,
    license: String
  },
  paymentMethod: {
    card: String, 
    id: String
  },
  promo: Number,
  defaultLocation: {Object},
  first_name: String,
  last_name: String,
  name: String,
  email: {
    type: String,
    require: true,
    maxlength: 255,
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    minlength: 10,
    maxlength: 1024,
  },
  emailVerified: {type: Boolean, default: false},
  isMember: {type: Boolean, default: false},
  dateCreated: String,
  phone: String,
});

module.exports = mongoose.model('users', userSchema);
