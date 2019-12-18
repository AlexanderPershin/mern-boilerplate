const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');

// Routes for read/write users profiles
module.exports = app => {
  app.get('/api/profiles', (req, res) => {
    res.send('Profiles');
  });
};
