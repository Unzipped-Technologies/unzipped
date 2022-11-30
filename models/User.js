const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  role: String,
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
  isEmailVerified: {type: Boolean, default: false},
  googleId: String,
  isAdmin: { type: Boolean, default: false },
  isUserSubscribed: { type: Boolean, default: false },
  isIdentityVerified: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  plan: { type: Number, default: 0},
  phoneNumber: String,
  stripeId: String,
  isQuestionaireCompleted: { type: Boolean, default: false },
  AddressLineOne: { type: String, default: '' },
  AddressLineTwo: { type: String, default: '' },
  AddressLineCountry: { type: String, default: '' },
  FirstName: { type: String, default: '' },
  LastName: { type: String, default: '' },
  AddressCity:  { type: String, default: '' },
  AddressState:  { type: String, default: '' },
  AddressZip:  { type: String, default: '' },
}, {
  timestamps: true
});

module.exports = mongoose.model('users', userSchema);
