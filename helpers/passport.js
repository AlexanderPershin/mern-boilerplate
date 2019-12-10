const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleClientId, googleClientSecret } = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(
        'TCL: accessToken, refreshToken, profile',
        accessToken,
        refreshToken,
        profile
      );
    }
  )
);
