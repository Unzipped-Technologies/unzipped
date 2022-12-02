const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  role: Number,
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
  isGithubConnected: { type: Boolean, default: false },
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
  freelancers: { type: Schema.Types.ObjectId, ref: 'freelancers' },
  lists: { type: Schema.Types.ObjectId, ref: 'lists' },
  freelancerSkills: { type: Schema.Types.Mixed, refs: 'freelancerSkills'},
}, {
  timestamps: true
});

module.exports = mongoose.model('users', userSchema);
