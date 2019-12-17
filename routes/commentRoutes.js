const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Article = mongoose.model('articles');

// Routes for read/write comments for articles with :id
module.exports = app => {
  app.get('/api/comments/:id', (req, res) => {
    res.send({ msg: 'comments for article' });
  });

  app.post('/api/comments/:id', (req, res) => {
    res.send({ msg: 'You posted comment for Article' });
  });
};
