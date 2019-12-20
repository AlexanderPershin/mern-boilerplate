const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');
const Profile = mongoose.model('profiles');

// Routes for read/write users profiles
module.exports = app => {
  // Get current user's profile
  app.get('/api/profiles/current', requireLogin, async (req, res) => {
    const currentUser = req.user;

    try {
      // Find profile of current user and add(populate) user's data from users collection
      const profile = await Profile.findOne({
        user: currentUser._id
      }).populate('user', ['username', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      } else {
        res.json(profile);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: 'Server error' });
    }
  });

  // Create/Update profile for current user
  app.post('/api/profiles/current', requireLogin, async (req, res) => {
    const { company, website, location, bio, socials } = req.body;

    // Create profile object
    const profileFields = {
      user: req.user._id,
      company: company || 'Not specified',
      website: website || 'Not specified',
      location: location || 'Not specified',
      bio: bio || 'Not specified',
      social: socials
    };

    try {
      let profile = await Profile.findOne({ user: req.user._id });

      if (profile) {
        // Profile already exists
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      } else {
        // Profile does not exists
        // Create new one
        profile = new Profile(profileFields);

        await profile.save();

        res.json(profile);
      }
    } catch (err) {
      // Server error
      console.log(err.message);
      res.status(500).send('Profile post error');
    }
  });

  // Get ALL profiles
  app.get('/api/profiles/all', async (req, res) => {
    try {
      const profiles = await Profile.find({}).populate('user', [
        'username',
        'avatar'
      ]);

      res.json(profiles);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'Error getting all profiles' });
    }
  });

  // Get user's profile by id
  app.get('/api/profiles/user/:id', async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.id
      }).populate('user', ['username', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      } else {
        res.json(profile);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'Error getting profile' });
    }
  });

  // Delete current user's
  app.delete('/api/profiles', async (req, res) => {
    try {
      // Remove user's profile
      await Profile.findOneAndRemove({
        user: req.user.id
      });
      // Remove user
      await User.findOneAndRemove({
        _id: req.user.id
      });

      // Logout user by deleting cookies
      req.logout();
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: 'Error deleting account' });
    }
  });
};
