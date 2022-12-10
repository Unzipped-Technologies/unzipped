const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: keys.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ email: profile.emails[0].value });

      if (existingUser) {
        return done(null, existingUser);
      } 
      let dateCreated = new Date()
      const user = await new User({ 
        googleId: profile.id,
        email: profile.emails[0].value,
        emailVerified: true,      
        dateCreated: dateCreated,
      }).save();
      done(null, user);
    }
  )
);
