const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { googleClientId, googleClientSecret } = require('../config/keys');

// This(passport.js) file should be loaded AFTER mongoose model in index.js
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // Use user.id (id === _id in mongo collection) to identification with cookie
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  // Take mongo _id serialized by serialize user and convert into user
  const existingUser = await User.findById(userId);

  if (existingUser) {
    done(null, existingUser);
  } else {
    done(`User not found`, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // We already have record with such id
      const cowboyInside = await User.findOne({ googleId: profile.id });

      if (!cowboyInside) {
        // No user with such id - create new record
        const cowboyEntersSaloon = new User({
          googleId: profile.id
        });
        await cowboyEntersSaloon.save();

        // Pass to passport.serializeUser
        done(null, cowboyEntersSaloon);
      } else {
        // Pass to passport.serializeUser
        done(null, cowboyInside);
      }
    }
  )
);
