const passport = require('passport');

module.exports = app => {
  // Google strategy has internal identifier 'google'
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  ); // Begin authentication chain

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // Logout user by destroying session
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    // Check if user is logged in
    res.send(req.user);
  });
};
