const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

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
      // Postauthentication redirect
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    // Logout user by destroying session
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    // Check if user is logged in
    res.send(req.user);
  });

  // Specify requireLogin to allow only logged in users view page
  app.get('/api/secure', requireLogin, (req, res) => {
    res.json({ msg: 'This route is very secure!' });
  });
};
