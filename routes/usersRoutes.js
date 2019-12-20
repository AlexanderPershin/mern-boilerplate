const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');
const Profile = mongoose.model('profiles');

// Routes for getting users
module.exports = app => {
  app.get('/api/users', (req, res) => {
    res.send('Users');
  });
};
