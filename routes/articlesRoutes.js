const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');
const Article = mongoose.model('articles');

// Routes for read/write articles
module.exports = app => {
  // Get all current user's articles (only titles and bodies)
  // To display the list
  app.get(
    '/api/current_articles/:skip/:amount/:sort',
    requireLogin,
    async (req, res) => {
      const { skip, amount, sort } = req.params;

      const arts = await Article.find(
        { _user: req.user.id },
        'title body authorName _user',
        {
          sort: {
            createdAt: Number(sort)
          },
          skip: Number(skip),
          limit: Number(amount)
        }
      );

      res.send({ articles: arts });
    }
  );

  // Get ALL articles (only titles and bodies)
  app.get('/api/articles/:skip/:amount/:sort', async (req, res) => {
    const { skip, amount, sort } = req.params;

    const art = await Article.find({}, 'title body authorName', {
      sort: {
        createdAt: Number(sort)
      },
      skip: Number(skip),
      limit: Number(amount)
    });

    res.send({ articles: art });
  });

  // Find one article by id
  app.get('/api/article/:id', async (req, res) => {
    const { id } = req.params;

    const art = await Article.findById(id);

    res.send({ article: art });
  });

  // Post article
  app.post('/api/articles', requireLogin, async (req, res) => {
    const { title, body } = req.body;

    const newArticle = await new Article({
      title,
      body,
      _user: req.user.id,
      authorName: req.user.username
    }).save();

    if (newArticle) {
      res.send({ success: true, msg: `You posted Article: ${title}` });
    } else {
      res.send({ success: false, msg: `Error posting Article: ${title}` });
    }
  });

  // Edit article
  app.post('/api/articles/edit/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const { title, body } = req.body;

    const art = await Article.findById(id);

    let result = false;
    if (req.user._id === art._user) {
      art.title = title;
      art.body = body;

      result = await art.save();
    }

    if (result) {
      res.send({ msg: `You edited Article: ${title}` });
    } else {
      res.send({ msg: `Error editing Article: ${title}` });
    }
  });

  // Delete article
  app.post('/api/articles/delete/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    const art = await Article.deleteOne({ _user: req.user.id, _id: id });

    if (art) {
      res.send({ msg: `You deleted Article` });
    } else {
      res.send({ msg: `Error deleting Article` });
    }
  });

  // Like article with id
  app.post('/api/articles/like/:id', requireLogin, async (req, res) => {
    res.send({ msg: 'You posted comment to article with id' });
  });

  // Post comment to article with id
  app.post('/api/articles/comment/:id', requireLogin, (req, res) => {
    res.send({ msg: 'You posted comment to article' });
  });

  // Like comment to article with id
  app.post('/api/articles/comment/like/:id', requireLogin, (req, res) => {
    res.send({ msg: 'You liked comment to article' });
  });

  // Unlike comment to article with id
  app.post('/api/articles/comment/unlike/:id', requireLogin, (req, res) => {
    res.send({ msg: 'You unliked comment to article' });
  });
};
