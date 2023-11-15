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
  isPhoneVerified: { type: Boolean, default: false },
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
  trialEndDate: { type: Date, default: new Date() },
  stripeSubscription: { type: String, default: '' },
  isUserSubscribed: { type: Boolean, default: false },
  profileImage: { type: String, default: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'},
  freelancers: { type: Schema.Types.ObjectId, ref: 'freelancers' },
  lists: { type: Schema.Types.Mixed, ref: 'lists', default: [] },
  freelancerSkills: [{ type: Schema.Types.Mixed, ref: 'freelancerSkills'}],
  business: { type: Schema.Types.Mixed, refs: 'businesses'},
  // these refer times the user liked freelancers or businesses
  likeTotal: { type: Number, default: 0 },
  dislikeTotal: { type: Number, default: 0 },
  likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
  dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
  notifications: { type: Schema.Types.Mixed, ref: 'notifications' },
  files: { type: Schema.Types.Mixed, ref: 'file' },
  totalBalance: { type: Number, default: 0 }, 
  totalPending: { type: Number, default: 0 }, 
}, {
  timestamps: true
});

module.exports = mongoose.model('users', userSchema);
