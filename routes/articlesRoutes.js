const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireOwner = require('../middlewares/requireOwner');

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

      const art = await Article.find(
        { _user: req.user.id },
        'title body authorName',
        {
          sort: {
            createdAt: Number(sort)
          },
          skip: Number(skip),
          limit: Number(amount)
        }
      );

      res.send({ articles: art });
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
      res.send({ msg: `You posted Article: ${title}` });
    } else {
      res.send({ msg: `Error posting Article: ${title}` });
    }
  });

  app.post('/api/articles/edit', requireLogin, (req, res) => {
    console.log(req.body);
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
