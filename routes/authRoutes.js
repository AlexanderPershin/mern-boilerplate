const passport = require('passport');

module.exports = app => {
  // Google strategy has internal identifier 'google'
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  ); // Begin authentication chain

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // Callback from google to get user's data
      res.send({ msg: 'authentication success' });
    }
  );
};
