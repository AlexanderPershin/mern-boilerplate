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

      try {
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
        ).populate('_user', ['username', 'avatar']);

        if (!arts) {
          return res.status(404).send({ msg: "Can not get user's articles" });
        }

        res.send({ articles: arts });
      } catch (err) {
        res.send({ msg: `Server error getting list of user\'s articles` });
      }
    }
  );

  // Get ALL articles (only titles and bodies)
  app.get('/api/articles/:skip/:amount/:sort', async (req, res) => {
    const { skip, amount, sort } = req.params;

    try {
      const art = await Article.find({}, 'title body', {
        sort: {
          createdAt: Number(sort)
        },
        skip: Number(skip),
        limit: Number(amount)
      }).populate('_user', ['username', 'avatar']);

      if (!art) {
        return res.status(404).send({ msg: 'Can not get articles' });
      }

      res.send({ articles: art });
    } catch (err) {
      res.send({ msg: `Server error getting list of articles` });
    }
  });

  // Find one article by id
  app.get('/api/article/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const art = await Article.findById(id)
        .populate('_user', ['username', 'avatar'])
        .populate('comments.user', ['username', 'avatar']);

      if (!art) {
        return res.status(404).send({ msg: 'Article not found' });
      }

      res.send({ article: art });
    } catch (err) {
      res.send({ msg: `Server error getting Article: ${id}` });
    }
  });

  // Post article
  app.post('/api/articles', requireLogin, async (req, res) => {
    const { title, body } = req.body;

    try {
      const newArticle = await new Article({
        title,
        body,
        _user: req.user.id
      }).save();

      if (newArticle) {
        res.send({ success: true, msg: `You posted Article: ${title}` });
      } else {
        res.send({ success: false, msg: `Error posting Article: ${title}` });
      }
    } catch (err) {
      res.send({ msg: `Server error posting Article: ${title}` });
    }
  });

  // Edit article
  app.post('/api/articles/edit/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const { title, body } = req.body;

    try {
      const art = await Article.findById(id).populate('_user', [
        'username',
        'avatar'
      ]);

      art.title = title;
      art.body = body;

      await art.save();

      res.send({ msg: `You edited Article: ${title}` });
    } catch (err) {
      res.send({ msg: `Error editing Article: ${title}` });
    }
  });

  // Delete article
  app.post('/api/articles/delete/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    try {
      await Article.deleteOne({ _user: req.user.id, _id: id });

      res.send({
        msg: `You deleted Article`
      });
    } catch (err) {
      res.send({ msg: `Error deleting Article` });
    }
  });

  // Like article with id
  app.post('/api/articles/like/:id', requireLogin, async (req, res) => {
    try {
      const art = await await Article.findById(req.params.id);
      // Check if already disliked and remove dislike
      if (
        art.dislikes.filter(dislike => dislike.toString() === req.user.id)
          .length > 0
      ) {
        art.dislikes = art.dislikes.filter(
          dislike => dislike.toString() !== req.user.id
        );

        await art.save();
      }

      // Check if already liked
      if (
        art.likes.filter(like => like.toString() === req.user.id).length > 0
      ) {
        res.send({ success: false, msg: 'You already liked this' });
      } else {
        art.likes.unshift(req.user.id);
        await art.save();
        res.send({ success: true, msg: 'You liked this' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Can not like this');
    }
  });

  // dislike article with id
  app.post('/api/articles/dislike/:id', requireLogin, async (req, res) => {
    try {
      const art = await await Article.findById(req.params.id);

      // Check if already liked and remove like
      if (
        art.likes.filter(like => like.toString() === req.user.id).length > 0
      ) {
        art.likes = art.likes.filter(like => like.toString() !== req.user.id);

        await art.save();
      }

      // Check if already disliked
      if (
        art.dislikes.filter(like => like.toString() === req.user.id).length > 0
      ) {
        res.send({ success: false, msg: 'You already disliked this' });
      } else {
        art.dislikes.unshift(req.user.id);
        await art.save();
        res.send({ success: true, msg: 'You disliked this' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Can not like this');
    }
  });

  // Post comment to article with id
  app.post('/api/articles/comment/:id', requireLogin, async (req, res) => {
    try {
      const art = await Article.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        body: req.body.body
      };

      art.comments.unshift(newComment);
      await art.save();
      res.send({
        success: true,
        msg: 'You successfuly posted a comment',
        _id: art.comments[0]._id
      });
    } catch (err) {
      console.log(err.message);
      res.send({ success: false, msg: 'Error posting a comment' });
    }
  });

  // Delete comment with comment_id to article with id
  app.delete(
    '/api/articles/comment/:id/:comment_id',
    requireLogin,
    async (req, res) => {
      try {
        const art = await Article.findById(req.params.id);

        // Find comment
        const comment = art.comments.find(
          comm => comm.id === req.params.comment_id
        );

        // Check if there is something to delete
        if (!comment) {
          return res.send({ success: false, msg: 'There is no such comment' });
        }

        // Check user rights to delete this comment
        if (comment.user.toString() !== req.user.id) {
          // User has no right to delete comment
          return res.send({
            success: false,
            msg: 'You can not delete this comment'
          });
        }

        const removeIndex = art.comments
          .map(comm => comm.id.toString())
          .indexOf(req.params.comment_id);

        art.comments.splice(removeIndex, 1);

        await art.save();

        res.send({
          success: true,
          msg: 'You successfuly deleted a comment',
          comments: art.comments
        });
      } catch (err) {
        console.log(err.message);
        res.send({ success: false, msg: 'Error posting a comment' });
      }
    }
  );

  // TODO: add likes/dislikes arrays to comments
  // Redo comment system to avoid overflow highwatermark
  // of 16 mb
  // // Like comment to article with id
  // app.post('/api/articles/comment/like/:id', requireLogin, (req, res) => {
  //   try {
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send('Cant like this');
  //   }
  // });

  // // Unlike comment to article with id
  // app.post('/api/articles/comment/unlike/:id', requireLogin, (req, res) => {
  //   res.send({ msg: 'You unliked comment to article' });
  // });
};
